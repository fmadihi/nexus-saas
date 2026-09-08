// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// export default function Register() {
//   const { register: signup } = useAuth();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [apiError, setApiError] = useState("");

//   const onSubmit = async (data: any) => {
//     try {
//       await signup(data.name, data.email, data.password, data.orgName);
//       navigate("/dashboard");
//     } catch (e) {
//       setApiError((e as Error).message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
//       >
//         <h1 className="text-2xl font-bold">ساخت حساب جدید</h1>
//         <Input
//           label="نام سازمان (Workspace)"
//           error={errors.orgName?.message as string}
//           {...register("orgName", { required: "نام سازمان الزامی است" })}
//         />
//         <Input
//           label="نام شما"
//           error={errors.name?.message as string}
//           {...register("name", { required: "نام الزامی است" })}
//         />
//         <Input
//           label="ایمیل"
//           type="email"
//           error={errors.email?.message as string}
//           {...register("email", { required: "ایمیل الزامی است" })}
//         />
//         <Input
//           label="رمز عبور"
//           type="password"
//           error={errors.password?.message as string}
//           {...register("password", {
//             required: "رمز عبور الزامی است",
//             minLength: { value: 6, message: "حداقل ۶ کاراکتر" },
//           })}
//         />
//         {apiError && <p className="text-sm text-red-500">{apiError}</p>}
//         <Button className="w-full" disabled={isSubmitting}>
//           ایجاد سازمان
//         </Button>
//         <p className="text-center text-sm">
//           حساب دارید؟{" "}
//           <Link to="/login" className="text-blue-600">
//             ورود
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  const { register: signup } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: any) => {
    try {
      await signup(data.name, data.email, data.password, data.orgName);
      navigate("/dashboard");
    } catch (e) {
      setApiError((e as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-[var(--r-lg)] bg-[var(--a-500)] flex items-center justify-center shadow-[var(--shadow-md)]">
            <span className="text-white text-xl font-bold">N</span>
          </div>
          <h1 className="text-xl font-semibold text-[var(--tx-base)]">{t("auth.register")}</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--bg-raised)] p-7 shadow-[var(--shadow-md)] space-y-4"
        >
          <Input
            label={t("auth.orgName")}
            error={errors.orgName?.message as string}
            {...register("orgName", { required: t("auth.orgRequired") })}
          />
          <Input
            label={t("auth.name")}
            error={errors.name?.message as string}
            {...register("name", { required: t("auth.nameRequired") })}
          />
          <Input
            label={t("auth.email")}
            type="email"
            error={errors.email?.message as string}
            {...register("email", { required: t("auth.emailRequired") })}
          />
          <Input
            label={t("auth.password")}
            type="password"
            error={errors.password?.message as string}
            {...register("password", {
              required: t("auth.passwordRequired"),
              minLength: { value: 6, message: t("auth.passwordMin") },
            })}
          />
          {apiError && (
            <p className="rounded-[var(--r-md)] bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 px-3 py-2 text-sm text-[var(--danger)]">
              {apiError}
            </p>
          )}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("common.loading") : t("auth.registerBtn")}
          </Button>
          <p className="text-center text-sm text-[var(--tx-muted)]">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-[var(--tx-accent)] hover:underline font-medium">
              {t("auth.loginLink")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
