// src/infrastructure/web/routes/marcas.routes.js
const express = require('express');
const router = express.Router();

// Importar dependencias
const PrismaMarcaRepository = require('../../database/repositories/PrismaMarcaRepository');
const CreateMarca = require('../../../application/use-cases/marca/CreateMarca');
const GetMarcas = require('../../../application/use-cases/marca/GetMarcas');
const GetMarcaById = require('../../../application/use-cases/marca/GetMarcaById');
const UpdateMarca = require('../../../application/use-cases/marca/UpdateMarca');
//const DeleteMarca = require('../../../application/use-cases/marca/DeleteMarca');
const MarcaController = require('../controllers/MarcaController');

const { validateBody, validateParams, validateQuery } = require('../middlewares/validator');
const { asyncHandler } = require('../middlewares/errorHandler');

// Validators
const {
    createMarcaSchema,
    updateMarcaSchema,
    idParamSchema,
    queryFiltersSchema
} = require('../../../shared/validators/marcaValidator');

// Instanciar repositorio
const marcaRepository = new PrismaMarcaRepository();

// Instanciar casos de uso
const createMarca = new CreateMarca(marcaRepository);
const getMarcas = new GetMarcas(marcaRepository);
const getMarcaById = new GetMarcaById(marcaRepository);
const updateMarca = new UpdateMarca(marcaRepository);
//const deleteMarca = new DeleteMarca(marcaRepository);


// Instanciar controlador
const marcaController = new MarcaController(
    createMarca,
    getMarcas,
    getMarcaById,
    updateMarca,
    //  deleteMarca
);

// Rutas
// con validaciones
router.post(
    '/',
    validateBody(createMarcaSchema),
    asyncHandler((req, res) => marcaController.create(req, res))
);

router.get(
    '/',
    validateQuery(queryFiltersSchema),
    asyncHandler((req, res) => marcaController.getAll(req, res))
);

router.get(
    '/:id',
    validateParams(idParamSchema),
    asyncHandler((req, res) => marcaController.getById(req, res))
);

router.put(
    '/:id',
    validateParams(idParamSchema),
    validateBody(updateMarcaSchema),
    asyncHandler((req, res) => marcaController.update(req, res))
);

router.delete(
    '/:id',
    validateParams(idParamSchema),
    asyncHandler((req, res) => marcaController.delete(req, res))
);

module.exports = router;