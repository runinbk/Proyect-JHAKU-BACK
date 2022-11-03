import { pool } from "../db/db.js";

export const getMaquinas = async (req, res) => {
  try {
    const [result] = await pool.query("select * from MAQUINA ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getMaquina = async (req, res) => {
  try {
    const [result] = await pool.query("select * from MAQUINA where id=?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res
        .estatus(400)
        .json({ message: "No hay ninguna maquina resgistrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createMaquina = async (req, res) => {
  try {
    const { nombre, capacidad, estado } = req.body;
    const [result] = await pool.query(
      "insert into MAQUINA( nombre, capacidad, estado ) values(?,?,?,?,?,?,?)",
      [nombre, capacidad, estado]
    );
    res.json({
      id: result.insertId,
      nombre,
      capacidad,
      estado,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateMaquina = async (req, res) => {
  try {
    const [result] = await pool.query("update MAQUINA set ? where id=?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteMaquina = async (req, res) => {
  try {
    const [result] = await pool.query("delete  from MAQUINA where id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encuentra ninguna maquina" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
