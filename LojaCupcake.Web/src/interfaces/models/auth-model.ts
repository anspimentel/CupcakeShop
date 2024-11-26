export default interface AuthModel {
  token: string;
  expiresIn: string;
  role: string | null;
}
