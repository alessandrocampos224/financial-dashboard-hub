import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '6px',
                  height: '40px',
                },
                input: {
                  borderRadius: '6px',
                  height: '40px',
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
            onError={(error) => {
              setError(error.message);
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Entrar",
                  email_input_placeholder: "Seu email",
                  password_input_placeholder: "Sua senha",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Cadastrar",
                  email_input_placeholder: "Seu email",
                  password_input_placeholder: "Sua senha",
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}