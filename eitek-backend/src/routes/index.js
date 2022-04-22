const {Router} = require('express');
const router = new Router();

const { getUser, getRol, getCliente, getDirecciones, getClienteRol, getCajas,getPedidos, newCaja, newClienteRol, newRol, newPedido, actStadoPedido, newDirecciones } = require('../controllers/index.controller');

router.get('/personas', getUser);
router.get('/rol', getRol);
router.get('/cliente/:id', getCliente);
router.get('/clienteRol/:id', getClienteRol);
router.get('/cajas', getCajas);
router.get('/pedidos', getPedidos);
router.get('/direc', getDirecciones);


router.post('/cajas/',newCaja);
router.post('/rol/',newRol);
router.post('/clienteRol/',newClienteRol);
router.post('/pedidos/',newPedido);
router.post('/direc/',newDirecciones);


router.put('/pedidoAct/:id',actStadoPedido);

module.exports = router;