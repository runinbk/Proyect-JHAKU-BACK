import { pool } from "../db/db.js";

export const getRecetas = async (req, res) => {
  try {
    const [result] = await pool.query("select * from RECETA ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getReceta = async (req, res) => {
  try {
    const [result]  = await pool.query("select * from RECETA where id=?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res
        .estatus(400)
        .json({ message: "No hay ninguna receta resgistrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createReceta = async (req, res) => {
  try {
    const { nombre, descripcion, idMasa } =
    req.body;
  const [result] = await pool.query(
    "insert into RECETA( nombre, descripcion, idMasa ) values(?,?,?)",
    [ nombre, descripcion, idMasa ]
  );
  res.json({
    id: result.insertId,
    nombre, 
    descripcion,
     idMasa
  });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateReceta = async (req, res) => {
  try {
    const [result]  = await pool.query("update RECETA set ? where id=?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteReceta = async (req, res) => {
  try {
    const [result]  = await pool.query("delete  from RECETA where id=?", [
      req.params.id,
    ]);
    if(result.affectedRows===0)
    {
      return res.status(404).json({message:'No se encuentra ninguna receta'})
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
