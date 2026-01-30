export const clientUrls = {
  home: "/",
  authSignIn: "/auth/sign-in",
  authSignUp: "/auth/sign-up",
  settings: "/settings",
  resumes: "/resumes",
  createResume: "/resumes/new",
  resumeBuilder: "/resume-builder",
  editResume: (id: string) => `/resumes/${id}`,
} as const;
