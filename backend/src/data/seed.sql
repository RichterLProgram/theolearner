-- Insert topics
insert into topics (title, description, category, difficulty_level) values
  ('2.2 – Formale Sprachen', 'Verstehe formale Sprachen, Konkatenation, und Wortoperationen', 'Formal Languages', 1)
on conflict do nothing;

-- Get topic ID for reference  
with topic_data as (
  select id from topics where title = '2.2 – Formale Sprachen'
)
-- Insert exercises for Teil A
insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topic_data),
  'A', 1,
  'Ist L = {a, aa, aaa, …} über Σ = {a} eine formale Sprache?',
  '["Ja – L = { aⁿ | n ≥ 1 } ⊆ {a}* ist eine formale Sprache.", "Nein – es fehlt ε und deshalb ist die Menge unvollständig.", "Das ist keine gültige Sprache weil α nicht in Σ liegt."]'::jsonb,
  0,
  'L ist per Definition eine formale Sprache als Teilmenge von Σ*. Das leere Wort ε ist nicht erforderlich – L muss nicht alle möglichen Wörter enthalten.',
  1, 15
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'A', 2,
  'Die Menge aller syntaktisch korrekten Python-Programme ist keine formale Sprache – stimmt das?',
  '["Falsch – sie ist eine formale Sprache.", "Richtig – Python Syntax nicht formal.", "Das hängt von der Python Version ab."]'::jsonb,
  0,
  'Sie ist eine formale Sprache, da Python-Programme endliche Folgen von ASCII-Zeichen sind (Σ = ASCII), also eine Teilmenge von Σ*. Die Menge lässt sich formal beschreiben.',
  1, 15
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'A', 3,
  'Ist w = 0110 eine formale Sprache? Was ist {0110}?',
  '["w ist ein Wort, {0110} ist eine Sprache (einelementige Menge)", "Beides sind formale Sprachen", "Weder w noch {0110} sind formale Sprachen"]'::jsonb,
  0,
  'w = 0110 ist ein Wort (ein konkretes Element), keine Sprache. {0110} hingegen ist eine formale Sprache – eine einelementige Menge, die genau dieses Wort enthält.',
  1, 15
on conflict do nothing;

-- Insert exercises for Teil B
insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'B', 4,
  'Gib eine kompakte Mengenschreibweise für L = {b, bb, bbb, bbbb, …} über Σ = {a, b} an:',
  '["L = { bⁿ | n ∈ ℕ, n ≥ 1 }", "L = { bⁿ | n ∈ ℕ }", "L = { aⁿbⁿ | n ∈ ℕ }"]'::jsonb,
  0,
  'L = { bⁿ | n ∈ ℕ, n ≥ 1 } ist die korrekte Notation. Die Bedingung n ≥ 1 ist wichtig, da ε (das leere Wort) nicht in L liegt.',
  1, 20
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'B', 5,
  'Beschreibe die Sprache L = {ε, 0, 00, 000, …} = {0ⁿ | n ∈ ℕ} über Σ = {0, 1} in Worten:',
  '["L besteht aus Wörtern, die nur aus Nullen bestehen (inkl. ε). Das Wort 1 ist nicht enthalten, ε schon.", "L besteht aus Wörtern, die nur aus Einsen bestehen. Das Wort 1 ist enthalten.", "L besteht aus allen binären Wörtern. ε und 1 sind beide enthalten."]'::jsonb,
  0,
  'L ist die Menge aller Wörter über {0,1}, die ausschließlich aus Nullen bestehen (inkl. leerem Wort). Das Wort 1 ist nicht enthalten, ε dagegen schon (n=0).',
  1, 20
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'B', 6,
  'Sei L = { w ∈ {0,1}* | |w| ist gerade }. Welche sind die ersten fünf Wörter?',
  '["ε, 00, 01, 10, 11", "ε, 0, 1, 00, 01", "00, 01, 10, 11, 000"]'::jsonb,
  0,
  'ε hat Länge 0 (gerade), dann folgen alle Wörter der Länge 2: 00, 01, 10, 11. Wörter der Länge 1 sind nicht enthalten.',
  2, 25
on conflict do nothing;

-- Insert exercises for Teil C
insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'C', 7,
  'Sei u = ab und v = ba. Berechne uv:',
  '["abba", "baab", "aabb"]'::jsonb,
  0,
  'Konkatenation: uv = ab concatenated mit ba = abba. (Merke: Reihenfolge ist wichtig!)',
  1, 15
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'C', 8,
  'Sei u = ab und v = ba. Berechne u³:',
  '["ababab", "aababb", "abababa"]'::jsonb,
  0,
  'u³ = u · u · u = ab · ab · ab = ababab',
  1, 15
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'C', 9,
  'Gilt für alle Wörter u, v: uv = vu?',
  '["Nein – Gegenbeispiel: u = ab, v = b ⟹ uv = abb, aber vu = bab", "Ja – Konkatenation ist kommutativ", "Das gilt nur für u und v gleicher Länge"]'::jsonb,
  0,
  'Konkatenation ist im Allgemeinen nicht kommutativ. Das Gegenbeispiel zeigt, dass uv ≠ vu sein kann.',
  2, 25
on conflict do nothing;

insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'C', 10,
  'Zeige: Für jedes Wort w gilt εw = wε = w. Warum?',
  '["ε ist das leere Wort; Anhängen von ε ändert kein Wort. εw fügt nichts vor w ein, wε fügt nichts danach.", "Weil ε = 0 ist und 0 · w = 0", "Das ist ein Axiom und muss nicht bewiesen werden"]'::jsonb,
  0,
  'ε ist das leere Wort (Länge 0). Das Anhängen von ε ändert kein Wort. Formal folgt dies aus w⁰ = ε und der Definition der Konkatenation.',
  2, 25
on conflict do nothing;

-- Insert exercises for Teil D
insert into exercises (topic_id, part, "order", question, options, correct_answer, explanation, difficulty, xp_reward) 
select 
  (select id from topics where title = '2.2 – Formale Sprachen'),
  'D', 11,
  'Sei Σ = {a, b}. Welche Aussage ist korrekt? A = {w ∈ Σ* | w enthält gleich viele a''s wie b''s} B = {(ab)ⁿ | n ∈ ℕ} C = Sprache mit gleich vielen a''s und b''s',
  '["B ⊊ A = C (B ist echte Teilmenge von A, A = C)", "A = B = C (alle drei sind gleich)", "A ⊊ B (A ist echte Teilmenge von B)"]'::jsonb,
  0,
  'C = A (beide beschreiben genau die Wörter mit gleich vielen a''s und b''s). B ⊊ A, denn B enthält nur Wörter der Form (ab)ⁿ wie ab, abab. A enthält aber auch ba, aabb, etc. Also: B ⊊ A = C.',
  3, 40
on conflict do nothing;

-- Insert achievements
insert into achievements (name, description, icon, unlock_condition, xp_bonus) values
  ('First Steps', 'Complete your first exercise', '🎯', '{"type": "exercises_completed", "count": 1}', 10),
  ('Getting Warmed Up', 'Complete 5 exercises', '🔥', '{"type": "exercises_completed", "count": 5}', 25),
  ('Halfway There', 'Complete 10 exercises', '💪', '{"type": "exercises_completed", "count": 10}', 50),
  ('Master Learner', 'Complete all 11 exercises in 2.2', '👑', '{"type": "topic_completed", "topic": "2.2"}', 100),
  ('Perfect Streak', 'Get 10 correct answers in a row', '✨', '{"type": "streak", "count": 10}', 75),
  ('100 XP Club', 'Earn 100 total XP', '💯', '{"type": "total_xp", "amount": 100}', 0),
  ('Speedrunner', 'Complete 3 exercises in one session', '⚡', '{"type": "session_speed", "count": 3}', 30)
on conflict (name) do nothing;
