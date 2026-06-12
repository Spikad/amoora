-- Store the sender (Företrädare/signatory) on each contract so it renders
-- exactly as it was sent, regardless of later registry changes. Derived from
-- the logged-in admin in send-contract — never from client input.
alter table public.contracts add column if not exists sender_name  text;
alter table public.contracts add column if not exists sender_title text;
