-- CreateTable
CREATE TABLE `grupos_marcas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `grupos_marcas_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marcas` (
    `id` VARCHAR(191) NOT NULL,
    `nombreEmpresa` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NULL,
    `industria` VARCHAR(191) NULL,
    `numeroIdentificacionFiscal` VARCHAR(191) NULL,
    `tipoContacto` VARCHAR(191) NULL,
    `idioma` VARCHAR(191) NULL,
    `calle` VARCHAR(191) NULL,
    `calle2` VARCHAR(191) NULL,
    `ciudad` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `codigoPostal` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `movil` VARCHAR(191) NULL,
    `correoElectronico` VARCHAR(191) NOT NULL,
    `sitioWeb` VARCHAR(191) NULL,
    `puestoTrabajo` VARCHAR(191) NULL,
    `firmaJefe` VARCHAR(191) NULL,
    `destinatarioContratos` VARCHAR(191) NULL,
    `destinatarioCotizaciones` VARCHAR(191) NULL,
    `etiquetas` JSON NULL,
    `grupoId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `marcas_grupoId_idx`(`grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agencias` (
    `id` VARCHAR(191) NOT NULL,
    `nombreEmpresa` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NULL,
    `numeroIdentificacionFiscal` VARCHAR(191) NOT NULL,
    `tipoContacto` VARCHAR(191) NULL,
    `idioma` VARCHAR(191) NULL,
    `calle` VARCHAR(191) NULL,
    `calle2` VARCHAR(191) NULL,
    `ciudad` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `codigoPostal` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `movil` VARCHAR(191) NULL,
    `correoElectronico` VARCHAR(191) NOT NULL,
    `sitioWeb` VARCHAR(191) NULL,
    `puestoTrabajo` VARCHAR(191) NULL,
    `firmaJefe` VARCHAR(191) NULL,
    `etiquetas` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `talentos` (
    `id` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `genero` VARCHAR(191) NULL,
    `nacionalidad` VARCHAR(191) NULL,
    `documentoIdentidad` VARCHAR(191) NOT NULL,
    `tipoDocumento` VARCHAR(191) NULL,
    `direccionCalle` VARCHAR(191) NULL,
    `direccionApto` VARCHAR(191) NULL,
    `ciudad` VARCHAR(191) NULL,
    `departamento` VARCHAR(191) NULL,
    `codigoPostal` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `telefonoPrincipal` VARCHAR(191) NOT NULL,
    `telefonoAlternativo` VARCHAR(191) NULL,
    `emailPersonal` VARCHAR(191) NOT NULL,
    `emailAlternativo` VARCHAR(191) NULL,
    `sitioWebPersonal` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `esTalentoIndependiente` BOOLEAN NOT NULL DEFAULT false,
    `nombreArtistico` VARCHAR(191) NULL,
    `especialidad` VARCHAR(191) NULL,
    `anosExperiencia` INTEGER NULL,
    `tarifaBase` DECIMAL(10, 2) NULL,
    `biografia` TEXT NULL,
    `razonSocial` VARCHAR(191) NULL,
    `rutFiscal` VARCHAR(191) NULL,
    `tipoContribuyente` VARCHAR(191) NULL,
    `monedaFacturacion` VARCHAR(191) NULL,
    `direccionFiscal` VARCHAR(191) NULL,
    `ciudadFiscal` VARCHAR(191) NULL,
    `codigoPostalFiscal` VARCHAR(191) NULL,
    `paisFiscal` VARCHAR(191) NULL,
    `banco` VARCHAR(191) NULL,
    `numeroCuenta` VARCHAR(191) NULL,
    `tipoCuenta` VARCHAR(191) NULL,
    `swift` VARCHAR(191) NULL,
    `titularCuenta` VARCHAR(191) NULL,
    `paypal` VARCHAR(191) NULL,
    `traackrId` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `tiktok` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `twitch` VARCHAR(191) NULL,
    `podcast` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `talentos_documentoIdentidad_key`(`documentoIdentidad`),
    UNIQUE INDEX `talentos_emailPersonal_key`(`emailPersonal`),
    INDEX `talentos_documentoIdentidad_idx`(`documentoIdentidad`),
    INDEX `talentos_emailPersonal_idx`(`emailPersonal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `talento_agencia` (
    `id` VARCHAR(191) NOT NULL,
    `talentoId` VARCHAR(191) NOT NULL,
    `agenciaId` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'principal',
    `fechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFin` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `talento_agencia_talentoId_idx`(`talentoId`),
    INDEX `talento_agencia_agenciaId_idx`(`agenciaId`),
    UNIQUE INDEX `talento_agencia_talentoId_agenciaId_key`(`talentoId`, `agenciaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacciones` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'borrador',
    `nombreCampana` VARCHAR(191) NOT NULL,
    `correoCampana` VARCHAR(191) NOT NULL,
    `telefonoCampana` VARCHAR(191) NULL,
    `responsableCampana` VARCHAR(191) NOT NULL,
    `fechaImplementacion` DATETIME(3) NULL,
    `marcaId` VARCHAR(191) NULL,
    `talentoId` VARCHAR(191) NOT NULL,
    `valorEstimado` DECIMAL(10, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transacciones_codigo_key`(`codigo`),
    INDEX `transacciones_marcaId_idx`(`marcaId`),
    INDEX `transacciones_talentoId_idx`(`talentoId`),
    INDEX `transacciones_codigo_idx`(`codigo`),
    INDEX `transacciones_estado_idx`(`estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cotizaciones` (
    `id` VARCHAR(191) NOT NULL,
    `transaccionId` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `fechasVigencia` VARCHAR(191) NULL,
    `fechaLlenado` DATETIME(3) NULL,
    `montoTotal` DECIMAL(10, 2) NULL,
    `alcance` VARCHAR(191) NULL,
    `uso` VARCHAR(191) NULL,
    `marcasInvolucradas` VARCHAR(191) NULL,
    `exclusividad` VARCHAR(191) NULL,
    `accionesDetalle` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cotizaciones_transaccionId_idx`(`transaccionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'user',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs_actividad` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NULL,
    `accion` VARCHAR(191) NOT NULL,
    `entidad` VARCHAR(191) NOT NULL,
    `entidadId` VARCHAR(191) NOT NULL,
    `detalles` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `logs_actividad_usuarioId_idx`(`usuarioId`),
    INDEX `logs_actividad_entidad_entidadId_idx`(`entidad`, `entidadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `marcas` ADD CONSTRAINT `marcas_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupos_marcas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `talento_agencia` ADD CONSTRAINT `talento_agencia_talentoId_fkey` FOREIGN KEY (`talentoId`) REFERENCES `talentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `talento_agencia` ADD CONSTRAINT `talento_agencia_agenciaId_fkey` FOREIGN KEY (`agenciaId`) REFERENCES `agencias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `transacciones_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `transacciones_talentoId_fkey` FOREIGN KEY (`talentoId`) REFERENCES `talentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cotizaciones` ADD CONSTRAINT `cotizaciones_transaccionId_fkey` FOREIGN KEY (`transaccionId`) REFERENCES `transacciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
