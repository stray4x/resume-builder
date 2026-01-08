export const clientUrls = {
  home: "/",
  authSignIn: "/auth/sign-in",
  authSignUp: "/auth/sign-up",
  resumes: "/resumes",
  createResume: "/resumes/new",
  editResume: (id: string) => `/resumes/${id}`,
};
