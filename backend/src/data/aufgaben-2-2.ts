// Seed data for "Aufgaben 2.2 - Formale Sprachen"
// This will be used to populate Firestore initially

export const AUFGABEN_2_2 = {
  topicId: "formal-lang-2-2",
  title: "2.2 – Formale Sprachen",
  description: "Verstehe formale Sprachen, Konkatenation, und Wortoperationen",
  category: "Formal Languages",
  partCount: 4,

  exercises: [
    // TEIL A
    {
      id: "2-2-a-1",
      topicId: "formal-lang-2-2",
      part: "A",
      order: 1,
      question: "Ist L = {a, aa, aaa, …} über Σ = {a} eine formale Sprache?",
      options: [
        "Ja – L = { aⁿ | n ≥ 1 } ⊆ {a}* ist eine formale Sprache.",
        "Nein – es fehlt ε und deshalb ist die Menge unvollständig.",
        "Das ist keine gültige Sprache weil α nicht in Σ liegt."
      ],
      correctAnswer: 0,
      explanation:
        "L ist per Definition eine formale Sprache als Teilmenge von Σ*. Das leere Wort ε ist nicht erforderlich – L muss nicht alle möglichen Wörter enthalten.",
      difficulty: 1, // 1=Easy, 2=Medium, 3=Hard
      xpReward: 15
    },
    {
      id: "2-2-a-2",
      topicId: "formal-lang-2-2",
      part: "A",
      order: 2,
      question: "Die Menge aller syntaktisch korrekten Python-Programme ist keine formale Sprache – stimmt das?",
      options: [
        "Falsch – sie ist eine formale Sprache.",
        "Richtig – Python Syntax nicht formal.")
        "Das hängt von der Python Version ab."
      ],
      correctAnswer: 0,
      explanation:
        "Sie ist eine formale Sprache, da Python-Programme endliche Folgen von ASCII-Zeichen sind (Σ = ASCII), also eine Teilmenge von Σ*. Die Menge lässt sich formal beschreiben.",
      difficulty: 1,
      xpReward: 15
    },
    {
      id: "2-2-a-3",
      topicId: "formal-lang-2-2",
      part: "A",
      order: 3,
      question: "Ist w = 0110 eine formale Sprache? Was ist {0110}?",
      options: [
        "w ist ein Wort, {0110} ist eine Sprache (einelementige Menge)",
        "Beides sind formale Sprachen",
        "Weder w noch {0110} sind formale Sprachen"
      ],
      correctAnswer: 0,
      explanation:
        "w = 0110 ist ein Wort (ein konkretes Element), keine Sprache. {0110} hingegen ist eine formale Sprache – eine einelementige Menge, die genau dieses Wort enthält.",
      difficulty: 1,
      xpReward: 15
    },

    // TEIL B
    {
      id: "2-2-b-1",
      topicId: "formal-lang-2-2",
      part: "B",
      order: 4,
      question: "Gib eine kompakte Mengenschreibweise für L = {b, bb, bbb, bbbb, …} über Σ = {a, b} an:",
      options: [
        "L = { bⁿ | n ∈ ℕ, n ≥ 1 }",
        "L = { bⁿ | n ∈ ℕ }",
        "L = { aⁿbⁿ | n ∈ ℕ }"
      ],
      correctAnswer: 0,
      explanation:
        "L = { bⁿ | n ∈ ℕ, n ≥ 1 } ist die korrekte Notation. Die Bedingung n ≥ 1 ist wichtig, da ε (das leere Wort) nicht in L liegt.",
      difficulty: 1,
      xpReward: 20
    },
    {
      id: "2-2-b-2",
      topicId: "formal-lang-2-2",
      part: "B",
      order: 5,
      question: "Beschreibe die Sprache L = {ε, 0, 00, 000, …} = {0ⁿ | n ∈ ℕ} über Σ = {0, 1} in Worten:",
      options: [
        "L besteht aus Wörtern, die nur aus Nullen bestehen (inkl. ε). Das Wort 1 ist nicht enthalten, ε schon.",
        "L besteht aus Wörtern, die nur aus Einsen bestehen. Das Wort 1 ist enthalten.",
        "L besteht aus allen binären Wörtern. ε und 1 sind beide enthalten."
      ],
      correctAnswer: 0,
      explanation:
        "L ist die Menge aller Wörter über {0,1}, die ausschließlich aus Nullen bestehen (inkl. leerem Wort). Das Wort 1 ist nicht enthalten, ε dagegen schon (n=0).",
      difficulty: 1,
      xpReward: 20
    },
    {
      id: "2-2-b-3",
      topicId: "formal-lang-2-2",
      part: "B",
      order: 6,
      question: "Sei L = { w ∈ {0,1}* | |w| ist gerade }. Welche sind die ersten fünf Wörter?",
      options: [
        "ε, 00, 01, 10, 11",
        "ε, 0, 1, 00, 01",
        "00, 01, 10, 11, 000"
      ],
      correctAnswer: 0,
      explanation:
        "ε hat Länge 0 (gerade), dann folgen alle Wörter der Länge 2: 00, 01, 10, 11. Wörter der Länge 1 sind nicht enthalten.",
      difficulty: 2,
      xpReward: 25
    },

    // TEIL C
    {
      id: "2-2-c-1",
      topicId: "formal-lang-2-2",
      part: "C",
      order: 7,
      question: "Sei u = ab und v = ba. Berechne uv:",
      options: [
        "abba",
        "baab",
        "aabb"
      ],
      correctAnswer: 0,
      explanation:
        "Konkatenation: uv = ab concatenated mit ba = abba. (Merke: Reihenfolge ist wichtig!)",
      difficulty: 1,
      xpReward: 15
    },
    {
      id: "2-2-c-2",
      topicId: "formal-lang-2-2",
      part: "C",
      order: 8,
      question: "Sei u = ab und v = ba. Berechne u³:",
      options: [
        "ababab",
        "aababb",
        "abababa"
      ],
      correctAnswer: 0,
      explanation:
        "u³ = u · u · u = ab · ab · ab = ababab",
      difficulty: 1,
      xpReward: 15
    },
    {
      id: "2-2-c-3",
      topicId: "formal-lang-2-2",
      part: "C",
      order: 9,
      question: "Gilt für alle Wörter u, v: uv = vu?",
      options: [
        "Nein – Gegenbeispiel: u = ab, v = b ⟹ uv = abb, aber vu = bab",
        "Ja – Konkatenation ist kommutativ",
        "Das gilt nur für u und v gleicher Länge"
      ],
      correctAnswer: 0,
      explanation:
        "Konkatenation ist im Allgemeinen nicht kommutativ. Das Gegenbeispiel zeigt, dass uv ≠ vu sein kann.",
      difficulty: 2,
      xpReward: 25
    },
    {
      id: "2-2-c-4",
      topicId: "formal-lang-2-2",
      part: "C",
      order: 10,
      question: "Zeige: Für jedes Wort w gilt εw = wε = w. Warum?",
      options: [
        "ε ist das leere Wort; Anhängen von ε ändert kein Wort. εw fügt nichts vor w ein, wε fügt nichts danach.",
        "Weil ε = 0 ist und 0 · w = 0",
        "Das ist ein Axiom und muss nicht bewiesen werden"
      ],
      correctAnswer: 0,
      explanation:
        "ε ist das leere Wort (Länge 0). Das Anhängen von ε ändert kein Wort. Formal folgt dies aus w⁰ = ε und der Definition der Konkatenation.",
      difficulty: 2,
      xpReward: 25
    },

    // TEIL D - Knobel
    {
      id: "2-2-d-1",
      topicId: "formal-lang-2-2",
      part: "D",
      order: 11,
      question:
        "Sei Σ = {a, b}. Welche Aussage ist korrekt?\\nA = {w ∈ Σ* | w enthält gleich viele a's wie b's}\\nB = {(ab)ⁿ | n ∈ ℕ}\\nC = Sprache mit gleich vielen a's und b's",
      options: [
        "B ⊊ A = C (B ist echte Teilmenge von A, A = C)",
        "A = B = C (alle drei sind gleich)",
        "A ⊊ B (A ist echte Teilmenge von B)"
      ],
      correctAnswer: 0,
      explanation:
        "C = A (beide beschreiben genau die Wörter mit gleich vielen a's und b's). B ⊊ A, denn B enthält nur Wörter der Form (ab)ⁿ wie ab, abab. A enthält aber auch ba, aabb, etc. Also: B ⊊ A = C.",
      difficulty: 3,
      xpReward: 40
    }
  ]
}
