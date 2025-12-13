flowchart TD
    %% Estilos
    classDef auth fill:#f9f,stroke:#333,stroke-width:2px;
    classDef front fill:#e1f5fe,stroke:#0277bd,stroke-width:2px;
    classDef back fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef db fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
    classDef cloud fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    Start((Inicio)) --> CheckAuth{¿Tiene Token?}

    %% --- SECCIÓN AUTENTICACIÓN ---
    subgraph Auth_Flow [🔐 Flujo de Autenticación]
        direction TB
        CheckAuth -- No --> LoginPage[Página Login / Register]
        LoginPage --> UserInput[Usuario ingresa credenciales]
        UserInput --> CallAuth[POST /auth/login]
        CallAuth --> BackAuth[NestJS: AuthService]
        BackAuth --> ValidateUser{¿Contraseña Ok?}
        ValidateUser -- No --> ErrorAuth[Mostrar Error UI]
        ValidateUser -- Si --> GenJWT[Generar JWT]
        GenJWT --> SetCookie[Guardar Sesión]
        SetCookie --> RedirectDash[Redirigir al Dashboard]
    end
    
    CheckAuth -- Si --> Dashboard

    %% --- SECCIÓN DASHBOARD (FRONTEND) ---
    subgraph Dashboard_System [🖥️ Dashboard System]
        direction TB
        RedirectDash --> Dashboard[Vista Principal]
        Dashboard --> Sidebar{Menú Lateral}
        
        %% Módulo Marcas
        Sidebar -- Marcas --> ViewBrands[Tabla Marcas]
        ViewBrands --> CreateBrand[Modal: Crear/Editar Marca]
        CreateBrand --> ValidateBrand[Zod Schema Check]
        ValidateBrand --> ReqBrand[POST /brands]

        %% Módulo Productos
        Sidebar -- Productos --> ViewProd[Tabla Productos]
        ViewProd --> CreateProd[Formulario: Producto + Variantes]
        CreateProd --> FileSelect[Seleccionar Imagen]
        FileSelect --> ReqProd[POST /products <br/>(Multipart File)]

        %% Módulo Órdenes
        Sidebar -- Órdenes --> ViewOrders[Tabla Órdenes]
        ViewOrders --> CreateOrder[Page: Nueva Orden]
        CreateOrder --> SelectClient[Datos Cliente + Envío]
        SelectClient --> AddItems[Agregar Items + Calc. Totales]
        AddItems --> ValidateOrder[Validar Stock y Datos]
        ValidateOrder --> ReqOrder[POST /orders]
    end

    %% --- SECCIÓN BACKEND (NESTJS) ---
    subgraph Backend_API [⚙️ Backend API NestJS]
        direction TB
        
        %% Middleware
        ReqBrand & ReqProd & ReqOrder --> Guard[AuthGuard (JWT Verify)]
        Guard -- Inválido --> 401[Error 401]
        
        %% Controladores y Servicios
        Guard -- Válido --> Controllers[Routing Controllers]
        
        Controllers -- Brands --> ServBrand[BrandsService]
        Controllers -- Orders --> ServOrder[OrdersService]
        Controllers -- Products --> ServProd[ProductsService]

        %% Lógica Específica
        ServProd --> CloudMod[Cloudinary Module]
        ServOrder --> Transact[Prisma Transaction]
    end

    %% --- SERVICIOS EXTERNOS Y DB ---
    subgraph Data_Layer [💾 Capa de Datos]
        CloudMod --> UploadImg((☁️ Subir Imagen))
        UploadImg --> GetURL[Obtener URL Segura]
        
        ServBrand & GetURL & Transact --> Prisma[🔌 Prisma ORM]
        
        Prisma --> DB[(🐘 PostgreSQL)]
        
        DB -- Query Result --> Prisma
    end

    %% RETORNO
    Prisma --> ResponseOK[Respuesta Exitosa]
    ResponseOK --> ToastUI[Frontend: Toast 'Operación Exitosa']
    ToastUI --> Refresh[Actualizar Tablas / Redirigir]

    class LoginPage,UserInput,ErrorAuth,Dashboard,Sidebar,ViewBrands,CreateBrand,ViewProd,CreateProd,ViewOrders,CreateOrder,AddItems,ToastUI front;
    class CallAuth,BackAuth,GenJWT,Guard,Controllers,ServBrand,ServOrder,ServProd,CloudMod,Transact back;
    class ValidateUser,CheckAuth,ValidateBrand,ValidateOrder,FileSelect auth;
    class DB,Prisma db;
    class UploadImg,GetURL cloud;
