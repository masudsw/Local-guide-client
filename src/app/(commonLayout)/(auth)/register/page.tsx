import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Create Tourist Account</CardTitle>
              <CardDescription>
                Create your tourist account to explore verified local adventures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;