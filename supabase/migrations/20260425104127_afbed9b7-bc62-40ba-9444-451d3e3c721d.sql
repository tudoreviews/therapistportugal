-- Adicionar políticas para UPDATE e DELETE na tabela appointments
CREATE POLICY "Allow authenticated users to update appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete appointments" 
ON public.appointments 
FOR DELETE 
TO authenticated 
USING (true);