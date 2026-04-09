
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telemovel TEXT NOT NULL,
  servico TEXT NOT NULL,
  terapeuta TEXT NOT NULL,
  data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
  preco NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.appointments
  FOR INSERT WITH CHECK (true);
