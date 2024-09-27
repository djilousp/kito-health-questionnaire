function _safeToJson(entity) {
  return entity && entity.toJSON ? entity.toJSON() : entity;
}

/**
 * Safe way to call .toJSON method on mongoose models or array of models no matter what
 */
export function safeToJson<T>(entityOrEntityArray: T | T[]) {
  if (Array.isArray(entityOrEntityArray)) {
    return entityOrEntityArray.map((entity) => _safeToJson(entity));
  }

  return _safeToJson(entityOrEntityArray);
}
