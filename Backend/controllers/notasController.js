const { Nota } = require('../models/Nota');
const { Persona } = require('../models/Persona');
const { Materia } = require('../models/Materia');


exports.getTodasLasNotas = async (req, res) => {
    try {
      const notas = await Nota.findAll({
        include: [
          { model: Persona, attributes: ['nombre'], where: { rol: 1 } },
          { model: Materia, attributes: ['nombre'] }
        ]
      });
      res.json(notas);
    } catch (error) {
      console.error('Error al obtener todas las notas:', error);
      res.status(500).json({ error: 'Error al obtener las notas' });
    }
  };
exports.getNotasEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
      const notas = await Nota.findAll({
        where: { id_persona: id },
        include: [
          { model: Materia, attributes: ['nombre'] },
          { model: Persona, attributes: ['nombre'] }
        ]
      });
  
      if (notas.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron notas para este estudiante' });
      }
  
      res.json(notas);
    } catch (error) {
      console.error('Error al obtener notas del estudiante:', error);
      res.status(500).json({ error: 'Error al obtener las notas' });
    }
  };

exports.editarNotaEstudiante = async (req, res) => {
    const { id_nota } = req.params;
    const { nota, gestion, id_materia, id_persona } = req.body;
  
    try {
      const notaExistente = await Nota.findByPk(id_nota);
  
      if (!notaExistente) {
        return res.status(404).json({ mensaje: 'Nota no encontrada' });
      }
  
      // Actualizar los campos (si vienen en el cuerpo)
      if (nota !== undefined) notaExistente.nota = nota;
      if (gestion !== undefined) notaExistente.gestion = gestion;
      if (id_materia !== undefined) notaExistente.id_materia = id_materia;
      if (id_persona !== undefined) notaExistente.id_persona = id_persona;
  
      await notaExistente.save();
  
      res.json({ mensaje: 'Nota actualizada exitosamente', nota: notaExistente });
    } catch (error) {
      console.error('Error al editar la nota:', error);
      res.status(500).json({ error: 'Error al actualizar la nota' });
    }
  };
