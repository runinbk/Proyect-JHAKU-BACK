import { pool } from "../db/db.js";

export const getProcesos = async (req, res) => {
  try {
    const [result] = await pool.query("select * from PROCESO ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProceso = async (req, res) => {
  try {
    const [result] = await pool.query("select * from PROCESO where id=?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res
        .estatus(400)
        .json({ message: "No hay ningun proceso resgistrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createProceso = async (req, res) => {
  try {
    const { nombre, tiempo, descripcion, idMaquina } = req.body;
    const [result] = await pool.query(
      "insert into PROCESO( nombre, tiempo, descripcion, idMaquina ) values(?,?,?,?)",
      [nombre, tiempo, descripcion, idMaquina]
    );
    res.json({
      id: result.insertId,
      nombre,
      tiempo,
      descripcion,
      idMaquina,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateProceso = async (req, res) => {
  try {
    const [result] = await pool.query("update PROCESO set ? where id=?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteProceso = async (req, res) => {
  try {
    const [result] = await pool.query("delete  from PROCESO where id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encuentra ningun proceso" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
