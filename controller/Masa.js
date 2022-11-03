import { pool } from "../db/db.js";

export const getMasas = async (req, res) => {
  try {
    const [result] = await pool.query("select * from MASA ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getMasa = async (req, res) => {
  try {
    const [result] = await pool.query("select * from MASA where id=?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res
        .estatus(400)
        .json({ message: "No hay ninguna masa resgistrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createMasa = async (req, res) => {
  try {
    const { nombre, idProceso } = req.body;
    const [result] = await pool.query(
      "insert into MASA( nombre, idProceso ) values(?,?)",
      [nombre, idProceso]
    );
    res.json({
      id: result.insertId,
      nombre,
      idProceso,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateMasa = async (req, res) => {
  try {
    const [result] = await pool.query("update MASA set ? where id=?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteMasa = async (req, res) => {
  try {
    const [result] = await pool.query("delete  from MASA where id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra ninguna masa" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
