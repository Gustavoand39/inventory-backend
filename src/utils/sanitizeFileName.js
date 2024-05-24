const sanitizeFilename = (filename) => {
  // Eliminar caracteres no permitidos
  const sanitizedFilename = filename.replace(/[^\w.-]/g, '_');
  
  // Limitar la longitud del nombre del archivo
  const maxLength = 100; // Máxima longitud permitida
  const truncatedFilename = sanitizedFilename.slice(0, maxLength);

  return truncatedFilename;
}

export default sanitizeFilename;