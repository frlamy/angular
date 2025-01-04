export type PasswordSettings = {
  /**
   * La longueur du mot de passe encodé
   */
  length: number,
  /**
   * Contient des majuscules
   */
  uppercase: boolean,
  /**
   * Contient des entiers
   */
  numbers: boolean,
  /**
   * Contient des caractères spéciaux
   */
  symbols: boolean
}
