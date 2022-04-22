const { Pool } = require('pg');
const { v4: uuid } = require("uuid");


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'Backend',
    port: '5432'
})




const getUser = async (req, res) => {
    const response = await pool.query('SELECT pr."idPers", pr."nombPers", pr."telfPers", r."descRol", dire."descDirec" FROM "Persona" as pr, "Rol" as r, "RolPersona" as rp ,"DirecPers" as dirp, "Direccion" as dire where pr."idPers" = rp."idPers" AND r."idRol" = rp."idRol" and dirp."idPers" like pr."idPers" and dire."idDirec" = dirp."idDirec"');
    let nuevoObjeto = {}
    response.rows.forEach(x => {
        if (!nuevoObjeto.hasOwnProperty(x.idPers)) {
            nuevoObjeto[x.idPers] = {
                nombPers: x.nombPers,
                telfPers: x.telfPers,
                descRol: x.descRol,
                direcciones: []
            }
        }
        nuevoObjeto[x.idPers].direcciones.push({
            descDirec: x.descDirec
        })
    })
        res.send(nuevoObjeto);
        return nuevoObjeto;
}




const getRol = async (req, res) => {
    const response = await pool.query('SELECT "idRol", "descRol" FROM "Rol"');
    console.log(response.rows);
    res.send(response.rows);
    return response.rows;
}

const newRol = async (req, res) => {
    const { descRol } = req.body;
    const response = await pool.query('INSERT INTO "Rol"("idRol", "descRol") VALUES ($1, $2)',[ uuid(), descRol]);
    console.log(response);
    res.send("Rol Creado");
    return response;
}




const getCliente = async (req, res) => {
    const idPer = req.params.id;
    const response = await pool.query('SELECT "idPers", "nombPers", "telfPers" FROM "Persona" where "idPers" like $1',[idPer]);
    console.log(response.rows);
    res.send(response.rows);
    return response.rows;
}

const getClienteRol = async (req, res) => {
    const idPer = req.params.id;
    const response = await pool.query('SELECT rp."idRolPer", pe."idPers", pe."nombPers", pe."telfPers", r."descRol" FROM "Persona" as pe, "Rol" as r, "RolPersona" as rp where pe."idPers" like $1 and rp."idPers" like pe."idPers" and rp."idRol" = r."idRol"',[idPer]);
    console.log(response.rows);
    res.send(response.rows);
    return response.rows;
}

const newClienteRol = async (req, res) => {
    const { idPers, idRol } = req.body;
    const response = await pool.query('INSERT INTO "RolPersona"( "idRolPer", "idPers", "idRol") VALUES ($1, $2, $3)',[ uuid(), idPers, idRol]);
    console.log(response);
    res.send("Rol del Cliente Creado");
    return response;
}




const getCajas = async (req, res) => {
    const response = await pool.query('SELECT ca."idCaja", ca."nombCaja", ca."precioCaja", ca."stockCaja", ca."descCaja", ipr."imgDes" FROM "Cajas" as ca, "ImgProd" as ipr where ipr."idProd" = ca."idCaja"');
    let nuevoObjeto = {}
    response.rows.forEach(x => {
        if (!nuevoObjeto.hasOwnProperty(x.idCaja)) {
            nuevoObjeto[x.idCaja] = {
                nombCaja: x.nombCaja,
                imagenes: [],
                precioCaja: x.precioCaja,
                stockCaja: x.stockCaja,
                descCaja: x.descCaja
            }
        }
        nuevoObjeto[x.idCaja].imagenes.push({
            imgDes: x.imgDes
        })
    })
        res.send(nuevoObjeto);
        return nuevoObjeto;
}

const newCaja = async (req, res) => {
    console.log(req.body);
    const { nombCaja, precioCaja, stockCaja, descCaja , imgCaja} = req.body;
    const idP = uuid();
    const response = await pool.query('INSERT INTO "Cajas" ("idCaja", "nombCaja", "precioCaja", "stockCaja", "descCaja") VALUES ($1, $2, $3, $4, $5)',[ idP, nombCaja, precioCaja, stockCaja, descCaja]);
    imgCaja.forEach(async (x) => {
        console.log(x.imgDes);
        const response1 = await pool.query('INSERT INTO "ImgProd"("idImg", "imgDes", "idProd") VALUES ($1, $2, $3)',[ uuid(), x.imgDes, idP]);
    })
    res.send("Caja Guardada");
    return "Caja Guardada";
}




const getDirecciones = async (req, res) => {
    const response = await pool.query('SELECT dp."idDirPer", pe."idPers", pe."nombPers", d."descDirec" FROM "DirecPers" as dp, "Direccion" as d, "Persona" as pe where pe."idPers" like dp."idPers" and d."idDirec" = dp."idDirec"');
    console.log(response.rows);
    res.send(response.rows);
    return response.rows;
}

const newDirecciones = async (req, res) => {
    const {descDirec, idPers } = req.body;
    const idD=uuid();
    const response = await pool.query('INSERT INTO "Direccion"("idDirec", "descDirec") VALUES ($1, $2)',[ idD, descDirec]);
    const response1 = await pool.query('INSERT INTO "DirecPers"("idDirPer", "idPers", "idDirec") VALUES ($1, $2, $3)',[ uuid(), idPers, idD]);
    res.send("Direccion Guardada");
    return "Direccion Creada";
}





const getPedidos = async (req, res) => {
    const response = await pool.query('select pe."idPedido", per."nombPers", pe."fechaPed", ca."nombCaja", ca."precioCaja", dp."numProd", dp."subtotPr", pe."totPed", pe."formPag", pe."estado" from "Pedidos" as pe, "DetallePedido" as dp, "Persona" as per, "RolPersona" as rp, "Cajas" as ca where pe."idPedido" = dp."idPedi" and per."idPers" = rp."idPers" and pe."idPersRol" = rp."idRolPer" and dp."idProd" = ca."idCaja";');
    let nuevoObjeto = {}
    response.rows.forEach(x => {
        if (!nuevoObjeto.hasOwnProperty(x.idPedido)) {
            nuevoObjeto[x.idPedido] = {
                nombPers: x.nombPers,
                fechaPed: x.fechaPed,
                productos: [],
                totPed: x.totPed,
                formPag: x.formPag,
                estado: x.estado
            }
        }
        nuevoObjeto[x.idPedido].productos.push({
            nombCaja: x.nombCaja,
            precioCaja: x.precioCaja,
            cantPed: x.cantPed,
            subtotPr: x.subtotPr,
        })
    })
        res.send(nuevoObjeto);
        return nuevoObjeto;
    }

    const newPedido = async (req, res) => {
        const {idPer, totPed, formPag, detalle} = req.body;
        let now= new Date();
        const responseId = await pool.query('SELECT rp."idRolPer", pe."idPers", pe."nombPers", pe."telfPers", r."descRol" FROM "Persona" as pe, "Rol" as r, "RolPersona" as rp where pe."idPers" like $1 and rp."idPers" like pe."idPers" and rp."idRol" = r."idRol"',[idPer]);
        console.log(responseId.rows[0]);
        const idPed = uuid();
        const responseCabecera = await pool.query('INSERT INTO "Pedidos"("idPedido", "idPersRol", "totPed", "formPag", estado, "fechaPed") VALUES ($1, $2, $3, $4, $5, $6)',[ idPed, responseId.rows[0].idRolPer, totPed, formPag, 'Pendiente', now]);
        detalle.forEach(async (x) => {
            console.log(x);
            const responseDetalle = await pool.query('INSERT INTO "DetallePedido"("idPedDet", "idPedi", "idProd", "numProd", "subtotPr") VALUES ($1, $2, $3, $4, $5)',[ uuid(), idPed, x.idProd, x.numProd, x.subtotPr]);
        })
        res.send("Pedido Guardado");
        return "Pedido Creado";
    }

    


    const actStadoPedido = async (req, res) => {
        const id = req.params.id;
        const estado = "Enviado";
        const response = await pool.query('UPDATE "Pedidos" SET estado=$1 WHERE "idPedido" = $2',[estado,id]);
        console.log(response);
        res.send("Delivery Actualiza Pedido a Enviado");
        return "Pedido Enviado";
    }


module.exports = {
            getUser,
            getRol,
            getDirecciones,
            getCliente,
            getClienteRol,
            getCajas,
            getPedidos,
            newCaja,
            newDirecciones,
            newClienteRol,
            newRol,
            newPedido,
            actStadoPedido
        }