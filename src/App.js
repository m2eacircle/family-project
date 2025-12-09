import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Trophy, BarChart3, CheckCircle, XCircle, Home, Play, ArrowLeft, ChevronRight, Download, Flag, Eye, TrendingUp, Pause } from 'lucide-react';

// Subjects organized by lesson
const subjectsByLesson = {
  "Lesson 1": [
    "Anatomy and Physiology",
    "College English and Computer Skills",
    "Dental Anatomy",
    "Dental Hygiene Clinic I",
    "Dental Hygiene Theory I",
    "Histology and Embryology",
    "Infection Control",
    "Introduction to Professionalism",
    "Introduction to Psychology",
    "Introduction to Statistics and Research",
    "Microbiology"
  ],
  "Lesson 2": [
    "Dental Hygiene Clinic II",
    "Dental Hygiene Theory II",
    "Dental Materials Theory",
    "Dental Radiography Interpretation",
    "Dental Radiography Lab",
    "Dental Radiography Theory",
    "Head and Neck Anatomy",
    "Oral Health Education",
    "Pathophysiology",
    "Periodontology I",
    "Pharmacology",
    "Medical Emergencies"
  ],
  "Lesson 3": [
    "Community Dental Health I",
    "Dental Hygiene Clinic III",
    "Dental Hygiene Theory III",
    "Dental Materials Lab",
    "Ethics and Jurisprudence",
    "Gerontology",
    "Nutrition for Living",
    "Oral Health Promotion",
    "Oral Pathology",
    "Periodontology II"
  ],
  "Lesson 4": [
    "Business Practice",
    "Community Dental Health II",
    "Consolidated Learning",
    "Dental Hygiene Clinic IV",
    "Dental Hygiene Theory IV"
  ]
};

// Subjects with sub-topics
const subjectsWithSubtopics = {
  "Lesson 1": [
    "Anatomy and Physiology",
    "College English and Computer Skills",
    "Dental Anatomy",
    "Dental Hygiene Clinic I",
    "Dental Hygiene Theory I",
    "Histology and Embryology",
    "Infection Control",
    "Introduction to Professionalism",
    "Introduction to Psychology",
    "Introduction to Statistics and Research",
    "Microbiology"
  ],
  "Lesson 2": [
    "Dental Hygiene Clinic II",
    "Dental Hygiene Theory II",
    "Dental Materials Theory",
    "Dental Radiography Interpretation",
    "Dental Radiography Lab",
    "Dental Radiography Theory",
    "Head and Neck Anatomy",
    "Oral Health Education",
    "Pathophysiology",
    "Periodontology I",
    "Pharmacology",
    "Medical Emergencies"
  ],
  "Lesson 3": [
    "Community Dental Health I",
    "Dental Hygiene Clinic III",
    "Dental Hygiene Theory III",
    "Dental Materials Lab",
    "Ethics and Jurisprudence",
    "Gerontology",
    "Nutrition for Living",
    "Oral Health Promotion",
    "Oral Pathology",
    "Periodontology II"
  ],
  "Lesson 4": [
    "Business Practice",
    "Community Dental Health II",
    "Consolidated Learning",
    "Dental Hygiene Clinic IV",
    "Dental Hygiene Theory IV"
  ],
  "Pathophysiology": [
    "1. Inflammation and Healing",
    "2. Immunity and Infection (Part 1)",
    "3. Immunity and Infection (Part 2)",
    "4. Nervous System Disorders",
    "5. Stress and Associated Problems",
    "6. Blood and Circulatory System Disorders"
  ],
  "Dental Materials Theory": [
    "1. Introduction to Dental Materials and Oral environment and patient considerations",
    "2. Physical and Mechanical properties of dental materials and General handling and safety of dental materials in the dental office",
    "3. Dental amalgams, Metals and Alloys"
  ],
  "Periodontology I": [
    "1. Periodontal Anatomy",
    "2. The microbiology of periodontal diseases"
  ],
  "Dental Radiography Theory": [
    "1. Radiation History & Radiation Physics",
    "2. Dental X-ray Equipment, Film Processing",
    "3. Dental Radiography Theory",
    "4. Dental Radiography Theory",
    "5. Dental Radiography Theory",
    "6. Dental Radiography Theory",
    "7. Dental Radiography Theory",
    "8. Dental Radiography Theory"
  ]
};

// Question bank - ready for questions to be added
const questionBank = {
  "1. Inflammation and Healing": [
    { id: 101, question: "Which of the following belongs to the first line of defense?", options: ["Neutrophils", "Intact skin and mucous membranes", "T lymphocytes", "Antibodies"], correct: 1 },
    { id: 102, question: "Which lines of defense are considered non-specific?", options: ["First line only", "First and second lines", "Second and third lines", "Third line only"], correct: 1 },
    { id: 103, question: "Which is part of the second line of defense?", options: ["Skin", "Antibodies", "Inflammation", "Mucus"], correct: 2 },
    { id: 104, question: "Interferons are mainly activated against:", options: ["Bacteria", "Fungi", "Viruses and tumors", "Helminths"], correct: 2 },
    { id: 105, question: "Humoral immunity is mainly controlled by:", options: ["T lymphocytes", "Macrophages", "B lymphocytes and antibodies", "Neutrophils"], correct: 2 },
    { id: 106, question: "Which suffix is commonly used in disease names to indicate inflammation?", options: ["-osis", "-emia", "-itis", "-oma"], correct: 2 },
    { id: 107, question: "Which statement is TRUE about inflammation vs infection?", options: ["They are the same process.", "Infection is always caused by inflammation.", "Inflammation is always caused by infection.", "Infection can be one cause of inflammation."], correct: 3 },
    { id: 108, question: "Which of the following is a common cause of inflammation?", options: ["Mild exercise", "Direct physical damage like a cut or sprain", "High protein diet", "Normal body temperature"], correct: 1 },
    { id: 109, question: "What is the first step when tissue/capillary is injured in acute inflammation?", options: ["Histamine release", "Bradykinin release", "Neutrophil migration", "Macrophage activation"], correct: 1 },
    { id: 110, question: "Histamine is mainly released from which cells in the tissue?", options: ["Neutrophils", "Mast cells", "Eosinophils", "Platelets"], correct: 1 },
    { id: 111, question: "Bradykinin and histamine together cause which important vascular change?", options: ["Vasoconstriction", "Vasodilation of capillaries", "Decreased permeability", "Reduced blood flow (ischemia)"], correct: 1 },
    { id: 112, question: "Which cells are the two major phagocytic cells in inflammation?", options: ["B cells and T cells", "Neutrophils and macrophages", "Basophils and eosinophils", "Platelets and RBCs"], correct: 1 },
    { id: 113, question: "The main functional difference between neutrophils and macrophages is:", options: ["Only neutrophils can phagocytose", "They work in different locations", "Macrophages are not part of the immune system", "Neutrophils are not in blood"], correct: 1 },
    { id: 114, question: "Which local signs are typical of acute inflammation?", options: ["Fever and headache", "Redness, warmth, swelling, pain", "Malaise and anorexia", "Tachycardia and hypotension"], correct: 1 },
    { id: 115, question: "Which of the following is a systemic manifestation of acute inflammation?", options: ["Blister", "Mild fever", "Local redness", "Local edema"], correct: 1 },
    { id: 116, question: "Which type of exudate is described as watery, with few proteins and cells?", options: ["Fibrinous", "Purulent", "Serous", "Hemorrhagic"], correct: 2 },
    { id: 117, question: "Which exudate is thick and sticky, with high fibrin and WBCs?", options: ["Serous", "Fibrinous", "Purulent", "Serosanguinous"], correct: 1 },
    { id: 118, question: "Purulent exudate is best described as:", options: ["Clear and watery", "Yellow-green with many leukocytes, microbes, and cell debris", "Thin with only plasma", "Only fibrin"], correct: 1 },
    { id: 119, question: "Which is TRUE for chronic inflammation compared to acute?", options: ["More swelling and exudate", "Less immune cells", "More lymphocytes, macrophages, fibroblasts", "No tissue destruction occurs"], correct: 2 },
    { id: 120, question: "Which definition best describes granulation tissue?", options: ["Dead tissue inside a wound", "New connective tissue and capillaries on wound surface", "A collection of pus", "Old scar tissue"], correct: 1 },
    { id: 121, question: "The main complication of chronic inflammation is:", options: ["Edema", "Deep ulceration", "Keloid formation", "Bone fracture"], correct: 1 },
    { id: 122, question: "Which type of healing is seen in mild sunburn that disappears in 3–4 days without scarring?", options: ["Resolution", "Regeneration", "Replacement", "Chronic inflammation"], correct: 0 },
    { id: 123, question: "Regeneration means:", options: ["Functional tissue replaced by scar", "Damaged tissue replaced by non-functional cells", "Damaged tissue replaced by functional cells of the same type", "No cells are replaced"], correct: 2 },
    { id: 124, question: "Replacement (in healing) is MOST common in which system?", options: ["Muscular system", "Nervous system", "Digestive system", "Endocrine system"], correct: 1 },
    { id: 125, question: "Healing by first intention usually involves:", options: ["Large contaminated wound", "Clean wound with small gap and minimal tissue loss", "Massive tissue destruction", "Always infected tissue"], correct: 1 },
    { id: 126, question: "Healing by second intention is characterized by:", options: ["Minimal inflammation", "Clean straight surgical incision", "Larger wound, more inflammation, more granulation, large scar", "No scar formation"], correct: 2 },
    { id: 127, question: "Which term describes bands of scar tissue that join surfaces that were previously separate?", options: ["Keloid", "Ulcer", "Adhesion", "Contracture"], correct: 2 },
    { id: 128, question: "Hypertrophic scar tissue / keloid is best described as:", options: ["Loss of epithelium only", "Overgrowth of fibrous tissue forming a thick, raised scar", "Only superficial redness", "Ulcer with necrosis"], correct: 1 },
    { id: 129, question: "Ulceration around a scar is mainly due to:", options: ["Excess melanin production", "Impaired blood supply to the area", "Increased nerve endings", "High protein diet"], correct: 1 },
    { id: 130, question: "Which combination correctly matches burn depth?", options: ["1st & 2nd degree – full-thickness", "3rd & 4th degree – partial-thickness", "1st & 2nd degree – partial-thickness", "2nd & 3rd degree – full-thickness"], correct: 2 },
    { id: 131, question: "Which layers are involved in a deep partial-thickness (2nd degree) burn?", options: ["Epidermis only", "Epidermis and dermis", "Dermis and hypodermis only", "Hypodermis only"], correct: 1 },
    { id: 132, question: "Which is a typical sign of a second-degree burn?", options: ["No pain", "Blisters", "Only redness", "Involvement of bone"], correct: 1 },
    { id: 133, question: "A third-degree burn involves:", options: ["Only epidermis", "Only epidermis and dermis", "All three skin layers, but not muscle or bone", "Bone and muscle only"], correct: 2 },
    { id: 134, question: "What makes a burn fourth-degree rather than third-degree?", options: ["Presence of blisters", "Only superficial redness", "Involvement of muscle and/or bone", "Infection with bacteria"], correct: 2 },
    { id: 135, question: "Which of the following is a common serious complication of burn injury?", options: ["Hyperglycemia only", "Dehydration, shock, infection", "Increased hair growth", "Extra skin thickness"], correct: 1 },
    { id: 136, question: "The blue-green discoloration around a burn wound is typically caused by:", options: ["Staphylococcus aureus", "Pseudomonas infection", "E. coli", "Candida"], correct: 1 },
    { id: 137, question: "Why is immediate covering of a clean burn wound important?", options: ["To prevent scar formation", "To prevent further infection", "To stop granulation tissue", "To increase exudate"], correct: 1 },
    { id: 138, question: "Which is NOT part of the first line of defense?", options: ["Tears", "Skin", "Gastric acid", "Antibodies"], correct: 3 },
    { id: 139, question: "Which describes the second line of defense?", options: ["Mechanical barriers", "Inflammation and phagocytosis", "Antibody production", "Memory response"], correct: 1 },
    { id: 140, question: "Which is part of the third line of defense?", options: ["Interferons", "Neutrophils", "T lymphocytes", "Skin pH"], correct: 2 },
    { id: 141, question: "Interferons primarily defend against:", options: ["Parasites", "Viruses", "Fungi", "Allergens"], correct: 1 },
    { id: 142, question: "Which cell produces antibodies?", options: ["T-helper cells", "Plasma cells (from B cells)", "Macrophages", "NK cells"], correct: 1 },
    { id: 143, question: "Which line of defense is nonspecific and includes fever?", options: ["First", "Second", "Third", "None"], correct: 1 },
    { id: 144, question: "Which immune component is both a protein and part of 2nd line?", options: ["Histamine", "Complement", "Dopamine", "Prostaglandin"], correct: 1 },
    { id: 145, question: "Which best describes humoral immunity?", options: ["Phagocytosis", "Antibody-mediated response", "Skin barrier", "Fever"], correct: 1 },
    { id: 146, question: "Which cells activate B lymphocytes?", options: ["NK cells", "T-helper cells", "Neutrophils", "Basophils"], correct: 1 },
    { id: 147, question: "Which example represents passive natural immunity?", options: ["Vaccination", "Getting sick from flu", "Breast milk IgA", "Injection of antivenom"], correct: 2 },
    { id: 148, question: "Which is NOT a typical cause of inflammation?", options: ["Ischemia", "Infection", "Foreign bodies", "Normal metabolism"], correct: 3 },
    { id: 149, question: "Inflammation begins when damaged cells release:", options: ["Histamine", "Bradykinin", "IL-2", "Complement"], correct: 1 },
    { id: 150, question: "Histamine is released by:", options: ["Neutrophils", "Mast cells", "RBCs", "NK cells"], correct: 1 },
    { id: 151, question: "Bradykinin directly causes:", options: ["WBC activation", "Fever", "Pain", "Antibody production"], correct: 2 },
    { id: 152, question: "Vasodilation during inflammation results in:", options: ["Pale skin", "Hyperemia", "Necrosis", "Hypoxia"], correct: 1 },
    { id: 153, question: "Increased capillary permeability causes:", options: ["Fever", "Tachycardia", "Edema", "Hemorrhage"], correct: 2 },
    { id: 154, question: "Neutrophils are recruited primarily during:", options: ["Chronic infection", "Acute inflammation", "Viral infection only", "Allergy"], correct: 1 },
    { id: 155, question: "Which is the MOST abundant WBC in acute inflammation?", options: ["Eosinophils", "Basophils", "Neutrophils", "Lymphocytes"], correct: 2 },
    { id: 156, question: "Macrophages are dominant in:", options: ["Early inflammation", "Chronic inflammation", "Allergic reactions", "Antibody production"], correct: 1 },
    { id: 157, question: "The term 'chemotaxis' refers to:", options: ["WBC movement toward injury", "RBC rupture", "Vasodilation", "Pain sensation"], correct: 0 },
    { id: 158, question: "Redness and warmth are due to:", options: ["Fever", "Vasodilation", "Platelet activation", "Scar formation"], correct: 1 },
    { id: 159, question: "Swelling is mainly caused by:", options: ["RBC destruction", "Fluid shift into tissues", "Fever", "Tissue regeneration"], correct: 1 },
    { id: 160, question: "Purulent exudate contains:", options: ["Water only", "Fibrin only", "Pus: leukocytes + bacteria + debris", "Plasma only"], correct: 2 },
    { id: 161, question: "Serous exudate usually indicates:", options: ["Severe infection", "Mild inflammation", "Chronic inflammation", "Hemorrhage"], correct: 1 },
    { id: 162, question: "Fibrinous exudate is characteristic of:", options: ["Mild allergy", "Severe inflammation", "Viral infection", "Burns only"], correct: 1 },
    { id: 163, question: "Systemic effects of inflammation do NOT include:", options: ["Mild fever", "Fatigue", "Leukocytosis", "Local necrosis only"], correct: 3 },
    { id: 164, question: "Fever is triggered by:", options: ["Histamine", "Bradykinin", "Pyrogens", "Serotonin"], correct: 2 },
    { id: 165, question: "Leukocytosis means:", options: ["Low RBC", "High WBC", "Low WBC", "High platelets"], correct: 1 },
    { id: 166, question: "A shift to the left (blood test) indicates:", options: ["Increase in immature neutrophils", "RBC deficiency", "Eosinophil dominance", "Platelet loss"], correct: 0 },
    { id: 167, question: "Chronic inflammation is characterized by:", options: ["More exudate", "More swelling", "More lymphocytes & macrophages", "No tissue destruction"], correct: 2 },
    { id: 168, question: "Resolution occurs when:", options: ["Tissue damage is severe", "Tissue is destroyed completely", "Mild injury returns to normal", "Scar replaces tissue"], correct: 2 },
    { id: 169, question: "Regeneration requires:", options: ["Mitotic cells", "Non-dividing cells", "RBCs", "Neurons"], correct: 0 },
    { id: 170, question: "Which tissue heals by replacement?", options: ["Liver", "Skin epithelium", "Nervous tissue", "Bone marrow"], correct: 2 },
    { id: 171, question: "Granulation tissue consists of:", options: ["Neurons and cartilage", "Connective tissue + new capillaries", "Scar tissue only", "Necrotic cells"], correct: 1 },
    { id: 172, question: "A deep ulcer forms mainly due to:", options: ["Excess epithelial growth", "Poor blood supply", "High RBC count", "Strong immune response"], correct: 1 },
    { id: 173, question: "A keloid is:", options: ["A shallow ulcer", "Overgrown fibrous scar tissue", "Early granulation tissue", "A wound infection"], correct: 1 },
    { id: 174, question: "Adhesions occur when:", options: ["Bone tissue forms", "Scar tissue connects separate structures", "RBCs accumulate", "Ulcers heal"], correct: 1 },
    { id: 175, question: "Contracture refers to:", options: ["Muscle paralysis", "Shortening of scar tissue", "Excessive bleeding", "Wound reopening"], correct: 1 },
    { id: 176, question: "First intention healing involves:", options: ["Large wound", "Infection", "Minimal tissue loss", "Heavy scarring"], correct: 2 },
    { id: 177, question: "Second intention healing involves:", options: ["Small, clean wound", "No granulation tissue", "Large scar formation", "No inflammation"], correct: 2 },
    { id: 178, question: "First-degree burns affect:", options: ["Epidermis only", "Dermis only", "All 3 skin layers", "Muscle"], correct: 0 },
    { id: 179, question: "Which burn type includes blisters?", options: ["First degree", "Superficial partial-thickness", "Full-thickness", "Fourth degree"], correct: 1 },
    { id: 180, question: "Deep partial-thickness burns involve:", options: ["Epidermis only", "Epidermis & dermis", "Dermis & hypodermis", "All layers including bone"], correct: 1 },
    { id: 181, question: "Full-thickness burns involve:", options: ["Epidermis", "Dermis", "Hypodermis", "All of the above"], correct: 3 },
    { id: 182, question: "Fourth-degree burns involve:", options: ["Skin only", "Skin + muscle/bone", "Epidermis only", "Dermis only"], correct: 1 },
    { id: 183, question: "Which burn type usually requires skin grafting?", options: ["First-degree", "Second-degree", "Third-degree", "Superficial"], correct: 2 },
    { id: 184, question: "Major complication of burns due to fluid loss:", options: ["Hypertension", "Shock", "Hypoglycemia", "Fever only"], correct: 1 },
    { id: 185, question: "A blue-green burn wound suggests:", options: ["S. aureus", "Pseudomonas", "Candida", "HPV"], correct: 1 },
    { id: 186, question: "Why do burn patients develop infection easily?", options: ["Temperature drop", "Skin barrier lost", "High RBC count", "Increased immunity"], correct: 1 },
    { id: 187, question: "Immediate covering of a burn wound is essential to:", options: ["Reduce scarring", "Prevent infection", "Increase exudate", "Stop pain completely"], correct: 1 },
    { id: 188, question: "A 25-year-old woman cuts her hand while cooking. Minutes later, the area becomes red, warm, and swollen. Which mediator caused the initial pain and triggered the inflammatory cascade?", options: ["Histamine", "Bradykinin", "Prostaglandin", "Interferon"], correct: 1 },
    { id: 189, question: "A 40-year-old man develops cellulitis on his leg. The area is warm and erythematous. What is the physiological cause?", options: ["Leukocytosis", "Vasodilation", "Platelet activation", "Fibrin formation"], correct: 1 },
    { id: 190, question: "A child is stung by a bee. The skin around the sting becomes swollen. Which process is responsible?", options: ["RBC leakage", "Increased capillary permeability", "Decreased blood flow", "Antibody production"], correct: 1 },
    { id: 191, question: "A 60-year-old patient has long-standing inflammation in his joints due to rheumatoid arthritis. Which cell type predominates?", options: ["Neutrophils", "NK cells", "Macrophages & lymphocytes", "Basophils"], correct: 2 },
    { id: 192, question: "A wound has thick yellow pus. Which best describes this exudate?", options: ["Serous", "Purulent", "Fibrinous", "Hemorrhagic"], correct: 1 },
    { id: 193, question: "A patient with pneumonia has a temperature of 38.9°C. What caused the fever?", options: ["Bradykinin", "Pyrogens", "Complement", "Antibodies"], correct: 1 },
    { id: 194, question: "Lab results show elevated WBCs and many immature neutrophils (bands). What does this indicate?", options: ["Viral infection", "Bacterial acute inflammation", "Chronic immune disorder", "Hemorrhage"], correct: 1 },
    { id: 195, question: "A shallow scrape on the skin heals completely with no scar. Which healing process occurred?", options: ["Replacement", "Regeneration", "Fibrosis", "Second intention"], correct: 1 },
    { id: 196, question: "A deep wound on the leg heals, but the new tissue cannot perform normal functions. Which best describes the healing?", options: ["Resolution", "Regeneration", "Replacement with scar tissue", "First intention"], correct: 2 },
    { id: 197, question: "A patient develops a large raised scar extending beyond the original wound edge. This is:", options: ["Ulcer", "Contracture", "Keloid", "Granulation tissue"], correct: 2 },
    { id: 198, question: "A woman develops abdominal pain months after surgery. Imaging shows scar tissue connecting bowel loops. What is this called?", options: ["Contracture", "Adhesion", "Keloid", "Fistula"], correct: 1 },
    { id: 199, question: "A patient has a burn with blisters, redness, and severe pain. What type of burn is this?", options: ["First degree", "Superficial partial-thickness", "Full-thickness", "Fourth degree"], correct: 1 },
    { id: 200, question: "A burn wound is white and charred, and the patient feels no pain. Why?", options: ["Too much exudate", "Nerves destroyed", "Excess histamine", "Severe edema"], correct: 1 },
    { id: 201, question: "A burn wound becomes blue-green and foul-smelling after several days. Which organism is most likely?", options: ["S. aureus", "Pseudomonas", "Candida", "Streptococcus"], correct: 1 },
    { id: 202, question: "A patient with extensive burns has low blood pressure and rapid pulse. The cause is:", options: ["Infection", "Fluid and electrolyte loss", "Hyperglycemia", "Fever"], correct: 1 },
    { id: 203, question: "A surgical incision with neatly approximated edges heals with minimal scarring. What type of healing is this?", options: ["First intention", "Second intention", "Replacement", "Chronic repair"], correct: 0 },
    { id: 204, question: "A bedridden patient develops an open sore on the back of his heel due to poor blood supply. What complication occurred?", options: ["Keloid", "Ulcer", "Fibrinous exudate", "Hyperplasia"], correct: 1 },
    { id: 205, question: "A patient using glucocorticoids for months develops slow wound healing. What explains this?", options: ["Increased WBC activity", "Inhibited immune and inflammatory responses", "Increased collagen formation", "Excess granulation tissue"], correct: 1 },
    { id: 206, question: "A patient with pneumonia develops a fibrinous exudate in the lungs. This indicates:", options: ["Mild inflammation", "Severe inflammation", "Viral infection", "Full tissue regeneration"], correct: 1 },
    { id: 207, question: "A patient's burn extends through epidermis, dermis, and subcutaneous tissue. Eschar is present. Which treatment is MOST likely required?", options: ["Ice packs", "Antibiotics only", "Skin graft", "NSAIDs only"], correct: 2 }
  ],
  "2. Immunity and Infection (Part 1)": [
    { id: 201, question: "Which of the following is a nonspecific immune response?", options: ["Antibody production", "Cell-mediated immunity", "Inflammation", "IgE synthesis"], correct: 2 },
    { id: 202, question: "Which immune response is mediated by B-lymphocytes?", options: ["Cell-mediated immunity", "Humoral immunity", "Nonspecific immunity", "Delayed hypersensitivity"], correct: 1 },
    { id: 203, question: "Where do T-lymphocytes mature?", options: ["Bone marrow", "Thymus", "Spleen", "Lymph nodes"], correct: 1 },
    { id: 204, question: "Which cell type performs phagocytosis?", options: ["B-cells", "T-helper cells", "Macrophages", "Plasma cells"], correct: 2 },
    { id: 205, question: "Which of the following is an exogenous antigen?", options: ["Cell surface protein", "Viral particle entering the body", "Self-antigen on RBCs", "MHC class I protein"], correct: 1 },
    { id: 206, question: "Which antibody is the first to increase during an immune response?", options: ["IgA", "IgG", "IgM", "IgE"], correct: 2 },
    { id: 207, question: "Which immunoglobulin is found in body secretions such as saliva and tears?", options: ["IgG", "IgM", "IgA", "IgD"], correct: 2 },
    { id: 208, question: "Which antibody can cross the placenta?", options: ["IgA", "IgD", "IgE", "IgG"], correct: 3 },
    { id: 209, question: "Which immunoglobulin is responsible for allergic reactions?", options: ["IgM", "IgA", "IgE", "IgG"], correct: 2 },
    { id: 210, question: "Which immune cell is involved in cell-mediated immunity?", options: ["B-cells", "Plasma cells", "T-lymphocytes", "Mast cells"], correct: 2 },
    { id: 211, question: "Which of the following is a lymphoid structure involved in immune function?", options: ["Pancreas", "Thymus", "Kidney", "Thyroid"], correct: 1 },
    { id: 212, question: "Which immune cell originates AND matures in the bone marrow?", options: ["T lymphocyte", "B lymphocyte", "NK cell", "Eosinophil"], correct: 1 },
    { id: 213, question: "Which chemical mediator is involved in allergic reactions?", options: ["Serotonin", "Histamine", "Complement C5a", "Interferon"], correct: 1 },
    { id: 214, question: "Which of the following best describes the function of antigens?", options: ["They destroy bacteria directly", "They stimulate the immune system to produce antibodies", "They activate complement without antibodies", "They neutralize pathogens directly"], correct: 1 },
    { id: 215, question: "Which type of immunity depends on T-lymphocytes?", options: ["Humoral immunity", "Nonspecific immunity", "Cell-mediated immunity", "Innate immunity"], correct: 2 },
    { id: 216, question: "Which antibody is MOST abundant in the blood?", options: ["IgA", "IgE", "IgG", "IgM"], correct: 2 },
    { id: 217, question: "Which immunoglobulin plays a major role in parasitic infections such as malaria?", options: ["IgG", "IgM", "IgE", "IgD"], correct: 2 },
    { id: 218, question: "Which immune cell secretes cytokines and presents antigens?", options: ["Neutrophil", "Macrophage", "B plasma cell", "Basophil"], correct: 1 },
    { id: 220, question: "Which immunoglobulin exists as a pentamer?", options: ["IgG", "IgA", "IgM", "IgD"], correct: 2 },
    { id: 221, question: "Which line([lesson, subjects]) of defense are considered nonspecific?", options: ["First line only", "First and second lines", "Second and third lines", "Third line only"], correct: 1 },
    { id: 222, question: "Which is an example of the first line of defense?", options: ["Antibody production", "Unbroken skin and mucous membranes", "Phagocytosis by neutrophils", "T-cell activation"], correct: 1 },
    { id: 223, question: "Tears and gastric juice are classified as which type of defense?", options: ["Mechanical barrier", "Chemical barrier", "Cellular immunity", "Humoral immunity"], correct: 1 },
    { id: 224, question: "Which of the following belongs to the second line of defense?", options: ["Skin", "Antibodies", "Inflammation", "Cell-mediated immunity"], correct: 2 },
    { id: 225, question: "Which of the following is a component of specific immunity?", options: ["Phagocytosis", "Interferon", "Antibody production", "Intact skin"], correct: 2 },
    { id: 226, question: "Which of the following is a lymphoid structure found in the small intestine?", options: ["Thymus", "Bone marrow", "Intestinal lymphoid tissue", "Hypothalamus"], correct: 2 },
    { id: 227, question: "Which statement about cell-surface antigens is TRUE?", options: ["They are identical in all humans", "They are unique to each individual except identical twins", "They exist only on microbes", "They are found only on red blood cells"], correct: 1 },
    { id: 228, question: "Which best describes an endogenous antigen?", options: ["Bacterial toxin entering the body", "Viral protein on a virus surface", "Self cell-surface marker recognized as antigen", "Pollen from the environment"], correct: 2 },
    { id: 229, question: "Which of the following is MOST commonly the chemical nature of antigens?", options: ["Lipids", "Proteins", "Nucleic acids", "Simple sugars"], correct: 1 },
    { id: 230, question: "Glycoproteins are composed of:", options: ["Lipids and proteins", "Carbohydrates and proteins", "Nucleic acids and proteins", "Carbohydrates and lipids"], correct: 1 },
    { id: 231, question: "Which group is correctly matched as immune cells?", options: ["Neurons and fibroblasts", "Lymphocytes and macrophages", "Keratinocytes and chondrocytes", "Osteocytes and adipocytes"], correct: 1 },
    { id: 232, question: "Macrophages belong to which system?", options: ["Central nervous system", "Musculoskeletal system", "Mononuclear phagocytic system", "Endocrine system"], correct: 2 },
    { id: 233, question: "Which cell type is primarily responsible for humoral immunity?", options: ["T-cells", "Macrophages", "B-cells", "NK cells"], correct: 2 },
    { id: 234, question: "Which cell type directly kills virus-infected or abnormal cells in cell-mediated immunity?", options: ["B lymphocytes", "Cytotoxic T cells", "Neutrophils", "Eosinophils"], correct: 1 },
    { id: 235, question: "What is the basic structure of an antibody (immunoglobulin)?", options: ["Spherical", "Spiral", "Y-shaped", "Ring-shaped"], correct: 2 },
    { id: 236, question: "What is the main function of antibodies?", options: ["Produce cytokines", "Neutralize antigens", "Phagocytose bacteria", "Activate bone marrow"], correct: 1 },
    { id: 237, question: "Which immunoglobulin is the largest in size?", options: ["IgA", "IgE", "IgG", "IgM"], correct: 3 },
    { id: 238, question: "Which statement about IgA is TRUE?", options: ["It is a pentamer", "It is mainly found in body secretions", "It crosses the placenta", "It is the main antibody in blood"], correct: 1 },
    { id: 239, question: "Which immunoglobulin helps activate B lymphocytes to produce more antibodies?", options: ["IgD", "IgM", "IgE", "IgA"], correct: 0 },
    { id: 240, question: "Which of the following is correctly paired?", options: ["IgE – main antibody in blood", "IgG – found mainly in secretions", "IgM – first antibody to increase in immune response", "IgA – crosses the placenta"], correct: 2 },
    { id: 241, question: "Which immunoglobulins are the main prerequisites for complement activation?", options: ["IgA and IgE", "IgG and IgM", "IgD and IgE", "IgA and IgD"], correct: 1 },
    { id: 242, question: "How many proteins are in the complement system (C1–C__)?", options: ["C1–C5", "C1–C7", "C1–C8", "C1–C9"], correct: 3 },
    { id: 243, question: "Which of the following is NOT a protein?", options: ["Histamine", "Cytokines", "Prostaglandin", "Dopamine"], correct: 2 },
    { id: 244, question: "Natural immunity is:", options: ["Immunity you get from vaccines", "Immunity you are born with", "Immunity from injected antibodies", "Immunity from organ transplant"], correct: 1 },
    { id: 245, question: "Which of the following is the best example of active natural immunity?", options: ["Receiving tetanus antitoxin after an animal bite", "Getting chickenpox and recovering", "Receiving a hepatitis B vaccine", "IgG from mother via placenta"], correct: 1 },
    { id: 246, question: "Which statement about IgG in pregnancy is TRUE?", options: ["IgG cannot cross the placenta", "All antibodies cross the placenta equally", "IgG is the only antibody that crosses the placenta", "IgM is the only antibody that crosses the placenta"], correct: 2 },
    { id: 247, question: "Which of the following describes passive artificial immunity?", options: ["Getting infected with influenza", "Receiving a live attenuated vaccine", "IgG crossing the placenta", "Injection of preformed antibodies made in a company"], correct: 3 },
    { id: 248, question: "In the primary immune response, significant antibody levels usually appear after:", options: ["1–2 days", "1–2 weeks", "1–2 months", "Immediately"], correct: 1 },
    { id: 249, question: "In the secondary immune response, compared to the primary response:", options: ["Antibodies appear later and are lower", "Antibodies appear faster and are 3–4 times higher", "There is no antibody production", "Antibody production is the same as primary"], correct: 1 },
    { id: 250, question: "Which drug is an immunosuppressant in transplant rejection?", options: ["Prednisone", "Azathioprine", "Cyclosporine", "Methotrexate"], correct: 2 },
    { id: 251, question: "Which type of hypersensitivity is IgE-mediated, involving mast cells and histamine release?", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 0 },
    { id: 252, question: "Which of the following is the most dangerous, life-threatening Type I reaction?", options: ["Hay fever", "Food allergy", "Eczema", "Anaphylactic shock"], correct: 3 },
    { id: 253, question: "Which is the best treatment combination for severe anaphylactic shock?", options: ["Antibiotics only", "Epinephrine, glucocorticoids, antihistamines, and oxygen", "NSAIDs and rest", "Only antihistamines"], correct: 1 },
    { id: 254, question: "In Type II hypersensitivity, the key feature is:", options: ["Immune complex deposition", "Sensitized T cells", "Antigen on the cell surface attacked by antibodies", "IgE bound to mast cells"], correct: 2 },
    { id: 255, question: "Which of the following is a classic example of Type II hypersensitivity?", options: ["Anaphylactic shock from peanuts", "Contact dermatitis from nickel", "Mismatched ABO blood transfusion", "Tuberculin skin test"], correct: 2 },
    { id: 256, question: "Natural immunity refers to:", options: ["Immunity from vaccines", "Immunity present at birth", "Immunity from antibody injection", "Immunity after transplant"], correct: 1 },
    { id: 257, question: "Acquired (adaptive) immunity is obtained by:", options: ["Genetic factors", "Exposure to antigens", "Placental transfer", "Medicine"], correct: 1 },
    { id: 258, question: "Example of active natural immunity:", options: ["Antitoxin injection", "Infection (ex: chickenpox)", "Vaccine", "IgG via placenta"], correct: 1 },
    { id: 259, question: "Which antibody crosses the placenta?", options: ["IgA", "IgM", "IgG", "IgE"], correct: 2 },
    { id: 260, question: "Passive artificial immunity includes:", options: ["Vaccine", "Infection", "Injection of pre-made antibodies", "Natural recovery"], correct: 2 },
    { id: 261, question: "Primary immune response usually takes:", options: ["1–2 days", "3–5 days", "1–2 weeks", "1–2 months"], correct: 2 },
    { id: 262, question: "Secondary immune response typically occurs in:", options: ["Minutes", "1–3 days", "1–2 weeks", "1 month"], correct: 1 },
    { id: 263, question: "Secondary response produces antibodies that are:", options: ["Lower", "Same", "3–4 times higher", "Much lower"], correct: 2 },
    { id: 264, question: "Which peak is the primary immune response?", options: ["First small peak", "Second large peak", "Both", "Neither"], correct: 0 },
    { id: 265, question: "Hyperacute transplant rejection occurs:", options: ["Months later", "Years later", "Immediately (hours–days)", "Weeks later"], correct: 2 },
    { id: 266, question: "Acute rejection usually occurs:", options: ["Immediately", "After weeks", "Months/years later", "Only in autoimmune disease"], correct: 1 },
    { id: 267, question: "The only immunosuppressant required:", options: ["Prednisone", "Methotrexate", "Cyclosporine", "Azathioprine"], correct: 2 },
    { id: 268, question: "Major risk of immunosuppressive therapy:", options: ["Stronger immunity", "Autoimmune disease", "Opportunistic infections", "High antibody production"], correct: 2 },
    { id: 269, question: "Type I hypersensitivity is mediated by:", options: ["IgG", "IgM", "IgE", "T-cells"], correct: 2 },
    { id: 270, question: "Which cells release histamine in Type I?", options: ["Neutrophils", "Mast cells & Basophils", "Macrophages", "NK cells"], correct: 1 },
    { id: 271, question: "Most dangerous Type I reaction:", options: ["Asthma", "Hay fever", "Eczema", "Anaphylactic shock"], correct: 3 },
    { id: 272, question: "Best immediate treatment for anaphylaxis:", options: ["Antibiotics", "Epinephrine", "NSAIDs", "Antivirals"], correct: 1 },
    { id: 273, question: "Type II hypersensitivity involves:", options: ["IgE + mast cell", "T-cells", "Antibody attack on cell-surface antigens", "Immune complex deposition"], correct: 2 },
    { id: 274, question: "Classic example of Type II hypersensitivity:", options: ["Contact dermatitis", "Allergic asthma", "Mismatched blood transfusion", "TB skin test"], correct: 2 },
    { id: 275, question: "In mismatched transfusion, what destroys RBCs?", options: ["Histamine", "Complement activation", "T-cell activation", "Autoantibody suppression"], correct: 1 },
    { id: 276, question: "Type III hypersensitivity is triggered by:", options: ["Allergens", "Cell-surface antigens", "Immune complexes", "Sensitized T-cells"], correct: 2 },
    { id: 277, question: "An immune complex is best defined as:", options: ["Antigen + complement", "Antigen + antibody bound together", "Antibody + cytokine", "T-cell + macrophage"], correct: 1 },
    { id: 278, question: "In Type III hypersensitivity, immune complexes mainly cause injury by activating:", options: ["Histamine release", "NK cells", "Complement system", "Platelets"], correct: 2 },
    { id: 279, question: "Final steps shared by most hypersensitivity reactions include:", options: ["Viral replication", "Complement activation → inflammation → phagocytosis → tissue damage", "T-cell killing", "Autoantibody formation"], correct: 1 },
    { id: 281, question: "Type IV hypersensitivity is mediated by:", options: ["IgG", "IgM", "Sensitized T-lymphocytes", "Mast cells"], correct: 2 },
    { id: 282, question: "In Type IV reactions, the antigen-presenting cell often involved is the:", options: ["Neutrophil", "Basophil", "Macrophage", "Platelet"], correct: 2 },
    { id: 283, question: "Sensitized T-cells in Type IV hypersensitivity release:", options: ["Histamine", "Prostaglandins", "Lymphokines", "Antibodies"], correct: 2 },
    { id: 284, question: "Which is the BEST example of Type IV hypersensitivity?", options: ["Mismatched blood transfusion", "Anaphylaxis", "Tuberculin (TB) skin test", "Serum sickness"], correct: 2 },
    { id: 285, question: "Contact dermatitis is classified as:", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 3 },
    { id: 286, question: "Autoimmune diseases occur because the body produces:", options: ["IgA", "Memory cells", "Autoantibodies against its own tissues", "Complement inhibitors"], correct: 2 },
    { id: 287, question: "Which autoimmune disease affects the thyroid gland?", options: ["Myasthenia gravis", "Pernicious anemia", "Scleroderma", "Hashimoto's thyroiditis"], correct: 3 },
    { id: 288, question: "Myasthenia gravis primarily causes:", options: ["Liver fibrosis", "Hyperthyroidism", "Muscle weakness due to blocked neurotransmission", "Increased RBC count"], correct: 2 },
    { id: 289, question: "Primary immunodeficiency is typically:", options: ["Environmental", "Drug-induced", "Infectious", "Congenital (developmental defect)"], correct: 3 },
    { id: 290, question: "X-linked hypogammaglobulinemia is more symptomatic in:", options: ["Females", "Children only", "Elderly adults", "Males"], correct: 3 },
    { id: 291, question: "Secondary immunodeficiency can be caused by all EXCEPT:", options: ["Splenectomy", "Malnutrition", "Chemotherapy", "Healthy diet"], correct: 3 },
    { id: 292, question: "The most prominent infectious cause of secondary immunodeficiency is:", options: ["Hepatitis B", "Varicella", "HIV infection", "Influenza"], correct: 2 },
    { id: 293, question: "HIV is classified as a:", options: ["DNA virus", "Bacteriophage", "Retrovirus", "Paramyxovirus"], correct: 2 },
    { id: 294, question: "HIV contains which unique feature?", options: ["One DNA molecule", "One RNA molecule", "Two RNA molecules", "No nucleic acid"], correct: 2 },
    { id: 295, question: "Reverse transcriptase (RT) in HIV is responsible for:", options: ["Protein synthesis", "Entering the cell", "Converting viral RNA into DNA", "Splitting T-cells"], correct: 2 },
    { id: 296, question: "The MOST important step in HIV's life cycle is:", options: ["Viral budding", "Capsid formation", "Spike protein synthesis", "Integration of viral DNA into human chromosome"], correct: 3 },
    { id: 297, question: "Which body fluids have the highest risk for HIV transmission?", options: ["Sweat", "Tears", "Blood, semen, vaginal secretions", "Saliva"], correct: 2 },
    { id: 298, question: "Which group is at the highest risk for HIV infection?", options: ["Office workers", "Athletes", "Teenagers", "IV drug users"], correct: 3 },
    { id: 300, question: "The AIDS stage is characterized by all EXCEPT:", options: ["High viral load", "Low CD4 count", "Opportunistic infections", "High antibody levels"], correct: 3 },
    { id: 301, question: "The infection shown as PCP is most commonly associated with:", options: ["Healthy young adults", "HIV/AIDS patients", "Childhood viral infections", "Autoimmune disease"], correct: 1 },
    { id: 302, question: "Pneumocystis jirovecii pneumonia (PCP) primarily affects which body system?", options: ["Nervous system", "Respiratory system", "Digestive system", "Endocrine system"], correct: 1 },
    { id: 303, question: "Kaposi sarcoma is caused by which virus?", options: ["HIV", "HPV", "HHV-8", "EBV"], correct: 2 },
    { id: 304, question: "Kaposi sarcoma is especially common in which condition?", options: ["Asthma", "HIV/AIDS", "Diabetes", "Tuberculosis"], correct: 1 },
    { id: 305, question: "Severe esophageal bleeding caused by:", options: ["Streptococcus", "Candida infection", "CMV", "HSV"], correct: 1 },
    { id: 306, question: "Candida esophagitis occurs most frequently in:", options: ["Healthy adults", "Patients with high immunity", "Immunocompromised individuals", "Athletes"], correct: 2 },
    { id: 307, question: "Aggressive periodontitis commonly associated with:", options: ["HIV infection", "Influenza", "Allergies", "Appendicitis"], correct: 0 },
    { id: 308, question: "Which opportunistic infection is the most classic in HIV patients?", options: ["Hepatitis A", "PCP", "Salmonella", "Influenza"], correct: 1 },
    { id: 309, question: "Which HIV drug class blocks the integration step of the viral life cycle?", options: ["NRTIs", "Protease inhibitors", "Fusion inhibitors", "Integrase inhibitors"], correct: 3 },
    { id: 310, question: "The integration step refers to:", options: ["Viral RNA becoming protein", "Viral DNA joining host DNA", "Protein packaging", "Viral budding"], correct: 1 },
    { id: 311, question: "HAART consists of how many medications?", options: ["1", "2", "3", "5"], correct: 2 },
    { id: 312, question: "HAART usually combines drugs from which groups?", options: ["NRTIs + NNRTIs", "Fusion + integrase only", "Only protease inhibitors", "Antifungals"], correct: 0 },
    { id: 313, question: "Which HIV drug class targets reverse transcriptase?", options: ["NRTIs", "NNRTIs", "Both A and B", "Neither"], correct: 2 },
    { id: 314, question: "Which of the following is NOT part of HIV drug classes discussed?", options: ["NRTIs", "NNRTIs", "MAC inhibitors", "Integrase inhibitors"], correct: 2 },
    { id: 315, question: "The alternative complement pathway is:", options: ["Antibody dependent", "Antibody independent", "RNA dependent", "IgE dependent"], correct: 1 },
    { id: 316, question: "The classical complement pathway requires:", options: ["No antibodies", "IgE only", "Antibodies", "Macrophages"], correct: 2 },
    { id: 317, question: "Key protein in the alternative pathway:", options: ["C1", "C2", "C3", "C9"], correct: 2 },
    { id: 318, question: "Key protein in the classical pathway:", options: ["C1", "C3", "C5", "C7"], correct: 0 },
    { id: 319, question: "Both complement pathways end in formation of:", options: ["Lectins", "IgE", "Membrane Attack Complex", "MHC I"], correct: 2 },
    { id: 320, question: "MAC destroys cells by:", options: ["Blocking ribosomes", "Forming channels in membrane", "Stopping DNA replication", "Removing mitochondria"], correct: 1 },
    { id: 321, question: "Which bacteria are more resistant to MAC?", options: ["Gram-negative", "Gram-positive", "Acid-fast", "Anaerobes"], correct: 1 },
    { id: 322, question: "Which bacteria are more resistant to antibiotics?", options: ["Gram-positive", "Gram-negative", "Both equally", "Neither"], correct: 1 },
    { id: 323, question: "The first step of phagocytosis is:", options: ["Digestion", "Exocytosis", "Pseudopod formation", "Lysosome fusion"], correct: 2 },
    { id: 324, question: "After internalization, the antigen becomes enclosed in:", options: ["Lysosome", "Phagosome", "Ribosome", "Nucleus"], correct: 1 },
    { id: 325, question: "Fusion of a phagosome with a lysosome produces:", options: ["Peroxisome", "Phagolysosome", "Megasome", "Endosome"], correct: 1 },
    { id: 326, question: "Final waste material expelled from the cell is called:", options: ["Residual bodies", "Histamine granules", "Cytokines", "Myelin"], correct: 0 },
    { id: 327, question: "Which cells perform phagocytosis in the bloodstream?", options: ["T cells", "B cells", "Neutrophils (PMNs)", "Platelets"], correct: 2 },
    { id: 328, question: "Which cells perform phagocytosis in tissues?", options: ["Basophils", "Macrophages", "RBCs", "Mast cells"], correct: 1 },
    { id: 329, question: "Which is TRUE regarding phagocytosis?", options: ["Lysosomes digest pathogens", "Phagocytosis produces IgE", "Antibodies are needed", "Only viruses are phagocytosed"], correct: 0 },
    { id: 330, question: "PCP is caused by which organism?", options: ["Parasite", "Fungus-like organism", "Bacteria", "Virus"], correct: 1 },
    { id: 331, question: "Which symptom is MOST typical of PCP?", options: ["Severe diarrhea", "Shortness of breath with dry cough", "Skin rash", "Jaundice"], correct: 1 },
    { id: 332, question: "Kaposi sarcoma lesions are usually described as:", options: ["Yellow and crusted", "Purple or violaceous patches", "White nodules", "Transparent blisters"], correct: 1 },
    { id: 333, question: "Which patient is MOST likely to develop Kaposi sarcoma?", options: ["A patient with controlled diabetes", "An immunocompetent adult", "A patient with advanced HIV", "A child with chickenpox"], correct: 2 },
    { id: 334, question: "Candida esophagitis is MOST commonly associated with which symptom?", options: ["Painful swallowing", "Loss of vision", "Leg cramps", "Ear pain"], correct: 0 },
    { id: 335, question: "Oral thrush and Candida esophagitis occur most often due to:", options: ["Excessive vitamin intake", "Fungal overgrowth in immunosuppression", "Autoimmune attack", "Viral replication"], correct: 1 },
    { id: 336, question: "Aggressive periodontitis leads to:", options: ["Tooth enamel whitening", "Rapid periodontal tissue destruction", "Gingival calcification", "Improved oral health"], correct: 1 },
    { id: 337, question: "Which finding strongly suggests HIV-associated oral disease?", options: ["Mild soreness", "Aggressive periodontal destruction", "Occasional bleeding gums", "Excessive tartar formation"], correct: 1 },
    { id: 338, question: "Which HIV drug directly inhibits viral entry into the cell?", options: ["Fusion inhibitors", "NRTIs", "Integrase inhibitors", "Protease inhibitors"], correct: 0 },
    { id: 339, question: "Reverse transcriptase converts:", options: ["DNA → RNA", "RNA → DNA", "Protein → RNA", "DNA → protein"], correct: 1 },
    { id: 340, question: "Integrase inhibitors prevent which stage?", options: ["Viral assembly", "Viral budding", "Viral DNA insertion into host chromosome", "Viral entry"], correct: 2 },
    { id: 341, question: "Without integrase, HIV cannot:", options: ["Produce antibodies", "Attach to receptors", "Become part of the host genome", "Form envelopes"], correct: 2 },
    { id: 342, question: "HAART is used because HIV:", options: ["Mutates rapidly", "Does not mutate", "Is eliminated easily", "Cannot resist antibiotics"], correct: 0 },
    { id: 343, question: "The main advantage of HAART is:", options: ["It cures HIV", "It suppresses viral replication", "It boosts RBC production", "It eliminates all opportunistic infections"], correct: 1 },
    { id: 344, question: "A patient taking NRTIs and NNRTIs is receiving:", options: ["HIV vaccine", "HAART", "Antifungal therapy", "Antibiotics"], correct: 1 },
    { id: 345, question: "The complement system is normally:", options: ["Active at all times", "Present but inactive", "Not present in healthy individuals", "Only produced during fever"], correct: 1 },
    { id: 346, question: "Which statement is TRUE about the classical pathway?", options: ["It works without antibodies", "It requires antibodies", "It begins with C3 activation", "It begins in the liver"], correct: 1 },
    { id: 347, question: "Which protein initiates the classical pathway?", options: ["C3", "C5", "C1", "C9"], correct: 2 },
    { id: 348, question: "The alternative pathway begins with activation of:", options: ["C1", "IgM", "C3", "Histamine"], correct: 2 },
    { id: 349, question: "The main function of MAC is to:", options: ["Produce cytokines", "Create pores in membranes", "Neutralize antibodies", "Trigger fever"], correct: 1 },
    { id: 350, question: "MAC is part of which immune component?", options: ["Virus", "Complement system", "Antibody", "T-cell receptor"], correct: 1 },
    { id: 351, question: "Gram-positive bacteria resist MAC because of:", options: ["Thick peptidoglycan layer", "Thin cell wall", "Flagella", "Toxins"], correct: 0 },
    { id: 352, question: "The first physical action a phagocyte takes is:", options: ["Digesting lysosomes", "Forming pseudopods", "Expelling waste", "Releasing cytokines"], correct: 1 },
    { id: 353, question: "Which step represents the formation of a phagolysosome?", options: ["Pseudopod contact", "Lysosome + phagosome fusion", "Antibody binding", "Cell lysis"], correct: 1 },
    { id: 354, question: "Which organ has the highest number of macrophages?", options: ["Liver", "Skin", "Pancreas", "Thyroid"], correct: 0 },
    { id: 355, question: "Which immune cells are MOST active in tissues?", options: ["Eosinophils", "Macrophages", "Neutrophils", "B cells"], correct: 1 },
    { id: 356, question: "Which immune cells are MOST active in blood circulation?", options: ["Macrophages", "Neutrophils", "Basophils", "Plasma cells"], correct: 1 },
    { id: 357, question: "Residual bodies are produced after:", options: ["Antibody production", "Digestion of microbes", "Activation of complement", "Fever onset"], correct: 1 },
    { id: 358, question: "Which combination is correct?", options: ["Phagosome = lysosome only", "Phagolysosome = phagosome + lysosome", "Lysosome = engulfed microbe", "Pseudopod = membrane pore"], correct: 1 },
    { id: 359, question: "Which HIV-related opportunistic infection affects the esophagus?", options: ["PCP", "Kaposi sarcoma", "Candida", "CMV retinitis"], correct: 2 },
    { id: 360, question: "A patient with HIV presents with progressive dyspnea and non-productive cough. Chest X-ray shows diffuse bilateral interstitial infiltrates. Which immune defect MOST directly increases risk for this condition?", options: ["Loss of CD8 T-cell cytotoxicity", "Loss of CD4 T-helper cells", "Decreased complement C1", "Increased antibody IgG levels"], correct: 1 },
    { id: 361, question: "Which feature helps differentiate Kaposi sarcoma from simple vascular inflammation in HIV patients?", options: ["Red, flat lesions on chest", "Violaceous nodules due to HHV-8", "Lesions that disappear after antihistamine", "White plaques easily scraped off"], correct: 1 },
    { id: 362, question: "A patient has painful swallowing and bright-red bleeding in the esophagus. Biopsy reveals pseudohyphae. Which immune pathway failure contributes MOST to this infection?", options: ["MAC formation failure", "Failure of classical complement activation", "T-cell immunodeficiency", "Overactivation of neutrophils"], correct: 2 },
    { id: 363, question: "Which oral finding in HIV is MOST predictive of advanced immunosuppression?", options: ["Mild gingivitis", "Dental plaque", "Aggressive periodontitis with rapid bone loss", "Occasional gum bleeding"], correct: 2 },
    { id: 364, question: "Integrase inhibitors block which step?", options: ["RNA → DNA conversion", "Viral DNA insertion into host genome", "Viral entry through gp41", "Viral protein cleavage"], correct: 1 },
    { id: 365, question: "A patient stops taking HAART for 2 months. Which laboratory pattern is expected FIRST?", options: ["Antibody levels drop immediately", "CD4 count rises sharply", "Viral load spikes upward", "MAC formation decreases"], correct: 2 },
    { id: 366, question: "Which HIV drug class prevents conversion of viral RNA into proviral DNA?", options: ["Protease inhibitors", "Fusion inhibitors", "NRTI / NNRTI", "Integrase inhibitors"], correct: 2 },
    { id: 367, question: "Which pathway requires antibodies to activate complement?", options: ["Alternative", "Classical", "Lectin", "Both alternative and lectin"], correct: 1 },
    { id: 368, question: "Failure of C3 activation MOST severely affects which immune function?", options: ["MAC formation only", "Phagocytosis and opsonization", "IgE binding to mast cells", "Lymphokine secretion"], correct: 1 },
    { id: 369, question: "A bacterium is highly resistant to MAC but sensitive to antibiotics. Which description fits best?", options: ["Gram-negative", "Gram-positive", "Acid-fast", "Spirochete"], correct: 1 },
    { id: 370, question: "A pathogen forms pores in host cell membranes, leading to lysis. Which complement components form these pores?", options: ["C1 complex", "C3a and C5a", "C5b–C9", "IgM + IgG"], correct: 2 },
    { id: 371, question: "The FIRST step of phagocytosis depends on which action?", options: ["Lysosomal enzyme release", "Pseudopod extension", "Residual body exocytosis", "Formation of phagolysosome"], correct: 1 },
    { id: 372, question: "A macrophage engulfs a microbe but cannot digest it. Which structure malfunctioned?", options: ["Phagosome", "Lysosome", "Pseudopod", "C3 convertase"], correct: 1 },
    { id: 373, question: "In which organ would macrophage dysfunction MOST severely impair pathogen clearance?", options: ["Pancreas", "Liver", "Thyroid", "Cornea"], correct: 1 },
    { id: 374, question: "A patient has normal antibody levels but still activates complement against microbes. Which pathway explains this?", options: ["Classical", "Alternative", "Lectin", "None"], correct: 1 },
    { id: 375, question: "Which HIV life-cycle step occurs immediately BEFORE integration?", options: ["Fusion", "Reverse transcription", "Assembly", "Budding"], correct: 1 },
    { id: 376, question: "HAART commonly includes:", options: ["NRTI + NRTI + NNRTI", "Protease + protease + protease", "NNRTI alone", "NRTI + antifungal + antiviral"], correct: 0 },
    { id: 377, question: "A patient receiving HAART shows viral RNA inside the cytoplasm but no viral DNA in nucleus. Which drug class is working?", options: ["Protease inhibitor", "Integrase inhibitor", "NRTI", "NNRTI"], correct: 1 },
    { id: 378, question: "In PCP infection, impaired gas exchange occurs primarily because:", options: ["The fungus destroys alveoli", "Interstitial fluid and foamy exudate fill alveoli", "Bronchi collapse", "MAC overactivation causes lysis"], correct: 1 },
    { id: 379, question: "Candida esophagitis is classified as which type of infection?", options: ["Opportunistic fungal", "Primary viral", "Autoimmune", "Bacterial toxin-mediated"], correct: 0 },
    { id: 380, question: "Which HIV-related condition is BEST explained by depletion of CD4 T-cells?", options: ["Increased neutrophil count", "Inability to activate B-cell antibody production", "Increased RBC production", "Decreased complement C1"], correct: 1 },
    { id: 381, question: "A patient with HIV shows the following: High viral load, Low CD4 count, Baseline antibody levels decreasing. Which stage is this MOST consistent with?", options: ["Seroconversion", "HIV-positive latent stage", "AIDS (final stage)", "Window period"], correct: 2 },
    { id: 382, question: "A patient has thick gram-positive cell walls. Which complement outcome is expected?", options: ["MAC destroys the bacteria easily", "Bacteria show resistance to MAC", "Complement activation does not occur", "Bacteria inhibit antibody production"], correct: 1 },
    { id: 383, question: "Which step occurs LAST during phagocytosis?", options: ["Internalization", "Lysosome fusion", "Pseudopod formation", "Residual body release"], correct: 3 },
    { id: 384, question: "A patient with HIV develops violaceous lesions on legs and palate. Which additional finding is MOST expected?", options: ["Viral load low", "Caused by Candida species", "Caused by HHV-8 infection", "Resolves with antihistamines"], correct: 2 }
  ],
  "3. Immunity and Infection (Part 2)": [
    { id: 201, question: "Which complement activation pathway is antibody-independent?", options: ["Classical pathway", "Alternative pathway", "Lectin pathway", "Adaptive pathway"], correct: 1 },
    { id: 202, question: "Which protein is the key initiator of the classical pathway?", options: ["C1", "C3", "C5", "C9"], correct: 0 },
    { id: 203, question: "Which protein is the key initiator of the alternative pathway?", options: ["C1", "C3", "IgG", "C9"], correct: 1 },
    { id: 204, question: "The membrane attack complex (MAC) forms:", options: ["Cytokines", "Cell membrane pores", "Antibody clusters", "Histamine"], correct: 1 },
    { id: 205, question: "Gram-positive bacteria are more resistant to MAC because they have:", options: ["Thin cell walls", "Thick peptidoglycan layer", "No cell membrane", "Flagella"], correct: 1 },
    { id: 206, question: "The complement system in healthy individuals is:", options: ["Fully active", "Produced only during infection", "Present but inactive", "Absent"], correct: 2 },
    { id: 207, question: "Which immune cells are most active in phagocytosis in the bloodstream?", options: ["Macrophages", "Neutrophils", "B cells", "Basophils"], correct: 1 },
    { id: 208, question: "Which immune cells perform most phagocytosis in tissues?", options: ["Neutrophils", "Macrophages", "NK cells", "Eosinophils"], correct: 1 },
    { id: 209, question: "Organs rich in macrophages include all EXCEPT:", options: ["Liver", "Spleen", "Kidney", "Retina"], correct: 3 },
    { id: 210, question: "The first visible step of phagocytosis is:", options: ["Digestion", "Pseudopod formation", "Residual body release", "Phagolysosome formation"], correct: 1 },
    { id: 211, question: "The vesicle formed after internalization of the microbe is called:", options: ["Lysosome", "Phagosome", "Ribosome", "Nucleus"], correct: 1 },
    { id: 212, question: "Fusion of a phagosome with a lysosome results in:", options: ["Endosome", "Phagolysosome", "MAC", "Secretory vesicle"], correct: 1 },
    { id: 213, question: "Residual bodies are released after:", options: ["Pseudopod formation", "Microbe digestion", "Complement activation", "Antibody secretion"], correct: 1 },
    { id: 214, question: "Which complement pathway requires antibodies to begin?", options: ["Alternative", "Classical", "Adaptive", "Effector pathway"], correct: 1 },
    { id: 215, question: "What is the final shared outcome of both classical and alternative pathways?", options: ["Activation of IgM", "Formation of MAC", "Neutrophil apoptosis", "Antigen presentation"], correct: 1 },
    { id: 216, question: "MAC is less effective against which group of bacteria?", options: ["Gram-negative", "Gram-positive", "Intracellular bacteria", "Spirochetes"], correct: 1 },
    { id: 217, question: "Lysosomes contribute to phagocytosis by:", options: ["Producing antibodies", "Releasing digestive enzymes", "Forming pseudopods", "Making cytokines"], correct: 1 },
    { id: 218, question: "Which step occurs before phagolysosome formation?", options: ["Enzyme release", "Residual body formation", "Internalization", "Microbe digestion"], correct: 2 },
    { id: 219, question: "The complement system contributes to all EXCEPT:", options: ["Opsonization", "MAC formation", "Antibody production", "Inflammation"], correct: 2 },
    { id: 220, question: "Which of the following indicates the end of phagocytosis?", options: ["Pseudopod formation", "Microbe internalization", "Residual body exocytosis", "Phagosome formation"], correct: 2 },
    { id: 221, question: "The key protein for alternative complement activation is:", options: ["C1", "C3", "C5", "C9"], correct: 1 },
    { id: 222, question: "The key protein for classical complement activation is:", options: ["C1", "C3", "C8", "IgM"], correct: 0 },
    { id: 223, question: "Both classical and alternative pathways lead to formation of:", options: ["IgM", "Antigen-antibody complexes", "MAC", "Neutrophils"], correct: 2 },
    { id: 224, question: "MAC destroys cells by:", options: ["Digesting DNA", "Forming pores/channels in the membrane", "Breaking antibodies", "Releasing histamine"], correct: 1 },
    { id: 225, question: "Gram-positive bacteria resist MAC more because they have:", options: ["Capsule", "Thin cell wall", "Thick cell wall", "No membrane"], correct: 2 },
    { id: 226, question: "In healthy individuals, complement proteins are:", options: ["Fully active all the time", "Present but inactive", "Only produced during fever", "Absent"], correct: 1 },
    { id: 227, question: "The two major classes of WBCs are:", options: ["B cells and T cells", "NK cells and T cells", "Granulocytes and agranulocytes", "Dendritic cells and macrophages"], correct: 2 },
    { id: 228, question: "The most important phagocytic cells in blood are:", options: ["Basophils", "Neutrophils (PMNs)", "Eosinophils", "Macrophages"], correct: 1 },
    { id: 229, question: "The most important phagocytic cells in tissues are:", options: ["T cells", "Neutrophils", "Macrophages", "B cells"], correct: 2 },
    { id: 230, question: "Organs rich in macrophages include all EXCEPT:", options: ["Liver", "Kidney", "Spleen", "Lymph nodes"], correct: 1 },
    { id: 231, question: "The first step of phagocytosis is:", options: ["Digestion", "Formation of pseudopods", "Residual body release", "Fusion of lysosome"], correct: 1 },
    { id: 232, question: "Internalization results in formation of:", options: ["Nucleus", "Phagosome", "Lysosome", "Ribosome"], correct: 1 },
    { id: 233, question: "Fusion of lysosome + phagosome forms:", options: ["Endosome", "Phagolysosome", "Ribosome", "MAC"], correct: 1 },
    { id: 234, question: "Digestion of microbes produces:", options: ["Cytokines", "Residual bodies", "DNA fragments", "Capsules"], correct: 1 },
    { id: 235, question: "Which cells are most numerous in severe bacterial infection (as seen in CSF)?", options: ["Lymphocytes", "Eosinophils", "Neutrophils", "Basophils"], correct: 2 },
    { id: 236, question: "Which statement about pseudopods is TRUE?", options: ["They digest bacteria", "They are the first action of a phagocyte", "They are lysosomal enzymes", "They produce antibodies"], correct: 1 },
    { id: 237, question: "Where are PMNs (neutrophils) primarily located?", options: ["Brain", "Blood", "Lymph nodes", "Spleen"], correct: 1 },
    { id: 238, question: "Which statement BEST explains why the alternative pathway can be activated before antibody production?", options: ["It requires IgM only", "It depends solely on C1", "It is antibody-independent and triggered by C3", "It needs antigen-presenting cells first"], correct: 2 },
    { id: 239, question: "If a patient lacks C1 protein, which complement function will be MOST impaired?", options: ["Alternative pathway activation", "Classical pathway activation", "MAC formation only", "Neutrophil chemotaxis"], correct: 1 },
    { id: 240, question: "A microorganism with a thick outer structure resists MAC. Which organism type best fits this description?", options: ["Gram-negative bacteria", "Gram-positive bacteria", "Enveloped viruses", "Parasites"], correct: 1 },
    { id: 241, question: "During phagocytosis, which step would fail FIRST if lysosomal enzymes were absent?", options: ["Internalization", "Pseudopod formation", "Microbial digestion", "Phagosome formation"], correct: 2 },
    { id: 242, question: "A defect in pseudopod formation directly prevents:", options: ["Fusion of lysosome with phagosome", "Attachment of antibody to antigen", "Internalization of the microbe", "Release of residual bodies"], correct: 2 },
    { id: 243, question: "Which finding would indicate that a cell failed to form a phagolysosome?", options: ["Microbe remains intact inside a vesicle", "Excessive residual bodies", "MAC deposition", "Elevated C1 activation"], correct: 0 },
    { id: 244, question: "Which complement protein must be functional for BOTH classical and alternative pathways to produce MAC?", options: ["C1", "C3", "IgG", "C9"], correct: 1 },
    { id: 245, question: "If classical pathway activation is delayed, which immunity component is most likely insufficient?", options: ["Cytokines", "IgG or IgM", "C3 convertase", "Tissue macrophages"], correct: 1 },
    { id: 246, question: "A pathogen continues multiplying despite normal C1 and C3 levels. Which is the MOST likely defect?", options: ["MAC formation failure", "Excess phagocytosis", "Antibody overproduction", "Pseudopod malfunction"], correct: 0 },
    { id: 247, question: "In phagocytosis, which event directly follows antigen internalization?", options: ["Residual body release", "Pseudopod formation", "Phagosome formation", "Enzyme digestion"], correct: 2 },
    { id: 248, question: "Liver macrophages (Kupffer cells) are MOST responsible for:", options: ["Blood-borne pathogen filtration", "MAC-mediated killing", "Antibody production", "Complement synthesis"], correct: 0 },
    { id: 249, question: "A cell forms a phagosome but cannot digest the microbe. Which structure is defective?", options: ["Lysosome", "Pseudopod", "Cell membrane", "Phagosome"], correct: 0 },
    { id: 250, question: "Why are macrophages considered more important than neutrophils for chronic infections?", options: ["They survive longer in tissues", "They produce antibodies", "They activate C1", "They cannot form phagolysosomes"], correct: 0 },
    { id: 251, question: "Failure of the complement system to activate MAC will MOST affect which type of bacteria?", options: ["Gram-negative", "Gram-positive", "Gram-variable", "Acid-fast"], correct: 0 },
    { id: 252, question: "Which situation MOST decreases classical pathway activity?", options: ["Lack of C3", "Low IgG/IgM", "Excess macrophages", "Increased lysosome activity"], correct: 1 },
    { id: 253, question: "A microbe is found inside a vesicle with NO digestive enzyme activity. What stage of phagocytosis is incomplete?", options: ["Internalization", "Pseudopod formation", "Phagolysosome fusion", "Residual body release"], correct: 2 },
    { id: 254, question: "Which best describes the relationship between classical and alternative pathways?", options: ["Both require antibodies", "Both ultimately form MAC", "Only alternative forms MAC", "Only classical activates C3"], correct: 1 },
    { id: 255, question: "A patient has frequent infections, and labs show normal antibodies but very low C3. Which pathway is MOST impaired?", options: ["Classical pathway only", "Alternative pathway only", "Both pathways", "Neither pathway"], correct: 2 },
    { id: 256, question: "Which step directly leads to microbial destruction inside the phagocyte?", options: ["Pseudopod formation", "MAC insertion into membrane", "Action of lysosomal enzymes", "Antibody binding to antigen"], correct: 2 },
    { id: 257, question: "What does the presence of many residual bodies in a macrophage indicate?", options: ["MAC failure", "Recent successful phagocytosis", "Antibody deficiency", "Lack of pseudopods"], correct: 1 },
    { id: 258, question: "Which cell can recognize antigen WITHOUT the need for MHC or an APC?", options: ["CD4 T cell", "CD8 T cell", "B cell", "NK cell"], correct: 2 },
    { id: 259, question: "T cells can recognize antigens only when they are:", options: ["Free and floating in plasma", "Bound to MHC on an antigen-presenting cell", "Attached to antibodies", "Inside lysosomes"], correct: 1 },
    { id: 260, question: "According to the lecture, which is the ONLY situation where two humans have identical MHC molecules?", options: ["Fraternal twins", "Two siblings", "Identical twins", "Parent and child"], correct: 2 },
    { id: 261, question: "MHC class I is found on:", options: ["Only APCs", "All nucleated cells", "Only B cells", "Red blood cells"], correct: 1 },
    { id: 262, question: "MHC class II presents antigens to which cells?", options: ["CD8 T cells", "B cells", "CD4 T cells", "Neutrophils"], correct: 2 },
    { id: 263, question: "CD8 T cells (Tc and Ts) receive antigens through:", options: ["MHC I", "MHC II", "No MHC required", "Complement proteins"], correct: 0 },
    { id: 264, question: "CD4 T cells (Th and Td delayed hypersensitivity) receive antigens via:", options: ["MHC I", "MHC II", "Free antigen", "B-cell receptors"], correct: 1 },
    { id: 265, question: "Which statement about APCs in the lecture is TRUE?", options: ["APCs require a nucleus to present antigen via MHC I", "APCs express both MHC I and MHC II", "APCs can recognize antigen directly", "APCs do not require MHC molecules"], correct: 1 },
    { id: 266, question: "In the lecture, the instructor emphasized that B cells recognize:", options: ["Only linear peptides", "Only nonlinear peptides", "Both linear and nonlinear forms directly", "Only antigen–MHC complexes"], correct: 2 },
    { id: 267, question: "The lecture states that T cells CANNOT recognize antigen unless:", options: ["Complement proteins are activated", "Antibodies are already produced", "The antigen is attached to MHC", "The antigen is linear"], correct: 2 },
    { id: 268, question: "The ONLY two lymphocytes capable of antigen recognition are:", options: ["Neutrophils and macrophages", "B cells and T cells", "Dendritic cells and B cells", "Basophils and T cells"], correct: 1 },
    { id: 269, question: "In the T-cell recognition diagram from lecture, the antigen is located:", options: ["Outside the MHC structure", "Inside the MHC structure", "At the surface of B cells", "Inside lysosomes only"], correct: 1 },
    { id: 270, question: "Identical twins share the same MHC. This fact is important clinically for:", options: ["Cancer treatment", "Organ transplantation", "Diabetes diagnosis", "Hypertension management"], correct: 1 },
    { id: 271, question: "The lecture emphasized that antigen recognition via APC is required for:", options: ["B cells only", "Neutrophils only", "T cells only", "Both B and T cells"], correct: 2 },
    { id: 272, question: "Which scenario would make T-cell antigen recognition IMPOSSIBLE?", options: ["Antigen is bound to MHC II on an APC", "Antigen is linear but bound to MHC I", "Antigen is presented on a nucleated cell surface", "Antigen is present but NOT attached to any MHC molecule"], correct: 3 },
    { id: 273, question: "A student claims that B cells and T cells both require MHC for activation. Based on the lecture, what is the correct correction?", options: ["Both require MHC I", "Both require MHC II", "B cells do NOT require MHC", "T cells do NOT require MHC"], correct: 2 },
    { id: 274, question: "Which antigen presentation combination is INCORRECT?", options: ["MHC I → CD8", "MHC II → CD4", "MHC I → Tc/Ts cells", "MHC II → NK cells"], correct: 3 },
    { id: 275, question: "Which statement best explains why MHC matching is extremely rare between unrelated individuals?", options: ["APCs are structurally identical in all humans", "B cells require identical antibodies", "MHC molecules are genetically unique and match only in identical twins", "CD8 and CD4 require different DNA sequences"], correct: 2 },
    { id: 276, question: "A patient lacks MHC I molecules. Which immune function would be MOST impaired?", options: ["Activation of CD4 cells", "Recognition by B cells", "Activation of cytotoxic T cells", "Antigen binding to antibodies"], correct: 2 },
    { id: 277, question: "Which finding indicates T-cell activation by MHC II rather than MHC I?", options: ["Antigen presented on all nucleated cells", "Antigen presented on APC surface", "Response from cytotoxic T cells", "Response from suppressor T cells"], correct: 1 },
    { id: 278, question: "A virus infects only red blood cells. According to the lecture, which is TRUE?", options: ["It will activate CD8 T cells", "It will activate CD4 T cells", "It cannot be presented on MHC I", "It cannot be recognized by B cells"], correct: 2 },
    { id: 279, question: "In which situation would antigen recognition by B cells STILL occur normally?", options: ["APC is missing MHC II", "APC cannot process antigen", "Antigen is denatured", "Antigen is free-floating in plasma"], correct: 3 },
    { id: 280, question: "Which immune recognition pattern matches the T-cell diagram shown in lecture?", options: ["Antigen floating freely → CD8 activation", "Antigen attached to BCR → T-cell activation", "Antigen bound to MHC on APC → T-cell activation", "Antigen attached to complement → B-cell activation"], correct: 2 },
    { id: 281, question: "Which immune cell can recognize antigen directly without MHC or APC?", options: ["CD4 T cell", "CD8 T cell", "B cell", "Macrophage"], correct: 2 },
    { id: 282, question: "Which statement about T-cell antigen recognition is TRUE?", options: ["T cells recognize free antigens directly", "T cells require MHC + antigen on an APC", "T cells recognize antigens only inside phagosomes", "T cells recognize only linear peptides"], correct: 1 },
    { id: 283, question: "MHC class I presents antigen primarily to:", options: ["B cells", "CD4 T cells", "CD8 T cells", "Macrophages"], correct: 2 },
    { id: 284, question: "MHC class II molecules are found mainly on:", options: ["All nucleated cells", "RBCs", "Platelets", "Antigen-presenting cells"], correct: 3 },
    { id: 285, question: "The only scenario where two individuals share identical MHC is:", options: ["Siblings", "Parent and child", "Identical twins", "First cousins"], correct: 2 },
    { id: 286, question: "Which antigen form can B cells recognize BEST?", options: ["Only MHC-presented peptides", "Only peptide fragments", "Free antigens (linear or nonlinear)", "Only viral antigens"], correct: 2 },
    { id: 287, question: "A patient with a defect in C3 would have impairment in which pathway([lesson, subjects])?", options: ["Classical only", "Alternative only", "Both classical and alternative", "Neither pathway"], correct: 2 },
    { id: 288, question: "A patient is unable to activate complement without antibodies. Which protein is most likely defective?", options: ["C3", "C1", "C5", "C9"], correct: 1 },
    { id: 289, question: "A mutation causes failure of C3 to split spontaneously. Which pathway is impaired?", options: ["Classical only", "Alternative only", "Both classical and alternative", "Only terminal pathway"], correct: 1 },
    { id: 290, question: "A child's complement works normally, but he cannot generate MAC. Which components are defective?", options: ["C1–C3", "C5–C9", "C1–C4", "C3 only"], correct: 1 },
    { id: 291, question: "A microorganism survives despite MAC activation. Which finding best explains it?", options: ["Lacks MHC molecules", "Thick peptidoglycan layer", "Produces no toxins", "Has no surface antigens"], correct: 1 },
    { id: 292, question: "T cells fail to recognize antigen even though antigen is present on APCs. What is defective?", options: ["BCR", "Immunoglobulins", "MHC molecules", "Complement C3"], correct: 2 },
    { id: 293, question: "A researcher finds immune cells recognizing antigens without MHC binding. These cells are:", options: ["CD4 T cells", "CD8 T cells", "B cells", "Macrophages"], correct: 2 },
    { id: 294, question: "T cells recognize antigen only when:", options: ["Antigen is fragmented inside lysosome", "Antigen is linked to MHC on APC", "Antigen is soluble in blood", "Antigen is a polysaccharide"], correct: 1 },
    { id: 295, question: "MHC-I molecules are expected on which of the following?", options: ["Mature RBCs", "Neurons", "Platelets", "Bacteria"], correct: 1 },
    { id: 296, question: "A patient's CD8 T cells are normal, but no activation occurs. Which molecule is missing on APC?", options: ["MHC-II", "MHC-I", "Antibody", "Phagosome"], correct: 1 },
    { id: 297, question: "A cell lacks nucleus. Which immune presentation is impossible for this cell?", options: ["MHC-I presentation", "MHC-II presentation", "Antibody binding", "Complement activation"], correct: 0 },
    { id: 298, question: "A patient's APC shows antigen but does NOT activate CD4 T cells. Which MHC is missing?", options: ["MHC-I", "MHC-II", "BCR", "Complement C1"], correct: 1 },
    { id: 299, question: "Which cells display MHC Class II?", options: ["All nucleated cells", "All RBCs", "Only APCs", "Only neutrophils"], correct: 2 },
    { id: 300, question: "Which cell type does NOT have MHC class I?", options: ["Neurons", "Hepatocytes", "Erythrocytes (RBCs)", "Kidney cells"], correct: 2 },
    { id: 301, question: "HSV-1 MOST commonly affects which area according to the lecture?", options: ["Genital region", "Above the waist", "Below the waist", "Bloodstream"], correct: 1 },
    { id: 302, question: "Genital herpes is mainly caused by:", options: ["HSV-1", "HSV-2", "VZV", "EBV"], correct: 1 },
    { id: 303, question: "Recurrent HSV lesions are frequently triggered by:", options: ["Antibiotics", "Warm temperature only", "Sunlight and stress", "Parasitic infections"], correct: 2 },
    { id: 304, question: "The trigeminal ganglion is the latent site of reactivation for:", options: ["HSV-2", "HSV-1", "CMV", "EBV"], correct: 1 },
    { id: 305, question: "Which skin condition is described as painful but NOT itchy?", options: ["Chickenpox", "HSV-1 labial lesions", "Shingles (Herpes zoster)", "Oral candidiasis"], correct: 2 },
    { id: 306, question: "Chickenpox lesions are described as:", options: ["Painful, unilateral", "Itchy, non-painful", "Deep, ulcerative", "Firm and purple"], correct: 1 },
    { id: 307, question: "Which herpesvirus is specifically associated with Kaposi sarcoma in HIV patients?", options: ["HSV-1", "HSV-2", "HHV-8", "CMV"], correct: 2 },
    { id: 308, question: "EBV (Epstein–Barr virus) causes ALL EXCEPT:", options: ["Mono (glandular fever)", "Nasopharyngeal carcinoma", "Burkitt lymphoma", "Kaposi sarcoma"], correct: 3 },
    { id: 309, question: "CMV infection in pregnancy can lead to:", options: ["Hyperthyroidism", "Deafness and blindness in the infant", "Cardiomyopathy only", "Chronic skin ulcers"], correct: 1 },
    { id: 310, question: "Postnatal CMV infection may lead to:", options: ["Multi-organ failure", "Osteoporosis", "Hyperpigmentation", "Autoimmune diseases"], correct: 0 },
    { id: 311, question: "During HSV reactivation, which statement is MOST accurate based on the lecture?", options: ["HSV-2 reactivates mainly in the trigeminal ganglion", "HSV reactivation requires antibody presence", "Reactivation can occur due to sunlight or stress", "HSV latent stage occurs only in the bloodstream"], correct: 2 },
    { id: 312, question: "Which presentation is MOST consistent with shingles rather than chickenpox?", options: ["Itchy vesicles all over the body", "Painful lesions on a single dermatome", "Non-itchy, painless vesicles", "Bilateral scattered lesions with fever"], correct: 1 },
    { id: 313, question: "Which herpes infection risk increases specifically in pregnancy, according to the lecture?", options: ["Kaposi sarcoma", "EBV-related cancers", "CMV infection causing congenital defects", "HSV-2 causing brain inflammation"], correct: 2 },
    { id: 314, question: "Which statement about CMV infection is supported by the lecture?", options: ["It only affects the liver", "It causes blindness and deafness in infants", "It is primarily a skin infection", "It only occurs in HIV patients"], correct: 1 },
    { id: 315, question: "A patient presents with painful vesicles, not itchy, and appearing only on the right side of the torso. Which virus is MOST likely?", options: ["HSV-1", "HSV-2", "VZV (shingles)", "CMV"], correct: 2 },
    { id: 316, question: "Why are shingles lesions typically unilateral?", options: ["VZV spreads only through blood", "Virus reactivates along a single nerve pathway", "Antibodies prevent bilateral spread", "Only one dermatome contains MHC II"], correct: 1 },
    { id: 317, question: "Which herpesvirus is MOST commonly associated with genital herpes?", options: ["HHV-1", "HHV-2", "HHV-3", "HHV-4"], correct: 1 },
    { id: 318, question: "Which herpesvirus remains latent in the trigeminal ganglion?", options: ["CMV", "HSV-2", "HSV-1", "HHV-6"], correct: 2 },
    { id: 319, question: "Which statement correctly compares chickenpox and shingles?", options: ["Chickenpox lesions are painful; shingles lesions are itchy", "Chickenpox lesions are itchy; shingles lesions are painful", "Both are primarily painful", "Both are primarily itchy"], correct: 1 },
    { id: 320, question: "Which condition is caused by HHV-8, especially in HIV-positive patients?", options: ["Burkitt lymphoma", "Nasopharyngeal carcinoma", "Kaposi sarcoma", "Oral hairy leukoplakia"], correct: 2 },
    { id: 321, question: "Which virus can cause congenital infection leading to deafness or blindness?", options: ["HSV-1", "EBV", "CMV", "HHV-7"], correct: 2 },
    { id: 322, question: "Which herpesvirus causes infectious mononucleosis?", options: ["HSV-2", "EBV", "CMV", "VZV"], correct: 1 },
    { id: 323, question: "Which HHV virus is MOST associated with multi-organ failure in immunosuppressed patients?", options: ["HHV-1", "HHV-4", "HHV-5", "HHV-8"], correct: 2 },
    { id: 324, question: "Which of the following conditions is typically painless but itchy?", options: ["Shingles", "Chickenpox", "Trachoma", "Herpetic whitlow"], correct: 1 },
    { id: 325, question: "Which HHV primarily causes oral lesions such as gingivostomatitis?", options: ["HHV-1", "HHV-2", "HHV-3", "HHV-5"], correct: 0 },
    { id: 326, question: "Which herpesvirus can cause nasopharyngeal carcinoma?", options: ["HSV-1", "HSV-2", "EBV", "CMV"], correct: 2 },
    { id: 327, question: "Which viral infection hides in the trigeminal ganglion during latency?", options: ["EBV", "CMV", "VZV only", "HSV-1"], correct: 3 },
    { id: 328, question: "A child with congenital CMV infection is at highest risk for:", options: ["Gingivostomatitis", "Deafness", "Small painful ulcers", "Vesicles on the lips"], correct: 1 },
    { id: 329, question: "Which virus is MOST associated with painful unilateral skin lesions?", options: ["HSV-1", "HSV-2", "VZV (shingles)", "HHV-7"], correct: 2 },
    { id: 330, question: "Which herpesvirus is primarily associated with fine skin rashes?", options: ["HHV-6", "HHV-7", "HHV-4", "HHV-8"], correct: 1 },
    { id: 331, question: "Kaposi sarcoma in HIV patients is caused by:", options: ["HHV-6", "HHV-4", "HHV-8", "HSV-2"], correct: 2 },
    { id: 332, question: "A patient has no MHC I molecules on their cells. Which cell type will be MOST affected?", options: ["CD4⁺ T helpers", "Neutrophils", "CD8⁺ T cytotoxic cells", "B cells"], correct: 2 },
    { id: 333, question: "A patient with HIV develops gingivostomatitis. Which virus is MOST likely responsible?", options: ["HHV-1", "HHV-3", "HHV-5", "HHV-8"], correct: 0 },
    { id: 334, question: "What is the primary difference between HSV-1 and HSV-2 in terms of infection location?", options: ["HSV-1 is always oral", "HSV-2 is always oral", "HSV-2 mainly affects genital area, HSV-1 mainly affects oral area", "They never overlap in location"], correct: 2 },
    { id: 335, question: "Which herpesvirus is most strongly associated with multi-organ failure in immunosuppressed adults?", options: ["HHV-1", "HHV-4", "HHV-5", "HHV-7"], correct: 2 },
    { id: 336, question: "Which herpesvirus causes reactivation triggered by sunlight and stress?", options: ["CMV", "EBV", "HSV-1", "HHV-7"], correct: 2 },
    { id: 337, question: "A child presents with itchy vesicles all over the body, none of which are painful. What is the BEST diagnosis?", options: ["Shingles", "Chickenpox", "HSV-1", "CMV rash"], correct: 1 },
    { id: 338, question: "Which herpesvirus most often causes Kaposi sarcoma?", options: ["HSV-1", "HHV-5", "HHV-7", "HHV-8"], correct: 3 },
    { id: 339, question: "Which virus is responsible for causing nasopharyngeal carcinoma?", options: ["HHV-3", "HHV-4", "HHV-6", "HHV-8"], correct: 1 },
    { id: 340, question: "HSV-2 is MOST strongly associated with:", options: ["Cold sores", "Genital lesions", "Chickenpox", "Oral hairy leukoplakia"], correct: 1 },
    { id: 341, question: "A characteristic feature of shingles (VZV reactivation) is:", options: ["Bilateral lesions", "Itchy but painless rash", "Painful unilateral rash", "White patches on tongue"], correct: 2 },
    { id: 342, question: "Which virus is MOST associated with Burkitt lymphoma?", options: ["HSV-1", "HSV-2", "VZV", "EBV"], correct: 3 },
    { id: 343, question: "CMV infection in adults MOST commonly appears as:", options: ["Multi-organ failure", "Painful vesicles", "Asymptomatic infection", "Severe skin rash"], correct: 2 },
    { id: 344, question: "A patient shows a painful unilateral vesicular rash. Which latent location is responsible for reactivation?", options: ["Facial muscles", "Cardiac nerve bundles", "Dorsal root ganglion", "Cerebral cortex"], correct: 2 },
    { id: 345, question: "Which virus MOST commonly causes oral hairy leukoplakia in immunocompromised patients?", options: ["HSV-1", "HSV-2", "EBV", "CMV"], correct: 2 },
    { id: 346, question: "A newborn is diagnosed with congenital CMV. Which sign is MOST typical?", options: ["Painful lip vesicles", "Blindness or sensorineural hearing loss", "Oral thrush", "Unilateral shingles"], correct: 1 },
    { id: 347, question: "The latent site of HSV-1 reactivation is:", options: ["Dorsal root ganglion", "Facial nerve nucleus", "Trigeminal ganglion", "Hippocampus"], correct: 2 },
    { id: 348, question: "Shingles skin lesions are typically:", options: ["Bilateral", "Painless", "Unilateral and very painful", "Non-itchy and painless"], correct: 2 },
    { id: 349, question: "Chickenpox lesions are:", options: ["Painful and itchy", "Painless and itchy", "Painful and not itchy", "Neither itchy nor painful"], correct: 1 },
    { id: 350, question: "Which virus causes mononucleosis?", options: ["HSV-2", "EBV", "CMV", "HHV-6"], correct: 1 },
    { id: 351, question: "Hairy leukoplakia is associated with:", options: ["HSV-1", "CMV", "EBV", "HHV-7"], correct: 2 },
    { id: 352, question: "HHV-8 is strongly associated with:", options: ["Oral thrush", "Kaposi sarcoma", "Roseola", "Genital herpes"], correct: 1 },
    { id: 353, question: "The virus that causes shingles is:", options: ["HHV-1", "HHV-2", "HHV-3", "HHV-4"], correct: 2 },
    { id: 354, question: "Stress and sunlight can reactivate which virus?", options: ["CMV", "EBV", "HSV-1 / HSV-2", "HHV-8"], correct: 2 },
    { id: 355, question: "A child with high fever followed by a faint rash likely has:", options: ["HSV-1", "HHV-6", "HHV-8", "HSV-2"], correct: 1 },
    { id: 356, question: "HHV-7 commonly causes:", options: ["Nasopharyngeal carcinoma", "Mild rashes", "Oral ulcers", "Blindness"], correct: 1 },
    { id: 357, question: "Congenital CMV infection may cause all EXCEPT:", options: ["Deafness", "Blindness", "Cognitive impairment", "Strong immunity"], correct: 3 },
    { id: 358, question: "CMV infection in adults may cause:", options: ["Severe pneumonia only", "Multi-organ failure", "No symptoms ever", "Only skin rash"], correct: 1 },
    { id: 359, question: "Nasopharyngeal carcinoma is associated with:", options: ["HSV-2", "CMV", "EBV", "HHV-7"], correct: 2 },
    { id: 360, question: "Which herpesvirus causes Burkitt lymphoma?", options: ["HSV-1", "HSV-2", "EBV", "CMV"], correct: 2 },
    { id: 361, question: "Which is TRUE regarding HSV primary vs recurrent infection?", options: ["Primary only occurs in children", "Recurrent infection is due to viral reactivation", "Primary infection occurs in the ganglion", "Recurrent infection is always systemic"], correct: 1 },
    { id: 362, question: "Shingles can involve which cranial nerve division and cause blindness?", options: ["CN VII", "CN V – ophthalmic branch", "CN II", "CN IX"], correct: 1 },
    { id: 363, question: "Cold sores (herpes labialis) are caused mostly by:", options: ["HSV-2", "EBV", "HSV-1", "CMV"], correct: 2 },
    { id: 364, question: "The ONLY herpesvirus specifically highlighted as common in HIV patients was:", options: ["HHV-1", "HHV-3", "HHV-5 (CMV)", "HHV-7"], correct: 2 },
    { id: 365, question: "HSV-1 most commonly affects which region?", options: ["Below the waist", "Abdomen", "Above the waist", "Lower limbs"], correct: 2 },
    { id: 366, question: "HSV-2 is mainly associated with:", options: ["Oral lesions", "Gingivostomatitis", "Genital herpes", "Ophthalmic infection"], correct: 2 },
    { id: 367, question: "A virus hides in sensory ganglia after initial infection. This pattern resembles:", options: ["HSV-1 latency", "Complement deficiency", "T-cell suppression", "Alternative pathway activation"], correct: 0 },
    { id: 368, question: "Which statement about MHC I expression is TRUE?", options: ["Only found on B cells", "Found on all nucleated cells", "Found on RBCs", "Not needed for CD8 activation"], correct: 1 },
    { id: 369, question: "Which type of antigen presentation will activate CD8⁺ cytotoxic T cells?", options: ["Antigen bound to MHC II", "Antigen directly binding a B cell", "Antigen bound to MHC I", "Antigen without any MHC involvement"], correct: 2 },
    { id: 370, question: "T cells fail to respond to an antigen unless it is paired with an MHC molecule. This phenomenon is known as:", options: ["Antigenicity", "MHC restriction", "Tolerance", "Complement activation"], correct: 1 },
    { id: 371, question: "Which structure is present ONLY on APCs and not on all nucleated cells?", options: ["MHC I", "MHC II", "CD8 protein", "Integrin receptor"], correct: 1 },
    { id: 372, question: "Which type of immune cell is required for T-cell activation?", options: ["Neutrophil", "Eosinophil", "APC", "RBC"], correct: 2 },
    { id: 373, question: "Which statement about B cells is TRUE?", options: ["B cells need MHC to detect antigen", "B cells recognize antigen only through APCs", "B cells recognize antigen directly", "B cells only bind linear peptides"], correct: 2 },
    { id: 374, question: "Which characteristic uniquely applies to MHC Class I molecules?", options: ["Found only on APCs", "Present only in lymph nodes", "Found on all nucleated cells", "Present only on B cells"], correct: 2 },
    { id: 375, question: "A patient's T cell cannot recognize antigen unless an APC is involved. This requirement refers to:", options: ["Antibody-mediated immunity", "Direct antigen recognition", "MHC restriction", "Humoral immunity"], correct: 2 },
    { id: 376, question: "Which APC displays antigen specifically using MHC Class II?", options: ["Neutrophil", "Erythrocyte", "Macrophage", "Muscle cell"], correct: 2 },
    { id: 377, question: "Which phagocytosis step directly follows pseudopod formation?", options: ["Phagosome formation", "Phagolysosome formation", "Killing of microbe", "Exocytosis of debris"], correct: 0 },
    { id: 378, question: "Which statement best explains why macrophages are more common in organs like the liver and spleen?", options: ["These organs have high blood flow and filter pathogens", "They generate antibodies", "They lack neutrophils", "They prevent complement activation"], correct: 0 },
    { id: 379, question: "Residual bodies are:", options: ["Undigested waste left after phagocytosis", "Newly synthesized lysosomes", "Viral particles", "Antibody complexes"], correct: 0 },
    { id: 380, question: "In the classical pathway, complement activation will NOT occur without:", options: ["C3", "Antibodies", "C9", "Lysosomes"], correct: 1 },
    { id: 381, question: "A newborn rapidly develops meningitis after mild exposure to bacteria. Which concept explains this vulnerability?", options: ["Low neutrophil count", "Poorly developed blood-brain barrier", "Lack of complement proteins", "Excessive MHC expression"], correct: 1 },
    { id: 382, question: "A patient with a genetic defect preventing fusion of lysosomes with phagosomes will have impaired:", options: ["Antigen presentation", "Phagolysosome formation", "Antibody production", "Complement activation"], correct: 1 },
    { id: 383, question: "A lab test shows that a patient's complement system activates normally even without antibodies. Which pathway is functioning?", options: ["Classical", "Alternative", "Lectin", "Terminal pathway only"], correct: 1 },
    { id: 384, question: "A patient has recurrent infections with gram-negative bacteria despite normal immunity elsewhere. Which complement component is MOST likely defective?", options: ["C1", "C3", "C5–C9", "Properdin"], correct: 2 },
    { id: 385, question: "A blood smear shows abundant neutrophils but very few macrophages. What does this indicate?", options: ["Strong tissue-based immunity", "Acute infection occurring mainly in blood", "Chronic infection in organs", "Autoimmune response"], correct: 1 },
    { id: 386, question: "A patient's macrophages engulf bacteria normally, but digestion fails. Which step is impaired?", options: ["Pseudopod formation", "Phagosome formation", "Lysosome–phagosome fusion", "Residual body exocytosis"], correct: 2 },
    { id: 387, question: "A defect causes incomplete digestion, and undigested fragments accumulate inside phagocytes. What structure increases?", options: ["Phagosomes", "Lysosomes", "Residual bodies", "MHC-II expression"], correct: 2 },
    { id: 388, question: "A newborn has seizures after mild infection. Which mechanism explains vulnerability?", options: ["Overactive macrophages", "High neutrophil count", "Poorly developed blood–brain barrier", "Excess complement activity"], correct: 2 },
    { id: 389, question: "An adult with brain infection cannot be treated with certain antibiotics. Why?", options: ["High RBC turnover", "Fully developed BBB prevents drug entry", "Lack of complement activation", "Excess macrophage filtration"], correct: 1 },
    { id: 390, question: "A macrophage forms pseudopods normally but cannot internalize the pathogen. Which step is defective?", options: ["Step 1", "Step 2 (internalization)", "Step 4 (fusion)", "Step 7 (expulsion)"], correct: 1 },
    { id: 391, question: "A mutation prevents formation of pseudopods. Which process is impaired first?", options: ["Antigen–MHC binding", "Antigen internalization", "Phagolysosome formation", "Cytokine release"], correct: 1 },
    { id: 392, question: "A researcher studies a structure containing digestive enzymes and an engulfed bacterium fused together. What is he observing?", options: ["Lysosome", "Phagosome", "Phagolysosome", "Residual body"], correct: 2 },
    { id: 393, question: "Complement system remains inactive even during infection. Which explanation fits best?", options: ["Complement proteins are absent in blood", "Complement proteins exist but are inactive", "Antibodies block complement proteins", "Excess MHC expression prevents activation"], correct: 1 },
    { id: 394, question: "Which cell can recognize antigen directly without MHC or an APC?", options: ["CD4 T cell", "B cell", "CD8 T cell", "Macrophage"], correct: 1 },
    { id: 395, question: "Which of the following is TRUE about T-cell antigen recognition?", options: ["T cells recognize free-floating antigen without MHC", "T cells require antigen bound to MHC on an APC", "T cells only recognize linear peptides", "T cells can recognize antigen directly like B cells"], correct: 1 },
    { id: 396, question: "MHC Class I presents antigens to which of the following?", options: ["B cells", "CD4 T cells", "CD8 T cells", "NK cells"], correct: 2 },
    { id: 397, question: "Which type of T cell is activated by MHC Class II?", options: ["CD8 T cytotoxic cells", "NK cells", "CD4 T helper cells", "B cells"], correct: 2 },
    { id: 398, question: "Which complement pathway is antibody-independent?", options: ["Classical", "Lectin", "Alternative", "Terminal"], correct: 2 },
    { id: 399, question: "The key protein for the classical pathway is:", options: ["C3", "C1", "C5", "C9"], correct: 1 },
    { id: 400, question: "The key protein for the alternative pathway is:", options: ["C1", "C2", "C3", "C9"], correct: 2 },
    { id: 401, question: "The function of the membrane attack complex (MAC) is:", options: ["Neutralizing antibodies", "Destroying microbes by forming membrane pores", "Binding to MHC molecules", "Opsonizing bacteria"], correct: 1 },
    { id: 402, question: "Gram-positive bacteria resist MAC mainly because they have:", options: ["A thin cell wall", "A thick peptidoglycan layer", "A lipid envelope", "Flagella"], correct: 1 },
    { id: 403, question: "The very first action during phagocytosis is:", options: ["Fusion of phagosome and lysosome", "Expulsion of residual bodies", "Pseudopod formation", "Digestion of microbe"], correct: 2 },
    { id: 404, question: "After internalization, the engulfed microbe is enclosed in a:", options: ["Lysosome", "Ribosome", "Phagosome", "Nucleus"], correct: 2 },
    { id: 405, question: "A phagolysosome is created when:", options: ["Lysosome fuses with phagosome", "Antibodies coat the microbe", "Cytokines bind to receptors", "Microbe releases toxins"], correct: 0 },
    { id: 406, question: "The immune cells MOST active in blood are:", options: ["Macrophages", "Neutrophils", "Basophils", "T cells"], correct: 1 },
    { id: 407, question: "How many protections does the brain have, according to the lecture?", options: ["2", "3", "4", "5"], correct: 2 },
    { id: 408, question: "Which of the following is NOT one of the brain's four protections listed in lecture?", options: ["Skull bones", "CSF", "Blood-brain barrier", "Lymphatic drainage"], correct: 3 },
    { id: 409, question: "The subarachnoid space is located between:", options: ["Dura and skull", "Arachnoid and pia", "Dura and arachnoid", "Pia and brain tissue"], correct: 1 },
    { id: 410, question: "The subarachnoid space contains:", options: ["Blood", "Synovial fluid", "CSF", "Lymph"], correct: 2 },
    { id: 411, question: "CSF pressure increases when:", options: ["Reabsorption exceeds production", "Production exceeds reabsorption", "Sodium concentration decreases", "Skull bones expand"], correct: 1 },
    { id: 412, question: "CSF resembles plasma mainly in:", options: ["Color", "Chemical composition", "Odor", "Cell count"], correct: 1 },
    { id: 413, question: "Which brain protection would be MOST directly affected if CSF reabsorption decreases?", options: ["Skull", "Bone marrow", "Ventricular system", "Blood-brain barrier"], correct: 2 },
    { id: 414, question: "Which situation indicates decreased CSF pressure?", options: ["Overproduction of CSF", "Reabsorption exceeding production", "Blockage of CSF drainage", "Increased blood flow in meninges"], correct: 1 },
    { id: 415, question: "A pathology report states that the subarachnoid space contains abnormal fluid. What fluid should normally be in this space?", options: ["Blood", "Lymph", "CSF", "Interstitial fluid"], correct: 2 },
    { id: 416, question: "Which meninges–space pairing is CORRECT?", options: ["Dura – contains CSF", "Subarachnoid – between dura & skull", "Subdural – between arachnoid & pia", "Subarachnoid – contains CSF"], correct: 3 },
    { id: 417, question: "Which of the following cells appears in tissues and performs phagocytosis according to the lecture?", options: ["Neutrophils", "Plasma cells", "Macrophages", "Basophils"], correct: 2 },
    { id: 418, question: "In the CNS, which structure is located between the arachnoid mater and the pia mater?", options: ["Subdural space", "Subarachnoid space", "Epidural space", "Ventricular space"], correct: 1 },
    { id: 419, question: "Which of the following correctly lists the meninges from outermost to innermost?", options: ["Pia → Arachnoid → Dura", "Arachnoid → Dura → Pia", "Dura → Arachnoid → Pia", "Dura → Pia → Arachnoid"], correct: 2 },
    { id: 420, question: "What happens when CSF production is greater than CSF reabsorption?", options: ["ICP decreases", "ICP remains unchanged", "CSF disappears", "ICP increases"], correct: 3 },
    { id: 421, question: "Which of the following is a protection for the brain but NOT for the spinal cord?", options: ["CSF", "Meninges", "Skull", "Blood-brain barrier"], correct: 2 },
    { id: 422, question: "What is the main role of the subarachnoid space?", options: ["Blood filtration", "CSF circulation", "Production of antibodies", "Storage of neurotransmitters"], correct: 1 },
    { id: 423, question: "The pia mater is best described as:", options: ["The thick outermost layer", "The middle fibrous layer", "The thin innermost layer directly on brain surface", "The layer containing bone marrow"], correct: 2 },
    { id: 424, question: "Which layer of the meninges directly adheres to the surface of the brain?", options: ["Dura mater", "Arachnoid mater", "Pia mater", "Epidural layer"], correct: 2 },
    { id: 425, question: "What fills the subarachnoid space?", options: ["Blood", "Lymph", "CSF", "Plasma"], correct: 2 },
    { id: 426, question: "Increased intracranial pressure results when:", options: ["CSF absorption > production", "CSF production > absorption", "CSF and plasma mix equally", "Meninges thicken with age"], correct: 1 },
    { id: 427, question: "Which of the following is NOT a protection for the spinal cord?", options: ["CSF", "Meninges", "Blood-brain barrier", "Skull bones"], correct: 3 },
    { id: 428, question: "To maintain normal intracranial pressure, which must occur?", options: ["CSF production must exceed reabsorption", "CSF reabsorption must exceed production", "Production and reabsorption must be equal", "CSF must be replaced by lymphatic fluid"], correct: 2 },
    { id: 429, question: "Which structure does NOT contribute to spinal cord protection?", options: ["Vertebrae", "Meninges", "CSF", "Skull bones"], correct: 3 },
    { id: 430, question: "Which substance can easily pass through the blood-brain barrier (BBB)?", options: ["Sodium", "Glucose", "Water", "Lipid-soluble drugs"], correct: 3 },
    { id: 431, question: "Why is a poorly developed BBB dangerous in neonates?", options: ["Antibiotics cannot enter the brain", "Too much CSF is produced", "Toxins and drugs can enter the brain easily", "Glucose cannot enter the brain"], correct: 2 },
    { id: 432, question: "Why is a fully developed BBB problematic in adults?", options: ["It allows toxins to enter", "It blocks most antibiotics from reaching CNS infections", "It prevents oxygen from entering", "It causes CSF leakage"], correct: 1 },
    { id: 433, question: "Which of the following is NOT a protection for the spinal cord?", options: ["Vertebral column", "CSF", "Skull bones", "Meninges"], correct: 2 },
    { id: 434, question: "Which statement about the BBB is TRUE?", options: ["It allows proteins to freely diffuse.", "It is fully mature at birth.", "It is composed of tightly joined endothelial cells.", "It permits rapid entry of water-soluble drugs."], correct: 2 },
    { id: 435, question: "The BBB most closely resembles which cellular structure?", options: ["Nuclear membrane", "Cytoplasmic (plasma) membrane", "Golgi apparatus", "Ribosomal wall"], correct: 1 },
    { id: 436, question: "A drug is water-soluble and large in molecular size. What is MOST likely?", options: ["It crosses the BBB easily.", "It cannot cross the BBB.", "It only crosses in neonates.", "It crosses via saltatory conduction."], correct: 1 },
    { id: 437, question: "What is the MAIN risk when BBB is not fully developed in infants?", options: ["Increased CSF pressure", "Increased penetration of harmful substances", "Decreased glucose to the brain", "Brainstem dysfunction"], correct: 1 },
    { id: 438, question: "Which statement about MHC I expression is TRUE?", options: ["Only found on B cells", "Found on all nucleated cells", "Found on RBCs", "Not needed for CD8 activation"], correct: 1 },
    { id: 439, question: "Which of the following is NOT a protection for the spinal cord?", options: ["Vertebral column", "CSF", "Skull bones", "Meninges"], correct: 2 },
    { id: 440, question: "The somatic nervous system controls:", options: ["Heart contraction", "Digestive motility", "Voluntary skeletal movement", "Pupil dilation"], correct: 2 },
    { id: 441, question: "What is the functional nervous system division responsible for voluntary movements?", options: ["Sympathetic nervous system", "Parasympathetic nervous system", "Somatic nervous system", "Autonomic nervous system"], correct: 2 },
    { id: 442, question: "Which neurological division controls involuntary functions such as heart rate and digestion?", options: ["Somatic nervous system", "Cranial nerve system", "Autonomic nervous system", "Central nervous system"], correct: 2 },
    { id: 443, question: "Which of the following is a protection for the brain but NOT for the spinal cord?", options: ["CSF", "Meninges", "Skull", "Blood-brain barrier"], correct: 2 },
    { id: 444, question: "Which location correctly matches gray matter?", options: ["Inside of brain", "Outside of spinal cord", "Contains myelinated axons", "Contains neuron cell bodies"], correct: 3 },
    { id: 445, question: "Which structure is NOT part of the CNS?", options: ["Brain", "Spinal cord", "Cranial nerves", "Gray matter"], correct: 2 },
    { id: 446, question: "Which of the following correctly lists the meninges from outermost to innermost?", options: ["Pia → Arachnoid → Dura", "Arachnoid → Dura → Pia", "Dura → Arachnoid → Pia", "Dura → Pia → Arachnoid"], correct: 2 },
    { id: 447, question: "What happens when CSF production is greater than CSF reabsorption?", options: ["ICP decreases", "ICP remains unchanged", "CSF disappears", "ICP increases"], correct: 3 },
    { id: 448, question: "Which of the following is a protection for the brain but NOT for the spinal cord?", options: ["CSF", "Meninges", "Skull", "Blood-brain barrier"], correct: 2 },
    { id: 449, question: "The pia mater is best described as:", options: ["The thick outermost layer", "The middle fibrous layer", "The thin innermost layer directly on brain surface", "The layer containing bone marrow"], correct: 2 },
    { id: 450, question: "Which substance can easily pass through the blood-brain barrier (BBB)?", options: ["Sodium", "Glucose", "Water", "Lipid-soluble drugs"], correct: 3 },
    { id: 451, question: "Which arrangement is correct for the spinal cord?", options: ["Gray outside, white inside", "White outside, gray inside", "No gray matter", "Equal amounts of white and gray"], correct: 1 },
    { id: 452, question: "Gray matter primarily contains:", options: ["Axons", "Synaptic clefts", "Cell bodies and dendrites", "Myelin sheaths"], correct: 2 },
    { id: 453, question: "White matter contains:", options: ["Cell bodies", "Dendrites", "Axons organized into tracts", "Astrocytes"], correct: 2 },
    { id: 454, question: "Ascending tracts carry information:", options: ["From brain to spinal cord", "From spinal cord to muscles", "From spinal cord to brain", "Between two sensory receptors"], correct: 2 },
    { id: 455, question: "Neurons are non-mitotic. What does this mean?", options: ["They divide only once", "They function only in childhood", "They do not undergo cell division", "They regenerate quickly"], correct: 2 },
    { id: 456, question: "The rapid 'jumping' of action potentials between nodes of Ranvier is called:", options: ["Continuous conduction", "Saltatory conduction", "Axonal drift", "Dendritic transmission"], correct: 1 },
    { id: 457, question: "Myelin in the CNS is produced by:", options: ["Schwann cells", "Astrocytes", "Oligodendrocytes", "Microglia"], correct: 2 },
    { id: 458, question: "Myelin in the PNS is produced by:", options: ["Oligodendrocytes", "Schwann cells", "Astrocytes", "Ependymal cells"], correct: 1 },
    { id: 459, question: "Which neuroglial cell is responsible for the blood-brain barrier?", options: ["Microglia", "Schwann cells", "Astrocytes", "Ependymal cells"], correct: 2 },
    { id: 460, question: "Which glial cell performs phagocytosis?", options: ["Astrocyte", "Oligodendrocyte", "Schwann cell", "Microglia"], correct: 3 },
    { id: 461, question: "Which structure is part of a synapse?", options: ["Myelin sheath", "Presynaptic axon terminal", "Cerebral cortex", "Vertebral arch"], correct: 1 },
    { id: 462, question: "The space where neurotransmitters are released is called the:", options: ["Axonal canal", "Synaptic cleft", "Vesicle cavity", "Neural gap"], correct: 1 },
    { id: 463, question: "Which neurotransmitter is excitatory?", options: ["GABA", "Glycine", "Serotonin", "Norepinephrine"], correct: 3 },
    { id: 464, question: "Which is an inhibitory neurotransmitter?", options: ["Dopamine", "Acetylcholine", "Epinephrine", "GABA"], correct: 3 },
    { id: 465, question: "The autonomic nervous system controls:", options: ["Voluntary skeletal muscles", "Involuntary functions", "Balance and hearing", "Memory and emotion"], correct: 1 },
    { id: 466, question: "The sympathetic system is also known as:", options: ["Rest and digest", "Feed and breed", "Fight or flight", "Think and respond"], correct: 2 },
    { id: 467, question: "Preganglionic sympathetic neurons release:", options: ["Dopamine", "Serotonin", "Acetylcholine", "Norepinephrine"], correct: 2 },
    { id: 468, question: "Postganglionic sympathetic neurons release:", options: ["Serotonin", "GABA", "Acetylcholine", "Norepinephrine"], correct: 3 },
    { id: 469, question: "Preganglionic parasympathetic neurons release:", options: ["Acetylcholine", "Dopamine", "Epinephrine", "Serotonin"], correct: 0 },
    { id: 470, question: "Postganglionic parasympathetic neurons release:", options: ["Norepinephrine", "Acetylcholine", "Dopamine", "Cortisol"], correct: 1 },
    { id: 471, question: "Which receptor is associated with postganglionic sympathetic neurons?", options: ["Muscarinic", "Nicotinic", "Cholinergic", "Adrenergic"], correct: 3 },
    { id: 472, question: "Damage to ascending tracts would MOST likely affect:", options: ["Voluntary movement", "Sensory input to the brain", "Autonomic regulation", "Motor control of spinal reflexes"], correct: 1 },
    { id: 473, question: "Which statement about neurons is correct?", options: ["They divide rapidly in adults.", "They are non-mitotic.", "They store glycogen for emergencies.", "They can survive long periods without oxygen."], correct: 1 },
    { id: 474, question: "The MAIN reason CNS injuries are permanent is:", options: ["Schwann cells cannot divide", "Neurons cannot perform phagocytosis", "Neurons lack mitosis", "Too much myelin is present"], correct: 2 },
    { id: 475, question: "Saltatory conduction occurs because:", options: ["Myelin slows the conduction", "The signal jumps between nodes of Ranvier", "Gray matter speeds impulses", "CSF enhances neurotransmission"], correct: 1 },
    { id: 476, question: "Which pair is correctly matched?", options: ["CNS myelin – Schwann cell", "PNS myelin – oligodendrocyte", "CNS myelin – oligodendrocyte", "PNS myelin – astrocyte"], correct: 2 },
    { id: 477, question: "Astrocytes function mainly to:", options: ["Produce myelin in CNS", "Form the blood-brain barrier", "Perform phagocytosis", "Generate CSF"], correct: 1 },
    { id: 478, question: "Which cell type performs phagocytosis in the CNS?", options: ["Astrocyte", "Schwann cell", "Ependymal cell", "Microglia"], correct: 3 },
    { id: 479, question: "The synaptic cleft is located between:", options: ["Two axons", "Two dendrites", "Presynaptic terminal and postsynaptic receptor", "Axon and myelin sheath"], correct: 2 },
    { id: 480, question: "Which neurotransmitter is MOST associated with excitatory actions?", options: ["GABA", "Glycine", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 481, question: "Which neurotransmitter is inhibitory?", options: ["Dopamine", "Acetylcholine", "GABA", "Epinephrine"], correct: 2 },
    { id: 482, question: "The autonomic nervous system regulates:", options: ["Skeletal muscle", "Voluntary actions", "Involuntary functions", "Somatic reflexes only"], correct: 2 },
    { id: 483, question: "The sympathetic division originates from which region?", options: ["Craniosacral", "Thoracolumbar", "Cervical only", "Lumbar only"], correct: 1 },
    { id: 484, question: "'Fight or flight' is associated with:", options: ["Parasympathetic system", "Sympathetic system", "Somatic system", "Enteric system"], correct: 1 },
    { id: 485, question: "Preganglionic sympathetic neurons use which neurotransmitter?", options: ["Norepinephrine", "Serotonin", "Acetylcholine", "Dopamine"], correct: 2 },
    { id: 486, question: "Postganglionic sympathetic neurons use which neurotransmitter?", options: ["Serotonin", "Acetylcholine", "Norepinephrine", "Glutamate"], correct: 2 },
    { id: 487, question: "Preganglionic parasympathetic neurons use:", options: ["Acetylcholine", "Epinephrine", "GABA", "Dopamine"], correct: 0 },
    { id: 488, question: "Postganglionic parasympathetic neurons use:", options: ["Norepinephrine", "Acetylcholine", "Epinephrine", "Glutamate"], correct: 1 },
    { id: 489, question: "Which receptor type is found at sympathetic postganglionic synapses?", options: ["Nicotinic", "Muscarinic", "Adrenergic", "Cholinergic only"], correct: 2 },
    { id: 490, question: "Which receptor type is found at parasympathetic postganglionic synapses?", options: ["Nicotinic", "Adrenergic", "GABAergic", "Muscarinic"], correct: 3 },
    { id: 491, question: "Which statement correctly describes neurotransmitter patterns in the autonomic nervous system?", options: ["Both sympathetic and parasympathetic systems use norepinephrine in preganglionic synapses.", "Sympathetic preganglionic fibers use acetylcholine, while postganglionic fibers use norepinephrine.", "Parasympathetic postganglionic fibers release norepinephrine.", "Sympathetic postganglionic receptors are muscarinic."], correct: 1 },
    { id: 492, question: "Which of the following is TRUE regarding parasympathetic control of the digestive system?", options: ["It inhibits motility and secretion.", "It is the only organ system where parasympathetic activity dominates.", "It is stimulated primarily by norepinephrine.", "It acts independently of sympathetic influence."], correct: 1 },
    { id: 493, question: "Which receptor is activated on the sympathetic postganglionic target organ?", options: ["Muscarinic", "Nicotinic", "Adrenergic", "Serotonergic"], correct: 2 },
    { id: 494, question: "Which scenario indicates an increase in parasympathetic activity?", options: ["Pupil dilation and increased heart rate", "Bronchodilation and decreased GI motility", "Slowed heart rate and increased peristalsis", "Increased sweating and vasoconstriction"], correct: 2 },
    { id: 495, question: "The neurotransmitter released at all ANS preganglionic synapses is:", options: ["Norepinephrine", "Acetylcholine", "Dopamine", "Serotonin"], correct: 1 },
    { id: 496, question: "Which receptor is located on the parasympathetic postganglionic target organ?", options: ["α1 adrenergic", "β1 adrenergic", "Nicotinic", "Muscarinic"], correct: 3 },
    { id: 497, question: "Which structure releases acetylcholine onto nicotinic receptors?", options: ["Sympathetic postganglionic nerve", "Parasympathetic postganglionic nerve", "All preganglionic ANS fibers", "Somatic motor neurons only"], correct: 2 },
    { id: 498, question: "Which ANS division decreases heart rate?", options: ["Sympathetic", "Parasympathetic", "Somatic", "Enteric"], correct: 1 },
    { id: 499, question: "The primary neurotransmitter released by sympathetic postganglionic neurons is:", options: ["Acetylcholine", "GABA", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 500, question: "In parasympathetic pathways, which part uses muscarinic receptors?", options: ["Preganglionic to preganglionic", "Preganglionic to postganglionic", "Postganglionic to effector organ", "Somatic neuromuscular junction"], correct: 2 },
    { id: 501, question: "Which seizure type lasts less than 5 seconds and typically leaves no residual effects?", options: ["Tonic-clonic", "Myoclonic", "Absence seizure", "Status epilepticus"], correct: 2 },
    { id: 502, question: "A seizure that lasts longer than 5 minutes or involves repeated seizures within 5 minutes is called:", options: ["Myoclonic seizure", "Simple partial seizure", "Epilepsy", "Status epilepticus"], correct: 3 },
    { id: 503, question: "Which statement best differentiates seizure vs. epilepsy?", options: ["Seizure always implies epilepsy.", "Epilepsy refers to chronic recurrent seizures.", "Epilepsy only occurs after head trauma.", "Seizure is a chronic disease."], correct: 1 },
    { id: 504, question: "Which type of tumor is the most common malignant primary brain tumor?", options: ["Meningioma", "Astrocytoma", "Glioma", "Neuroblastoma"], correct: 2 },
    { id: 505, question: "What imaging finding is highly suggestive of a brain tumor?", options: ["Increased number of gyri", "Flattened gyri in affected regions", "Excessive CSF in ventricles only", "Symmetric brain swelling"], correct: 1 },
    { id: 506, question: "What is the FIRST common sign of a brain tumor?", options: ["Visual disturbances", "Paralysis", "Seizures", "Coma"], correct: 2 },
    { id: 507, question: "Which tumor characteristic is TRUE for primary brain tumors?", options: ["They commonly metastasize outside the CNS.", "They often originate from glial cells.", "They have well-defined margins.", "They are usually non–life threatening."], correct: 1 },
    { id: 508, question: "Which is NOT a typical symptom of increased intracranial pressure (ICP)?", options: ["Headache", "Vomiting", "Lethargy", "Bradycardia"], correct: 3 },
    { id: 509, question: "Which finding best indicates a complex partial seizure rather than a simple partial seizure?", options: ["Preserved consciousness", "Entire brain is affected", "Loss of awareness or altered behavior", "Seizure duration < 5 seconds"], correct: 2 },
    { id: 510, question: "Which symptom most strongly suggests tonic-clonic seizure?", options: ["Brief staring spells", "Sudden muscle jerks only", "Auras with preserved consciousness", "Muscle stiffening followed by rhythmic jerking"], correct: 3 },
    { id: 511, question: "What differentiates myoclonic seizure from tonic-clonic seizure?", options: ["Myoclonic seizures involve prolonged unconsciousness", "Myoclonic seizures involve isolated muscle jerks", "Myoclonic seizures affect the entire brain", "Myoclonic seizures last over 5 minutes"], correct: 1 },
    { id: 512, question: "Which feature suggests a malignant brain tumor?", options: ["Well-defined smooth borders", "Slow-growing mass", "Ability to invade nearby tissue without metastasis", "Benign pathology but severe symptoms"], correct: 2 },
    { id: 513, question: "Which sign indicates elevated intracranial pressure (ICP)?", options: ["Hyperactivity", "Sudden weight loss", "Early morning headaches", "Bradycardia only"], correct: 2 },
    { id: 514, question: "Which treatment is most appropriate for a deeply located, inaccessible malignant glioma?", options: ["Surgical removal", "Radiation or chemotherapy", "Manual decompression therapy", "No treatment is required"], correct: 1 },
    { id: 515, question: "Which best describes secondary brain tumors?", options: ["They originate in CNS tissue.", "They never metastasize.", "They commonly arise from lung or breast cancers.", "They are usually benign."], correct: 2 },
    { id: 516, question: "A patient with repeated seizures for months is best classified as:", options: ["Status epilepticus", "Epilepsy", "Absence seizure", "Myoclonic disorder"], correct: 1 },
    { id: 517, question: "A 25-year-old patient is brought to the ER after a car accident. He is sweating heavily, his pupils are dilated, his heart rate is 132 bpm, and bowel sounds are absent. What autonomic state is most likely activated?", options: ["Parasympathetic", "Sympathetic", "Somatic", "Enteric"], correct: 1 },
    { id: 518, question: "A 25-year-old patient is brought to the ER after a car accident. He is sweating heavily, his pupils are dilated, his heart rate is 132 bpm, and bowel sounds are absent. Which neurotransmitter is acting on the target organs?", options: ["Acetylcholine (muscarinic)", "Acetylcholine (nicotinic)", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 519, question: "A 6-year-old child develops a high fever of 40.5°C and begins having full-body convulsions that last approximately 7 minutes. The child has two additional convulsions within the next 10 minutes. What is the diagnosis?", options: ["Myoclonic seizure", "Complex partial seizure", "Status epilepticus", "Simple absence seizure"], correct: 2 },
    { id: 520, question: "A 6-year-old child develops a high fever of 40.5°C and begins having full-body convulsions that last approximately 7 minutes. The child has two additional convulsions within the next 10 minutes. What is the greatest danger associated with this condition?", options: ["Permanent blindness", "Irreversible brain damage", "Digestive system shutdown", "Loss of peripheral sensation"], correct: 1 },
    { id: 521, question: "A 48-year-old patient presents with progressive headaches, morning vomiting, behavioral changes, and a new-onset seizure. MRI shows flattened gyri and a mass with poorly defined margins in the frontal lobe. What is the most likely diagnosis?", options: ["Benign meningioma", "Malignant glioma", "Ischemic stroke", "Multiple sclerosis"], correct: 1 },
    { id: 522, question: "A 48-year-old patient presents with progressive headaches, morning vomiting, behavioral changes, and a new-onset seizure. MRI shows flattened gyri and a mass with poorly defined margins in the frontal lobe. What is the FIRST symptom that often brings patients with brain tumors to the hospital?", options: ["Memory loss", "Seizures", "Hearing loss", "Facial paralysis"], correct: 1 },
    { id: 523, question: "A 30-year-old woman reports abdominal cramps, increased bowel sounds, diarrhea, and bradycardia following a vagal nerve stimulation therapy. Which system is overly activated?", options: ["Sympathetic", "Parasympathetic", "Somatic", "Enteric only"], correct: 1 },
    { id: 524, question: "A 30-year-old woman reports abdominal cramps, increased bowel sounds, diarrhea, and bradycardia following a vagal nerve stimulation therapy. Which receptor subtype is responsible for the postganglionic response?", options: ["Adrenergic", "Nicotinic", "Muscarinic", "Serotonergic"], correct: 2 },
    { id: 525, question: "A 19-year-old student reports sudden brief episodes of staring lasting 2–3 seconds. He does not fall, does not jerk, and immediately returns to normal without confusion. What type of seizure is most likely?", options: ["Absence seizure", "Myoclonic seizure", "Tonic seizure", "Complex partial seizure"], correct: 0 },
    { id: 526, question: "A 19-year-old student reports sudden brief episodes of staring lasting 2–3 seconds. He does not fall, does not jerk, and immediately returns to normal without confusion. What EEG pattern is typically seen?", options: ["Sharp waves only", "3-Hz spike and wave pattern", "Delta waves", "Flattened pattern"], correct: 1 },
    { id: 527, question: "Which best explains why benign brain tumors can still be life-threatening?", options: ["They metastasize widely", "They produce toxins", "They increase intracranial pressure in a fixed space", "They transform into infections"], correct: 2 },
    { id: 528, question: "A patient has a seizure affecting only the right arm with full awareness maintained. This is most consistent with:", options: ["Absence seizure", "Simple partial seizure", "Myoclonic seizure", "Complex partial seizure"], correct: 1 },
    { id: 529, question: "Flattening of gyri on MRI is most commonly due to:", options: ["Hyperglycemia", "Vitamin deficiency", "Space-occupying mass", "Cerebral atrophy"], correct: 2 },
    { id: 530, question: "Which symptom is LEAST likely in increased intracranial pressure (ICP)?", options: ["Morning headache", "Projectile vomiting", "Irritability", "Increased appetite"], correct: 3 },
    { id: 531, question: "Which best describes secondary brain tumors?", options: ["Originate in astrocytes", "Rarely metastasize", "Originate from cancers outside CNS", "Usually present in childhood"], correct: 2 },
    { id: 532, question: "Sudden muscle jerks without loss of consciousness best describes:", options: ["Tonic seizure", "Myoclonic seizure", "Absence seizure", "Status epilepticus"], correct: 1 },
    { id: 533, question: "Which of the following is the MOST dangerous complication of status epilepticus?", options: ["Hair loss", "Diabetes", "Irreversible neuronal damage", "Constipation"], correct: 2 },
    { id: 534, question: "A patient reports 10–20 brief 'blank stare' episodes daily lasting 3 seconds. This suggests:", options: ["Myoclonic seizure", "Complex partial seizure", "Absence seizure", "Tonic-clonic seizure"], correct: 2 },
    { id: 535, question: "Which statement about gliomas is TRUE?", options: ["They arise from glial cells", "They metastasize frequently", "They are usually benign", "They occur only in children"], correct: 0 },
    { id: 536, question: "A 10-second seizure with stiffening followed by jerking is a:", options: ["Absence seizure", "Myoclonic seizure", "Tonic-clonic seizure", "Psychomotor seizure"], correct: 2 },
    { id: 537, question: "Which brain region change suggests tumor-related pressure?", options: ["Deepened sulci", "Flattened cortex", "Increased gray matter thickness", "Enlarged hippocampus"], correct: 1 },
    { id: 538, question: "A patient with brain tumor shows personality changes. Which lobe is most likely affected?", options: ["Occipital", "Temporal", "Frontal", "Parietal"], correct: 2 },
    { id: 539, question: "Which seizure type most commonly presents with an aura?", options: ["Simple partial", "Absence", "Myoclonic", "Atonic"], correct: 0 },
    { id: 540, question: "Which is the FIRST-line imaging sign of a brain tumor?", options: ["Enhancing white matter", "Loss of gyri definition", "Excessive CSF reabsorption", "Enlarged spinal canal"], correct: 1 },
    { id: 541, question: "A patient has a seizure affecting only the right arm with full awareness maintained. This is most consistent with:", options: ["Absence seizure", "Simple partial seizure", "Myoclonic seizure", "Complex partial seizure"], correct: 1 },
    { id: 542, question: "Which finding best indicates a complex partial seizure rather than a simple partial seizure?", options: ["Preserved consciousness", "Entire brain is affected", "Loss of awareness or altered behavior", "Seizure duration < 5 seconds"], correct: 2 },
    { id: 543, question: "Which symptom most strongly suggests tonic-clonic seizure?", options: ["Brief staring spells", "Sudden muscle jerks only", "Auras with preserved consciousness", "Muscle stiffening followed by rhythmic jerking"], correct: 3 },
    { id: 544, question: "What differentiates myoclonic seizure from tonic-clonic seizure?", options: ["Myoclonic seizures involve prolonged unconsciousness", "Myoclonic seizures involve isolated muscle jerks", "Myoclonic seizures affect the entire brain", "Myoclonic seizures last over 5 minutes"], correct: 1 },
    { id: 545, question: "Which feature suggests a malignant brain tumor?", options: ["Well-defined smooth borders", "Slow-growing mass", "Ability to invade nearby tissue without metastasis", "Benign pathology but severe symptoms"], correct: 2 },
    { id: 546, question: "Which sign indicates elevated intracranial pressure (ICP)?", options: ["Hyperactivity", "Sudden weight loss", "Early morning headaches", "Bradycardia only"], correct: 2 },
    { id: 547, question: "Which treatment is most appropriate for a deeply located, inaccessible malignant glioma?", options: ["Surgical removal", "Radiation or chemotherapy", "Manual decompression therapy", "No treatment is required"], correct: 1 },
    { id: 548, question: "Which best describes secondary brain tumors?", options: ["They originate in CNS tissue.", "They never metastasize.", "They commonly arise from lung or breast cancers.", "They are usually benign."], correct: 2 },
    { id: 549, question: "A patient with repeated seizures for months is best classified as:", options: ["Status epilepticus", "Epilepsy", "Absence seizure", "Myoclonic disorder"], correct: 1 },
    { id: 550, question: "Which best explains why benign brain tumors can still be life-threatening?", options: ["They metastasize widely", "They produce toxins", "They increase intracranial pressure in a fixed space", "They transform into infections"], correct: 2 },
    { id: 551, question: "Flattening of gyri on MRI is most commonly due to:", options: ["Hyperglycemia", "Vitamin deficiency", "Space-occupying mass", "Cerebral atrophy"], correct: 2 },
    { id: 552, question: "Which symptom is LEAST likely in increased intracranial pressure (ICP)?", options: ["Morning headache", "Projectile vomiting", "Irritability", "Increased appetite"], correct: 3 },
    { id: 553, question: "The neurotransmitter released at all ANS preganglionic synapses is:", options: ["Norepinephrine", "Acetylcholine", "Dopamine", "Serotonin"], correct: 1 },
    { id: 554, question: "Which receptor is located on the parasympathetic postganglionic target organ?", options: ["α1 adrenergic", "β1 adrenergic", "Nicotinic", "Muscarinic"], correct: 3 },
    { id: 555, question: "Which structure releases acetylcholine onto nicotinic receptors?", options: ["Sympathetic postganglionic nerve", "Parasympathetic postganglionic nerve", "All preganglionic ANS fibers", "Somatic motor neurons only"], correct: 2 },
    { id: 556, question: "Which ANS division decreases heart rate?", options: ["Sympathetic", "Parasympathetic", "Somatic", "Enteric"], correct: 1 },
    { id: 557, question: "The primary neurotransmitter released by sympathetic postganglionic neurons is:", options: ["Acetylcholine", "GABA", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 558, question: "A patient reports 10–20 brief 'blank stare' episodes daily lasting 3 seconds. This suggests:", options: ["Myoclonic seizure", "Complex partial seizure", "Absence seizure", "Tonic-clonic seizure"], correct: 2 },
    { id: 559, question: "Sudden muscle jerks without loss of consciousness best describes:", options: ["Tonic seizure", "Myoclonic seizure", "Absence seizure", "Status epilepticus"], correct: 1 },
    { id: 560, question: "Which of the following is the MOST dangerous complication of status epilepticus?", options: ["Hair loss", "Diabetes", "Irreversible neuronal damage", "Constipation"], correct: 2 },
    { id: 561, question: "Which statement about gliomas is TRUE?", options: ["They arise from glial cells", "They metastasize frequently", "They are usually benign", "They occur only in children"], correct: 0 },
    { id: 562, question: "A 10-second seizure with stiffening followed by jerking is a:", options: ["Absence seizure", "Myoclonic seizure", "Tonic-clonic seizure", "Psychomotor seizure"], correct: 2 },
    { id: 563, question: "Which brain region change suggests tumor-related pressure?", options: ["Deepened sulci", "Flattened cortex", "Increased gray matter thickness", "Enlarged hippocampus"], correct: 1 },
    { id: 564, question: "A patient with brain tumor shows personality changes. Which lobe is most likely affected?", options: ["Occipital", "Temporal", "Frontal", "Parietal"], correct: 2 },
    { id: 565, question: "Which seizure type most commonly presents with an aura?", options: ["Simple partial", "Absence", "Myoclonic", "Atonic"], correct: 0 },
    { id: 566, question: "Which is the FIRST-line imaging sign of a brain tumor?", options: ["Enhancing white matter", "Loss of gyri definition", "Excessive CSF reabsorption", "Enlarged spinal canal"], correct: 1 },
    { id: 567, question: "Which receptor is activated on the sympathetic postganglionic target organ?", options: ["Muscarinic", "Nicotinic", "Adrenergic", "Serotonergic"], correct: 2 },
    { id: 568, question: "Which scenario indicates an increase in parasympathetic activity?", options: ["Pupil dilation and increased heart rate", "Bronchodilation and decreased GI motility", "Slowed heart rate and increased peristalsis", "Increased sweating and vasoconstriction"], correct: 2 },
    { id: 569, question: "Which seizure type lasts less than 5 seconds and typically leaves no residual effects?", options: ["Tonic-clonic", "Myoclonic", "Absence seizure", "Status epilepticus"], correct: 2 },
    { id: 570, question: "A seizure that lasts longer than 5 minutes or involves repeated seizures within 5 minutes is called:", options: ["Myoclonic seizure", "Simple partial seizure", "Epilepsy", "Status epilepticus"], correct: 3 },
    { id: 571, question: "Which statement best differentiates seizure vs. epilepsy?", options: ["Seizure always implies epilepsy.", "Epilepsy refers to chronic recurrent seizures.", "Epilepsy only occurs after head trauma.", "Seizure is a chronic disease."], correct: 1 },
    { id: 572, question: "Which type of tumor is the most common malignant primary brain tumor?", options: ["Meningioma", "Astrocytoma", "Glioma", "Neuroblastoma"], correct: 2 },
    { id: 573, question: "What imaging finding is highly suggestive of a brain tumor?", options: ["Increased number of gyri", "Flattened gyri in affected regions", "Excessive CSF in ventricles only", "Symmetric brain swelling"], correct: 1 },
    { id: 574, question: "What is the FIRST common sign of a brain tumor?", options: ["Visual disturbances", "Paralysis", "Seizures", "Coma"], correct: 2 },
    { id: 575, question: "Which tumor characteristic is TRUE for primary brain tumors?", options: ["They commonly metastasize outside the CNS.", "They often originate from glial cells.", "They have well-defined margins.", "They are usually non–life threatening."], correct: 1 },
    { id: 576, question: "Which is NOT a typical symptom of increased intracranial pressure (ICP)?", options: ["Headache", "Vomiting", "Lethargy", "Bradycardia"], correct: 3 },
    { id: 577, question: "Which finding best indicates a complex partial seizure rather than a simple partial seizure?", options: ["Preserved consciousness", "Entire brain is affected", "Loss of awareness or altered behavior", "Seizure duration < 5 seconds"], correct: 2 },
    { id: 578, question: "Which symptom most strongly suggests tonic-clonic seizure?", options: ["Brief staring spells", "Sudden muscle jerks only", "Auras with preserved consciousness", "Muscle stiffening followed by rhythmic jerking"], correct: 3 },
    { id: 579, question: "What differentiates myoclonic seizure from tonic-clonic seizure?", options: ["Myoclonic seizures involve prolonged unconsciousness", "Myoclonic seizures involve isolated muscle jerks", "Myoclonic seizures affect the entire brain", "Myoclonic seizures last over 5 minutes"], correct: 1 },
    { id: 580, question: "Which feature suggests a malignant brain tumor?", options: ["Well-defined smooth borders", "Slow-growing mass", "Ability to invade nearby tissue without metastasis", "Benign pathology but severe symptoms"], correct: 2 },
    { id: 581, question: "Which sign indicates elevated intracranial pressure (ICP)?", options: ["Hyperactivity", "Sudden weight loss", "Early morning headaches", "Bradycardia only"], correct: 2 },
    { id: 582, question: "Which treatment is most appropriate for a deeply located, inaccessible malignant glioma?", options: ["Surgical removal", "Radiation or chemotherapy", "Manual decompression therapy", "No treatment is required"], correct: 1 },
    { id: 583, question: "Which best describes secondary brain tumors?", options: ["They originate in CNS tissue.", "They never metastasize.", "They commonly arise from lung or breast cancers.", "They are usually benign."], correct: 2 },
    { id: 584, question: "A patient with repeated seizures for months is best classified as:", options: ["Status epilepticus", "Epilepsy", "Absence seizure", "Myoclonic disorder"], correct: 1 },
    { id: 585, question: "A 25-year-old patient is brought to the ER after a car accident. He is sweating heavily, his pupils are dilated, his heart rate is 132 bpm, and bowel sounds are absent. What autonomic state is most likely activated?", options: ["Parasympathetic", "Sympathetic", "Somatic", "Enteric"], correct: 1 },
    { id: 586, question: "A 25-year-old patient is brought to the ER after a car accident. He is sweating heavily, his pupils are dilated, his heart rate is 132 bpm, and bowel sounds are absent. Which neurotransmitter is acting on the target organs?", options: ["Acetylcholine (muscarinic)", "Acetylcholine (nicotinic)", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 587, question: "A 6-year-old child develops a high fever of 40.5°C and begins having full-body convulsions that last approximately 7 minutes. The child has two additional convulsions within the next 10 minutes. What is the diagnosis?", options: ["Myoclonic seizure", "Complex partial seizure", "Status epilepticus", "Simple absence seizure"], correct: 2 },
    { id: 588, question: "A 6-year-old child develops a high fever of 40.5°C and begins having full-body convulsions that last approximately 7 minutes. The child has two additional convulsions within the next 10 minutes. What is the greatest danger associated with this condition?", options: ["Permanent blindness", "Irreversible brain damage", "Digestive system shutdown", "Loss of peripheral sensation"], correct: 1 },
    { id: 589, question: "A 48-year-old patient presents with progressive headaches, morning vomiting, behavioral changes, and a new-onset seizure. MRI shows flattened gyri and a mass with poorly defined margins in the frontal lobe. What is the most likely diagnosis?", options: ["Benign meningioma", "Malignant glioma", "Ischemic stroke", "Multiple sclerosis"], correct: 1 },
    { id: 590, question: "A 48-year-old patient presents with progressive headaches, morning vomiting, behavioral changes, and a new-onset seizure. MRI shows flattened gyri and a mass with poorly defined margins in the frontal lobe. What is the FIRST symptom that often brings patients with brain tumors to the hospital?", options: ["Memory loss", "Seizures", "Hearing loss", "Facial paralysis"], correct: 1 },
    { id: 591, question: "A 30-year-old woman reports abdominal cramps, increased bowel sounds, diarrhea, and bradycardia following a vagal nerve stimulation therapy. Which system is overly activated?", options: ["Sympathetic", "Parasympathetic", "Somatic", "Enteric only"], correct: 1 },
    { id: 592, question: "A 30-year-old woman reports abdominal cramps, increased bowel sounds, diarrhea, and bradycardia following a vagal nerve stimulation therapy. Which receptor subtype is responsible for the postganglionic response?", options: ["Adrenergic", "Nicotinic", "Muscarinic", "Serotonergic"], correct: 2 },
    { id: 593, question: "A 19-year-old student reports sudden brief episodes of staring lasting 2–3 seconds. He does not fall, does not jerk, and immediately returns to normal without confusion. What type of seizure is most likely?", options: ["Absence seizure", "Myoclonic seizure", "Tonic seizure", "Complex partial seizure"], correct: 0 },
    { id: 594, question: "A 19-year-old student reports sudden brief episodes of staring lasting 2–3 seconds. He does not fall, does not jerk, and immediately returns to normal without confusion. What EEG pattern is typically seen?", options: ["Sharp waves only", "3-Hz spike and wave pattern", "Delta waves", "Flattened pattern"], correct: 1 },
    { id: 595, question: "Which best explains why benign brain tumors can still be life-threatening?", options: ["They metastasize widely", "They produce toxins", "They increase intracranial pressure in a fixed space", "They transform into infections"], correct: 2 },
    { id: 596, question: "A patient has a seizure affecting only the right arm with full awareness maintained. This is most consistent with:", options: ["Absence seizure", "Simple partial seizure", "Myoclonic seizure", "Complex partial seizure"], correct: 1 },
    { id: 597, question: "Flattening of gyri on MRI is most commonly due to:", options: ["Hyperglycemia", "Vitamin deficiency", "Space-occupying mass", "Cerebral atrophy"], correct: 2 },
    { id: 598, question: "Which symptom is LEAST likely in increased intracranial pressure (ICP)?", options: ["Morning headache", "Projectile vomiting", "Irritability", "Increased appetite"], correct: 3 },
    { id: 599, question: "Which best describes secondary brain tumors?", options: ["Originate in astrocytes", "Rarely metastasize", "Originate from cancers outside CNS", "Usually present in childhood"], correct: 2 },
    { id: 600, question: "Which receptor is activated on the sympathetic postganglionic target organ?", options: ["Muscarinic", "Nicotinic", "Adrenergic", "Serotonergic"], correct: 2 }
  ],
  "4. Nervous System Disorders": [
    { id: 701, question: "Which substance crosses the BBB most easily?", options: ["Sodium", "Glucose", "Water", "Lipid-soluble substances"], correct: 3 },
    { id: 702, question: "Why is a poorly developed BBB dangerous in neonates?", options: ["They produce too much CSF", "Toxins and drugs can enter the brain easily", "Myelin blocks nutrient flow", "Gray matter is less developed"], correct: 1 },
    { id: 703, question: "Why is a fully developed BBB a problem in adults?", options: ["It increases CSF production", "It prevents synapse formation", "Most antibiotics cannot enter the CNS", "It causes neuronal swelling"], correct: 2 },
    { id: 704, question: "Which of the following is NOT a protection of the brain?", options: ["Skull", "Meninges", "CSF", "Diaphragm"], correct: 3 },
    { id: 705, question: "The innermost layer of the meninges is:", options: ["Dura mater", "Pia mater", "Arachnoid mater", "Epidural space"], correct: 1 },
    { id: 706, question: "The subarachnoid space contains:", options: ["Blood vessels only", "Lymph", "CSF", "Bone marrow"], correct: 2 },
    { id: 707, question: "Equal production and absorption of CSF is necessary to maintain:", options: ["Blood pressure", "Intracranial pressure", "Neuron growth", "Synaptic release"], correct: 1 },
    { id: 708, question: "If CSF production > absorption, the result is:", options: ["Low ICP", "Hydrocephalus / increased ICP", "BBB breakdown", "Synaptic failure"], correct: 1 },
    { id: 709, question: "Which is TRUE about gray matter in the spinal cord?", options: ["Located outside", "Contains axons", "Contains cell bodies and dendrites", "Contains myelin"], correct: 2 },
    { id: 710, question: "Which direction do ascending tracts conduct signals?", options: ["From brain downward", "Toward the brain", "Only to muscles", "Only to glands"], correct: 1 },
    { id: 711, question: "Neurons are non-mitotic, meaning:", options: ["They cannot produce receptors", "They cannot undergo normal cell division", "They divide every 24 hours", "They only divide in infants"], correct: 1 },
    { id: 712, question: "Which cell forms myelin in the PNS?", options: ["Astrocyte", "Oligodendrocyte", "Schwann cell", "Microglia"], correct: 2 },
    { id: 713, question: "Which CNS cell is important for the BBB?", options: ["Schwann cell", "Astrocyte", "Microglia", "Ependymal cell"], correct: 1 },
    { id: 714, question: "Which cell performs phagocytosis within the CNS?", options: ["Oligodendrocyte", "Schwann cell", "Microglia", "Astrocyte"], correct: 2 },
    { id: 715, question: "Why does myelin increase conduction speed?", options: ["Neurons become longer", "It increases ATP", "Signals jump between nodes of Ranvier", "It thickens the axon"], correct: 2 },
    { id: 716, question: "Which part of the synapse receives the neurotransmitter?", options: ["Presynaptic axon", "Nodes of Ranvier", "Postsynaptic receptor", "Myelin sheath"], correct: 2 },
    { id: 717, question: "What occupies the synaptic cleft?", options: ["Cell bodies", "Neurotransmitters during signaling", "DNA fragments", "Microtubules"], correct: 1 },
    { id: 718, question: "Which neurotransmitter is excitatory?", options: ["GABA", "Glycine", "Acetylcholine", "Serotonin"], correct: 2 },
    { id: 719, question: "Which neurotransmitter is inhibitory?", options: ["Dopamine", "Norepinephrine", "GABA", "Acetylcholine"], correct: 2 },
    { id: 720, question: "Sympathetic preganglionic neurons release:", options: ["Dopamine", "Acetylcholine", "Serotonin", "Epinephrine"], correct: 1 },
    { id: 721, question: "Sympathetic postganglionic neurons release:", options: ["Norepinephrine", "Acetylcholine", "Serotonin", "GABA"], correct: 0 },
    { id: 722, question: "Parasympathetic preganglionic neurons release:", options: ["Norepinephrine", "Acetylcholine", "Dopamine", "Serotonin"], correct: 1 },
    { id: 723, question: "Parasympathetic postganglionic neurons release:", options: ["GABA", "Acetylcholine", "Epinephrine", "Dopamine"], correct: 1 },
    { id: 724, question: "Which receptor is used by sympathetic POSTganglionic neurons?", options: ["Nicotinic", "Muscarinic", "Adrenergic", "Cholinergic"], correct: 2 },
    { id: 725, question: "Which receptor is used by parasympathetic postganglionic neurons?", options: ["Adrenergic", "Muscarinic", "Dopaminergic", "Beta-2"], correct: 1 },
    { id: 726, question: "\"Fight or flight\" corresponds to:", options: ["Parasympathetic", "Sympathetic", "Somatic", "Enteric"], correct: 1 },
    { id: 727, question: "Which autonomic branch decreases heart rate and increases digestion?", options: ["Sympathetic", "Parasympathetic", "Somatic", "Central"], correct: 1 },
    { id: 728, question: "Which is located OUTSIDE the CNS?", options: ["Preganglionic neurons", "Postganglionic neurons", "Microglia", "Astrocytes"], correct: 1 },
    { id: 729, question: "Which statement is TRUE about cranial nerves?", options: ["All are motor nerves", "All are sensory nerves", "They originate from the brain", "They control only digestion"], correct: 2 },
    { id: 730, question: "The BBB structure resembles cell membrane mainly because it is:", options: ["Protein-based", "Carbohydrate-based", "Lipid-based", "Nucleic-acid based"], correct: 2 },
    { id: 731, question: "Which substance crosses the BBB most easily?", options: ["Glucose", "Sodium ions", "Lipid-soluble anesthetics", "Large water-soluble proteins"], correct: 2 },
    { id: 732, question: "What is the major reason antibiotics often fail to treat CNS infections in adults?", options: ["Increased metabolism in neurons", "BBB becomes fully developed and impermeable", "CSF lacks immune cells", "Cranial nerves block drug entry"], correct: 1 },
    { id: 733, question: "The greatest danger of a poorly developed BBB in neonates is:", options: ["Poor glucose uptake", "Excessive synapse formation", "Easy entry of toxins into the brain", "Increased CSF absorption"], correct: 2 },
    { id: 734, question: "Which structure is found in the gray matter of the spinal cord?", options: ["Myelinated axons", "Cell bodies & dendrites", "Schwann cells", "Nodes of Ranvier"], correct: 1 },
    { id: 735, question: "Which statement about spinal cord tracts is TRUE?", options: ["Ascending tracts carry signals from brain to body", "Descending tracts carry sensory signals", "Ascending tracts carry sensory signals toward the brain", "Both tracts are located in gray matter"], correct: 2 },
    { id: 736, question: "Which cell forms myelin in the CNS?", options: ["Schwann cell", "Astrocyte", "Microglia", "Oligodendrocyte"], correct: 3 },
    { id: 737, question: "Neurons are non-mitotic. This explains why:", options: ["They store glycogen", "Neural disorders are reversible", "Damage to neurons is permanent", "They produce antibodies"], correct: 2 },
    { id: 738, question: "Which neurotransmitter is inhibitory according to lecture?", options: ["Dopamine", "Acetylcholine", "GABA", "Norepinephrine"], correct: 2 },
    { id: 739, question: "Which receptor is used by sympathetic preganglionic neurons?", options: ["Muscarinic", "Nicotinic", "Adrenergic", "Serotonergic"], correct: 1 },
    { id: 740, question: "Sympathetic postganglionic fibers release:", options: ["Acetylcholine", "Epinephrine", "Norepinephrine", "Serotonin"], correct: 2 },
    { id: 741, question: "Parasympathetic postganglionic receptors are:", options: ["Muscarinic", "Adrenergic", "Nicotinic", "Dopaminergic"], correct: 0 },
    { id: 742, question: "Which structure is the site of neurotransmitter release?", options: ["Presynaptic soma", "Synaptic cleft", "Postsynaptic nucleus", "Myelin sheath"], correct: 1 },
    { id: 743, question: "Which cell type participates in phagocytosis in CNS?", options: ["Astrocyte", "Oligodendrocyte", "Microglia", "Schwann cell"], correct: 2 },
    { id: 744, question: "Which is TRUE about synaptic transmission?", options: ["Postsynaptic cell releases neurotransmitter", "Synaptic cleft is filled with myelin", "Receptors are located on postsynaptic membrane", "Presynaptic membrane contains no vesicles"], correct: 2 },
    { id: 745, question: "Nodes of Ranvier are essential because they:", options: ["Produce neurotransmitters", "Allow saltatory conduction", "Prevent axonal regeneration", "Form the BBB"], correct: 1 },
    { id: 746, question: "Which nerve type is mixed (sensory + motor)?", options: ["Olfactory", "Optic", "Trigeminal", "Trochlear"], correct: 2 },
    { id: 747, question: "The sympathetic system is also known as:", options: ["Rest and digest", "Feed and breed", "Fight or flight", "Slow and stable"], correct: 2 },
    { id: 748, question: "Parasympathetic preganglionic fibers originate from:", options: ["Brain & spinal cord", "Muscles", "Blood vessels", "Skin"], correct: 0 },
    { id: 749, question: "White matter appears white because:", options: ["Neuron cell bodies", "High lipid content in myelin", "Dense capillaries", "High water content"], correct: 1 },
    { id: 750, question: "Which is inhibited when BBB becomes fully impermeable?", options: ["Viral entry", "Passage of water", "Movement of lipid-soluble drugs", "Entry of many antibiotics"], correct: 3 },
    { id: 751, question: "Which of the following describes a CVA (stroke)?", options: ["Excess CSF production", "Loss of blood flow to the brain", "Excess neurotransmitter release", "Increased synaptic conduction"], correct: 1 },
    { id: 752, question: "Irreversible neuronal damage occurs after approximately:", options: ["1 minute of ischemia", "3 minutes of ischemia", "5 minutes of ischemia", "10 minutes of ischemia"], correct: 2 },
    { id: 753, question: "Which is NOT a cause of stroke?", options: ["Vessel occlusion", "Vessel rupture", "Increased CSF absorption", "Hemorrhage"], correct: 2 },
    { id: 754, question: "A stroke caused by a blood clot blocking a vessel is called:", options: ["Hemorrhagic", "Ischemic", "Subarachnoid", "Compensated"], correct: 1 },
    { id: 755, question: "Which disease increases the risk of stroke?", options: ["Asthma", "Diabetes", "Appendicitis", "Gastritis"], correct: 1 },
    { id: 756, question: "Which autoimmune disorder is a risk factor for CVA?", options: ["Psoriasis", "Systemic lupus erythematosus", "Crohn disease", "Hashimoto thyroiditis"], correct: 1 },
    { id: 757, question: "A patient with a blocked cerebral vessel may still have reduced damage due to:", options: ["Tachycardia", "Collateral circulation", "Hyperglycemia", "Photophobia"], correct: 1 },
    { id: 758, question: "Collateral circulation refers to:", options: ["Blood moving from brain to body", "Other organs redirecting blood to brain", "Increased CSF flow", "Increased heart rate"], correct: 1 },
    { id: 759, question: "Damage in the left hemisphere typically causes deficits on:", options: ["Left side", "Right side", "Both sides", "Neither"], correct: 1 },
    { id: 760, question: "Flaccid paralysis occurs when:", options: ["Inhibitory neurotransmitters are blocked", "Excitatory neurotransmitters decrease", "CSF increases", "Meninges inflame"], correct: 1 },
    { id: 761, question: "Spastic paralysis occurs when:", options: ["Excitatory neurotransmitters are blocked", "Inhibitory neurotransmitters decrease", "CSF flow decreases", "Brainstem is damaged"], correct: 1 },
    { id: 762, question: "Which is NOT a specific treatment for CVA?", options: ["Clot-busting drugs", "Surgical removal of clot", "Glucocorticoids", "Antibiotics"], correct: 2 },
    { id: 763, question: "Which is TRUE about meningitis transmission?", options: ["It spreads through the nervous system", "It spreads by respiratory droplets", "It spreads by fecal-oral route", "It spreads by direct skin contact"], correct: 1 },
    { id: 764, question: "Meningitis in children and young adults is most commonly caused by:", options: ["E. coli", "Streptococcus pneumoniae", "Haemophilus influenzae", "Neisseria meningitidis"], correct: 2 },
    { id: 765, question: "Neonatal meningitis is most commonly caused by:", options: ["E. coli", "S. pneumoniae", "Meningococcus", "EBV"], correct: 0 },
    { id: 766, question: "Haemophilus influenzae most commonly causes meningitis in:", options: ["Older adults", "Young children", "Neonates", "Infants < 2 weeks"], correct: 1 },
    { id: 767, question: "Pneumococcal meningitis is most common in:", options: ["Newborns", "Young adults", "Older adults", "Teenagers"], correct: 2 },
    { id: 768, question: "A hallmark symptom of meningitis is:", options: ["Chronic cough", "Severe headache", "Diarrhea", "Hair loss"], correct: 1 },
    { id: 769, question: "Nuchal rigidity refers to:", options: ["Leg weakness", "Stiff neck", "Arm paralysis", "Facial spasms"], correct: 1 },
    { id: 770, question: "Kernig's sign involves pain during:", options: ["Neck flexion", "Hip extension with knee flexed", "Knee extension when hip is flexed", "Back flexion"], correct: 2 },
    { id: 771, question: "Brudzinski's sign occurs when:", options: ["Passive neck flexion causes hip/knee flexion", "Hip flexion causes neck pain", "Arm movement triggers leg movement", "Deep breathing causes cough"], correct: 0 },
    { id: 772, question: "Photophobia means:", options: ["Fear of sound", "Fear of light", "Fear of touch", "Fear of water"], correct: 1 },
    { id: 773, question: "In bacterial meningitis, CSF typically shows:", options: ["0–1 WBC", "Many neutrophils", "Only RBCs", "No microorganisms"], correct: 1 },
    { id: 774, question: "Leukocytosis means:", options: ["High WBC", "Low RBC", "Low WBC", "High platelets"], correct: 0 },
    { id: 775, question: "Treatment of meningitis includes:", options: ["Antivirals only", "Aggressive antimicrobials", "Antihistamines", "Diuretics"], correct: 1 },
    { id: 776, question: "Which virus causes rabies?", options: ["EBV", "HSV-2", "Lyssavirus", "Adenovirus"], correct: 2 },
    { id: 777, question: "Rabies is transmitted primarily via:", options: ["Air", "Bite of infected animal", "Contaminated water", "Inhalation"], correct: 1 },
    { id: 778, question: "The virus travels to the CNS via:", options: ["CSF flow", "Bloodstream", "Retrograde neural movement", "Hematogenous spread"], correct: 2 },
    { id: 779, question: "A classic symptom of rabies is:", options: ["Hydrophobia", "Photophobia", "Jaundice", "Hair loss"], correct: 0 },
    { id: 780, question: "The main cause of death in rabies is:", options: ["Liver failure", "Respiratory failure", "Hypotension", "Dehydration"], correct: 1 },
    { id: 781, question: "Reye syndrome is associated with:", options: ["Acetaminophen", "Ibuprofen", "Aspirin use in children", "Steroid use"], correct: 2 },
    { id: 782, question: "Reye syndrome affects primarily the:", options: ["Lungs", "Liver and brain", "Heart", "Kidneys"], correct: 1 },
    { id: 783, question: "The outcome of Reye syndrome is dangerous because:", options: ["It is easily cured", "It causes skin rashes", "There is no immediate cure", "It only affects adults"], correct: 2 },
    { id: 784, question: "Which is NOT a symptom of meningitis?", options: ["Stiff neck", "Severe headache", "Kernig's sign", "Hyperthyroidism"], correct: 3 },
    { id: 785, question: "A stroke patient cannot move the right arm. The lesion is likely in:", options: ["Right hemisphere", "Left hemisphere", "Brainstem only", "Cerebellum"], correct: 1 },
    { id: 786, question: "Which stroke treatment removes clots?", options: ["Antivirals", "Heparin", "Antifungals", "Antihistamines"], correct: 1 },
    { id: 787, question: "A patient shows photophobia, fever, and nuchal rigidity. Most likely diagnosis:", options: ["Stroke", "Rabies", "Meningitis", "Reye syndrome"], correct: 2 },
    { id: 788, question: "What age group is most affected by pneumococcal meningitis?", options: ["Teenagers", "Children", "Older adults", "Neonates"], correct: 2 },
    { id: 789, question: "Which infection causes retrograde nerve travel?", options: ["Reye syndrome", "Rabies", "Meningitis", "TIA"], correct: 1 },
    { id: 790, question: "Hydrophobia in rabies is due to:", options: ["CNS swelling", "Painful swallowing", "Lung damage", "Thirst"], correct: 1 },
    { id: 791, question: "Which sign appears when passive neck flexion triggers knee/hip flexion?", options: ["Kernig", "Babinski", "Brudzinski", "Hoffman"], correct: 2 },
    { id: 792, question: "Which infection often shows neutrophils in CSF?", options: ["Viral meningitis", "Bacterial meningitis", "Rabies", "Reye syndrome"], correct: 1 },
    { id: 793, question: "Which lifestyle factor increases stroke risk?", options: ["Aerobic exercise", "Sedentary lifestyle", "High water intake", "Vegetarian diet"], correct: 1 },
    { id: 794, question: "TIA stands for:", options: ["Temporary immune allergy", "Transient ischemic attack", "Toxic inflammatory anemia", "Total ischemic arrest"], correct: 1 },
    { id: 795, question: "Stroke involving rupture is called:", options: ["Embolic", "Hemorrhagic", "Silent", "Transient"], correct: 1 },
    { id: 796, question: "Which symptom is unique to meningitis compared to stroke?", options: ["Hemiplegia", "Kernig's sign", "Facial drop", "Spastic paralysis"], correct: 1 },
    { id: 797, question: "Which best describes Reye syndrome?", options: ["Viral infection of meninges", "Autoimmune liver attack", "Aspirin-related brain/liver damage", "Bacterial CNS infection"], correct: 2 },
    { id: 798, question: "What is the earliest sign of many brain tumors and severe meningitis?", options: ["Seizure", "Hair loss", "Diarrhea", "Polyuria"], correct: 0 },
    { id: 799, question: "Retrograde neural movement means:", options: ["CNS → PNS", "Brain → muscles", "PNS → CNS", "Muscle → spine"], correct: 2 },
    { id: 800, question: "Which meningitis symptom indicates severe bacterial infection?", options: ["Flat affect", "Multiple neutrophils in CSF", "High RBC count", "Low CSF pressure"], correct: 1 },
    { id: 801, question: "Which of the following best describes Cerebral Palsy (CP)?", options: ["A progressive degenerative disorder", "A group of motor impairment disorders caused by early brain damage", "A genetic blood disorder", "A reversible neurological condition"], correct: 1 },
    { id: 802, question: "Cerebral palsy can occur at which time?", options: ["Only after birth", "Only before birth", "Before, during, or shortly after birth", "Only during adulthood"], correct: 2 },
    { id: 803, question: "Which is the most common type of Cerebral Palsy?", options: ["Ataxic", "Dyskinetic", "Spastic", "Flaccid"], correct: 2 },
    { id: 804, question: "Spastic CP occurs due to a lack of which neurotransmitter effect?", options: ["Excitatory", "Inhibitory", "Sensory", "Adrenergic"], correct: 1 },
    { id: 805, question: "Ataxic Cerebral Palsy is primarily due to damage in which structure?", options: ["Frontal lobe", "Cerebellum", "Pons", "Basal ganglia"], correct: 1 },
    { id: 806, question: "Which of the following symptoms is LEAST associated with CP?", options: ["Cognitive impairment", "Speech difficulties", "Visual problems", "Regeneration of neurons"], correct: 3 },
    { id: 807, question: "Which statement about CP treatment is correct?", options: ["CP can be cured with medication", "Only surgery is effective", "No cure exists; therapy is supportive", "Antibiotics are the main treatment"], correct: 2 },
    { id: 808, question: "Why are many nervous system disorders degenerative?", options: ["Neurons divide too rapidly", "Neurons are non-mitotic", "Blood supply is excessive", "Too many neurotransmitters"], correct: 1 },
    { id: 809, question: "Parkinson's disease primarily involves the deficiency of:", options: ["Acetylcholine", "Dopamine", "Serotonin", "GABA"], correct: 1 },
    { id: 810, question: "Which is a classic early sign of Parkinson's disease?", options: ["Severe dementia", "Loss of balance", "Mask-like facial expression", "Apnea"], correct: 2 },
    { id: 811, question: "\"Pill-rolling tremor\" occurs:", options: ["Only during sleep", "During voluntary movement", "At rest", "Only during eating"], correct: 2 },
    { id: 812, question: "Which of the following is a LATE sign of Parkinson's disease?", options: ["Early fatigue", "Mild tremor", "Propulsive gait", "Slight facial stiffness"], correct: 2 },
    { id: 813, question: "Propulsive gait refers to:", options: ["Walking backward", "Walking with head up", "Leaning forward and shuffling", "Jumping movements"], correct: 2 },
    { id: 814, question: "Difficulty swallowing in Parkinson's patients is due to:", options: ["Overproduction of dopamine", "Cerebral tumor", "Muscle rigidity affecting throat muscles", "Excess saliva production"], correct: 2 },
    { id: 815, question: "Which of the following is true regarding Parkinson's?", options: ["Always fatal", "Never leads to dementia", "Can lead to autonomic dysfunction", "Caused by bacteria"], correct: 2 },
    { id: 816, question: "Secondary parkinsonism can be caused by:", options: ["Viral meningitis", "Encephalitis", "Dental caries", "Hypertension"], correct: 1 },
    { id: 817, question: "Which drug is a dopamine precursor used in Parkinson's treatment?", options: ["Acetaminophen", "Levodopa", "Ibuprofen", "Penicillin"], correct: 1 },
    { id: 818, question: "Which medication type helps reduce excessive neuronal stimulation in Parkinson's?", options: ["Antibiotics", "Anticoagulants", "Anticholinergics", "Antivirals"], correct: 2 },
    { id: 819, question: "A mask-like facial expression in Parkinson's is due to:", options: ["Weak eye muscles", "Reduced voluntary movement", "Excessive dopamine", "Facial nerve paralysis"], correct: 1 },
    { id: 820, question: "Which of the following statements is TRUE about CP and Parkinson's?", options: ["Both are fully reversible", "Both are caused by bacterial infection", "CP is non-progressive; Parkinson's is progressive", "CP only affects adults"], correct: 2 },
    { id: 821, question: "What type of CP involves involuntary movements?", options: ["Spastic", "Dyskinetic", "Ataxic", "Flaccid"], correct: 1 },
    { id: 822, question: "What is a common complication in Parkinson's?", options: ["Excessive blinking", "Rapid speech", "Orthostatic hypotension", "High body temperature"], correct: 2 },
    { id: 823, question: "Which symptom indicates difficulty initiating movement in Parkinson's?", options: ["Bradykinesia", "Tachykinesia", "Hyperreflexia", "Hypermobility"], correct: 0 },
    { id: 824, question: "Neurons are non-mitotic, meaning:", options: ["They divide rapidly", "They regenerate quickly", "They do not undergo cell division", "They multiply after injury"], correct: 2 },
    { id: 825, question: "CP is MOST associated with damage from:", options: ["Adulthood infections", "Childhood sports injuries", "Perinatal hypoxia", "Vitamin overdose"], correct: 2 },
    { id: 826, question: "Parkinson's disease tremors are typically:", options: ["Absent during rest", "Worse during sleep", "Worse at rest", "Related to blood pressure"], correct: 2 },
    { id: 827, question: "The stooped posture in Parkinson's is due to:", options: ["Weak cranial nerves", "Loss of consciousness", "Increased muscle rigidity", "Bone deformities"], correct: 2 },
    { id: 828, question: "The best description of dyskinetic CP is:", options: ["Loss of balance", "Involuntary writhing or repetitive movements", "Complete paralysis", "Normal movement but poor vision"], correct: 1 },
    { id: 829, question: "Why does Parkinson's impair communication?", options: ["Brainstem is destroyed", "Mask-like face reduces expression", "Tongue is paralyzed", "Vision loss causes speech delay"], correct: 1 },
    { id: 830, question: "Which is common to BOTH CP and Parkinson's?", options: ["Progressive degeneration", "Motor dysfunction", "Caused by dopamine excess", "Caused by viral infection"], correct: 1 },
    { id: 831, question: "Which of the following is NOT a risk factor for secondary parkinsonism?", options: ["Encephalitis", "Repeated brain trauma", "Long-term antianxiety medications", "Genetic mutation in childhood"], correct: 3 },
    { id: 832, question: "Which condition is characterized by resting tremor, rigidity, and bradykinesia?", options: ["Cerebral palsy", "Meningitis", "Parkinson's disease", "Epilepsy"], correct: 2 },
    { id: 833, question: "Which type of CP results from cerebellar dysfunction?", options: ["Spastic", "Ataxic", "Dyskinetic", "Mixed"], correct: 1 },
    { id: 834, question: "Which symptom is most strongly associated with spastic CP?", options: ["Weak reflexes", "Hypotonia", "Hypertonia", "Loss of sensation"], correct: 2 },
    { id: 835, question: "What is the primary neurotransmitter deficit in Parkinson's disease?", options: ["Acetylcholine", "Dopamine", "Glutamate", "Norepinephrine"], correct: 1 },
    { id: 836, question: "\"Pill-rolling tremor\" involves repetitive movement of the:", options: ["Neck", "Fingers and thumb", "Foot", "Eyelids"], correct: 1 },
    { id: 837, question: "Which best describes the gait of a person with advanced Parkinson's disease?", options: ["Wide, unsteady gait", "Propulsive, shuffling gait", "Waddling gait", "High-stepping gait"], correct: 1 },
    { id: 838, question: "A child presents with involuntary writhing movements and difficulty controlling muscles. Which type of CP is most likely?", options: ["Spastic", "Mixed", "Dyskinetic", "Ataxic"], correct: 2 },
    { id: 839, question: "Which of the following is TRUE regarding cerebral palsy?", options: ["It worsens rapidly over time", "It is a non-progressive brain injury", "It is caused by dopamine deficiency", "It only affects adults"], correct: 1 },
    { id: 840, question: "Which autonomic symptom is common in Parkinson's disease?", options: ["Excessive sweating", "Orthostatic hypotension", "Hyperventilation", "Tachycardia"], correct: 1 },
    { id: 841, question: "Which is LEAST likely to occur in cerebral palsy?", options: ["Motor impairment", "Cognitive impairment", "Seizures", "Rapid neuronal regeneration"], correct: 3 },
    { id: 842, question: "Which medication helps replace low dopamine levels in Parkinson's disease?", options: ["Penicillin", "Levodopa", "Aspirin", "Diazepam"], correct: 1 },
    { id: 843, question: "Which part of the brain degenerates in Parkinson's disease?", options: ["Hippocampus", "Cerebellum", "Basal ganglia (substantia nigra)", "Occipital lobe"], correct: 2 },
    { id: 844, question: "Which of the following best describes bradykinesia?", options: ["Rapid movement", "Slow initiation of movement", "Tremors during sleep", "Muscle paralysis"], correct: 1 },
    { id: 845, question: "Dysphagia in Parkinson's is caused by:", options: ["Sensory loss", "Respiratory infection", "Rigidity of throat and facial muscles", "Reduced appetite"], correct: 2 },
    { id: 846, question: "Which complication is common in both CP and Parkinson's?", options: ["Drooling", "High fever", "Hypertension", "Hearing loss"], correct: 0 },
    { id: 847, question: "What is the primary goal of therapy in cerebral palsy?", options: ["Cure the disease", "Improve motor function and independence", "Reduce dopamine levels", "Reverse brain damage"], correct: 1 },
    { id: 848, question: "Which of the following gait abnormalities is typical of ataxic CP?", options: ["Shuffling gait", "Wide-based unsteady gait", "Dragging feet", "Involuntary fast steps"], correct: 1 },
    { id: 849, question: "Facial mask in Parkinson's indicates:", options: ["Facial nerve paralysis", "Reduced facial expressiveness", "Severe pain", "Acute infection"], correct: 1 },
    { id: 850, question: "Which of the following is NOT typically seen in Parkinson's disease?", options: ["Resting tremor", "Muscle rigidity", "Sudden recovery of motor function", "Bradykinesia"], correct: 2 },
    { id: 851, question: "Which neurotransmitter imbalance contributes to tremor in Parkinson's?", options: ["Excess dopamine", "Imbalance between dopamine and acetylcholine", "Increased serotonin", "Excess GABA"], correct: 1 },
    { id: 852, question: "CP most commonly results from which perinatal condition?", options: ["Excessive glucose", "Perinatal hypoxia", "Low vitamin D", "Hypoglycemia"], correct: 1 },
    { id: 853, question: "Mixed CP involves:", options: ["Only cerebellar signs", "Both spastic and dyskinetic features", "Only involuntary movements", "Only sensory loss"], correct: 1 },
    { id: 854, question: "Which of the following symptoms is more typical of Parkinson's than CP?", options: ["Postural instability", "Intellectual disability", "Congenital onset", "Spasticity"], correct: 0 },
    { id: 855, question: "Which therapy is commonly used for CP but NOT curative?", options: ["Physical therapy", "Dopamine replacement", "Chemotherapy", "Antivirals"], correct: 0 },
    { id: 856, question: "A patient with Parkinson's presents with severe rigidity, slow movement, and freezing episodes. This indicates:", options: ["Mild disease", "Early stage only", "Progressive neurodegeneration", "Reversible symptoms"], correct: 2 },
    { id: 857, question: "A baby shows difficulty maintaining balance and coordination. Which CP type?", options: ["Spastic", "Ataxic", "Dyskinetic", "Mixed"], correct: 1 },
    { id: 858, question: "Which sign supports the diagnosis of Parkinson's?", options: ["Positive Kernig sign", "Positive Brudzinski sign", "Resting tremor", "Photophobia"], correct: 2 },
    { id: 859, question: "Why is cerebral palsy described as \"non-progressive\"?", options: ["Brain damage resolves on its own", "Symptoms disappear by adulthood", "The original brain injury does not worsen", "Neurons regenerate fully"], correct: 2 },
    { id: 860, question: "Which symptom occurs LATE in Parkinson's disease?", options: ["Eating difficulty", "Mask-like face", "Resting tremor", "Dementia"], correct: 3 },
    { id: 861, question: "Which neurotransmitter is primarily deficient in Alzheimer's disease?", options: ["Dopamine", "Serotonin", "Acetylcholine", "GABA"], correct: 2 },
    { id: 862, question: "Which motor neuron lesion causes spastic paralysis?", options: ["Lower motor neuron", "Upper motor neuron", "Sensory neuron", "Parasympathetic neuron"], correct: 1 },
    { id: 863, question: "The most common cause of death in ALS is:", options: ["Cardiac arrest", "Renal failure", "Respiratory failure", "Seizure"], correct: 2 },
    { id: 864, question: "Which statement about dementia is TRUE?", options: ["Long-term memory is the first affected", "Short-term memory is typically affected first", "Dementia is a single disease", "Dementia never affects behavior"], correct: 1 },
    { id: 865, question: "Riluzole is used in ALS because it:", options: ["Cures the disease", "Reverses paralysis", "Slows disease progression", "Increases dopamine secretion"], correct: 2 },
    { id: 866, question: "Alzheimer's disease typically progresses over:", options: ["Hours", "Days", "Weeks", "10–20 years"], correct: 3 },
    { id: 867, question: "ALS affects which neurons?", options: ["Only sensory neurons", "Only upper motor neurons", "Upper and lower motor neurons", "Only peripheral nerves"], correct: 2 },
    { id: 868, question: "Dementia primarily involves dysfunction of the:", options: ["Cerebellum", "Brainstem", "Cerebral cortex", "Spinal cord"], correct: 2 },
    { id: 869, question: "Spastic paralysis is due to loss of:", options: ["Sensory receptors", "Excitatory neurotransmitters", "Inhibitory neurotransmitters", "Myelin"], correct: 2 },
    { id: 870, question: "Which of the following is NOT true about Alzheimer's disease?", options: ["It involves short-term memory loss", "It is progressive", "It is fully reversible", "It involves ACh deficiency"], correct: 2 },
    { id: 871, question: "Which feature distinguishes ALS from Alzheimer's disease?", options: ["Memory impairment is severe", "Cognitive function is preserved in ALS", "Patients develop hallucinations", "ALS is caused by ACh deficiency"], correct: 1 },
    { id: 872, question: "Lower motor neuron damage results in:", options: ["Hyperreflexia", "Spasticity", "Flaccid paralysis", "Increased muscle tone"], correct: 2 },
    { id: 873, question: "A hallmark microscopic finding in Alzheimer's disease includes:", options: ["Demyelination plaques", "Neurofibrillary tangles", "Viral inclusions", "Neutrophil clusters"], correct: 1 },
    { id: 874, question: "Early Alzheimer patients typically show difficulty with:", options: ["Recognizing childhood memories", "Short-term recall and new learning", "Motor coordination", "Swallowing"], correct: 1 },
    { id: 875, question: "Which of the following increases ACh levels in Alzheimer's patients?", options: ["Cholinesterase inhibitors", "Dopamine agonists", "GABA blockers", "Nerve growth factors"], correct: 0 },
    { id: 876, question: "In ALS, flaccid paralysis is more common because:", options: ["UMN lesions dominate", "Cortical neurons are unaffected", "LMN degeneration is more prominent", "Sensory pathways degenerate first"], correct: 2 },
    { id: 877, question: "Which clinical sign suggests spastic paralysis?", options: ["Muscle atrophy", "Loss of reflexes", "Hyperreflexia", "Fasciculations"], correct: 2 },
    { id: 878, question: "Dementia due to vascular disease is most associated with:", options: ["Sudden, stepwise decline", "Rapid memory recovery", "Improved cognition after sleep", "Increased ACh levels"], correct: 0 },
    { id: 879, question: "A major characteristic distinguishing dementia from delirium is:", options: ["Dementia is chronic and progressive", "Dementia is caused by infection", "Delirium affects long-term memory only", "Delirium develops over decades"], correct: 0 },
    { id: 880, question: "Which brain region degenerates primarily in Alzheimer's disease?", options: ["Cerebellum", "Cerebral cortex", "Brainstem", "Spinal cord"], correct: 1 },
    { id: 881, question: "A 72-year-old woman cannot remember what she ate for breakfast but recalls her childhood clearly. Most likely diagnosis?", options: ["ALS", "Alzheimer's disease", "Parkinson's disease", "Stroke"], correct: 1 },
    { id: 882, question: "A patient presents with muscle wasting, flaccid limbs, difficulty walking, and intact cognition. Most likely?", options: ["Alzheimer's disease", "ALS (LMN predominant)", "Parkinson's disease", "Dementia"], correct: 1 },
    { id: 883, question: "A 65-year-old man shows gradual behavioral changes, irritability, poor judgment, and memory loss over 12 years. Most likely?", options: ["Stroke", "Alzheimer's disease", "ALS", "Rabies"], correct: 1 },
    { id: 884, question: "A patient with ALS reports increasing shortness of breath. What complication is developing?", options: ["Kidney failure", "Respiratory muscle paralysis", "Dementia", "Viral infection"], correct: 1 },
    { id: 885, question: "A patient exhibits hyperreflexia and muscle stiffness. Which motor neuron is damaged?", options: ["Lower motor neuron", "Upper motor neuron", "Sensory fibers", "Parasympathetic nerves"], correct: 1 },
    { id: 886, question: "A man bitten by a dog develops progressive limb weakness but normal memory. Later he develops respiratory failure. Which disease fits?", options: ["Alzheimer's", "Rabies", "Dementia", "ALS"], correct: 3 },
    { id: 887, question: "A caregiver reports their patient cannot recognize family members anymore. This is typical of:", options: ["ALS", "Late-stage Alzheimer's", "Parkinson's", "Lower motor neuron lesion"], correct: 1 },
    { id: 888, question: "A patient shows muscle rigidity, hyperreflexia, spasticity but normal cognition. Which condition?", options: ["Dementia", "Alzheimer's", "ALS (UMN involvement)", "Stroke"], correct: 2 },
    { id: 889, question: "A patient's medication slows the progression of ALS. Which drug is it?", options: ["Levodopa", "Riluzole", "Acetaminophen", "Morphine"], correct: 1 },
    { id: 890, question: "A patient with dementia has sudden worsening after several small strokes. Diagnosis?", options: ["Alzheimer's disease", "Vascular dementia", "ALS", "Parkinson's disease"], correct: 1 },
    { id: 891, question: "Which of the following is preserved in ALS?", options: ["Voluntary motor control", "Cognitive function", "Swallowing ability", "Respiratory strength"], correct: 1 },
    { id: 892, question: "Which finding is most consistent with lower motor neuron damage in ALS?", options: ["Hyperreflexia", "Spasticity", "Fasciculations", "Increased tone"], correct: 2 },
    { id: 893, question: "A hallmark of early Alzheimer's disease is:", options: ["Loss of distant memories", "Movement abnormalities", "Short-term memory impairment", "Rapid onset symptoms"], correct: 2 },
    { id: 894, question: "Dementia due to infection (e.g., HIV, syphilis) is classified as:", options: ["Primary dementia", "Secondary dementia", "Vascular dementia", "Alzheimer's dementia"], correct: 1 },
    { id: 895, question: "Which type of paralysis occurs with upper motor neuron involvement in ALS?", options: ["Flaccid paralysis", "Spastic paralysis", "No paralysis", "Mixed sensory loss"], correct: 1 },
    { id: 896, question: "Which neurotransmitter is reduced because of rapid breakdown in Alzheimer's?", options: ["Dopamine", "Norepinephrine", "Acetylcholine", "Serotonin"], correct: 2 },
    { id: 897, question: "A patient with Alzheimer's is prescribed a cholinesterase inhibitor to:", options: ["Increase dopamine", "Slow breakdown of acetylcholine", "Increase serotonin", "Improve motor control"], correct: 1 },
    { id: 898, question: "The pathological protein associated with Alzheimer's plaques is:", options: ["Alpha-synuclein", "Beta-amyloid", "Tau-protein", "Prion protein"], correct: 1 },
    { id: 899, question: "ALS is classified as which type of disease?", options: ["Autoimmune", "Infectious", "Neurodegenerative", "Metabolic"], correct: 2 },
    { id: 900, question: "Which condition MOST commonly leads to respiratory muscle weakness?", options: ["Alzheimer's", "Dementia", "ALS", "Stroke"], correct: 2 },
    { id: 901, question: "Which motor neuron sign would you expect to find early in ALS?", options: ["Loss of pain sensation", "Bilateral facial paralysis", "Mixed UMN + LMN signs", "Rapid cognitive decline"], correct: 2 },
    { id: 902, question: "Why does vascular dementia often progress in a \"stepwise\" pattern?", options: ["Due to progressive infection", "Due to multiple small strokes", "Due to neurotransmitter depletion", "Due to vitamin deficiency"], correct: 1 },
    { id: 903, question: "Which factor increases the likelihood of Alzheimer's disease?", options: ["Excessive exercise", "Increasing age", "High dopamine", "Viral infections"], correct: 1 },
    { id: 904, question: "In ALS patients, fasciculations occur because of:", options: ["UMN degeneration", "Demyelination", "LMN irritation", "Excess ACh production"], correct: 2 },
    { id: 905, question: "Which of the following is NOT characteristic of dementia?", options: ["Impaired judgment", "Slow, progressive decline", "Acute onset in hours", "Memory impairment"], correct: 2 },
    { id: 906, question: "A 70-year-old woman remembers events from 30 years ago but cannot recall her doctor's instructions from the morning. Most likely?", options: ["ALS", "Alzheimer's", "Rabies", "Stroke"], correct: 1 },
    { id: 907, question: "A patient displays hyperreflexia, muscle stiffness, and no sensory loss. Which is MOST likely?", options: ["LMN lesion", "Dementia", "UMN involvement", "Alzheimer's disease"], correct: 2 },
    { id: 908, question: "A man with ALS now struggles to breathe deeply. This indicates:", options: ["Cognitive decline", "Brainstem stroke", "Respiratory muscle involvement", "Dopamine deficiency"], correct: 2 },
    { id: 909, question: "A 66-year-old shows forgetfulness, irritability, wandering, and failure to recognize family. This stage of Alzheimer's is MOST likely:", options: ["Mild", "Moderate", "Severe", "Post-traumatic"], correct: 2 },
    { id: 910, question: "A patient with progressive leg weakness and muscle twitching has normal MRI and normal sensation. Which condition fits best?", options: ["ALS", "Alzheimer's", "Meningitis", "MS"], correct: 0 },
    { id: 911, question: "ALS involves degeneration of:", options: ["Sensory neurons only", "Upper and lower motor neurons", "Autonomic neurons only", "Cognitive processing centers"], correct: 1 },
    { id: 912, question: "Which of the following is most typical of dementia?", options: ["Sudden paralysis", "Progressive memory loss", "Loss of motor neurons", "Excess dopamine"], correct: 1 },
    { id: 913, question: "Alzheimer's disease is primarily associated with deficiency of:", options: ["Dopamine", "Acetylcholine", "Serotonin", "Glutamate"], correct: 1 },
    { id: 914, question: "Early Alzheimer's most commonly affects:", options: ["Balance", "Long-term memory", "Short-term memory", "Pain sensation"], correct: 2 },
    { id: 915, question: "Which finding is specific to LMN damage in ALS?", options: ["Hypertonia", "Clonus", "Fasciculations", "Spasticity"], correct: 2 },
    { id: 916, question: "The major cause of death in ALS is:", options: ["Liver failure", "Respiratory failure", "Severe infection", "Dementia progression"], correct: 1 },
    { id: 917, question: "Which pathology is associated with Alzheimer's?", options: ["Demyelination of axons", "Beta-amyloid plaque buildup", "Cerebellar degeneration", "Viral inflammation"], correct: 1 },
    { id: 918, question: "Dementia caused by multiple mini-strokes is known as:", options: ["Alzheimer's dementia", "Vascular dementia", "Infectious dementia", "Metabolic dementia"], correct: 1 },
    { id: 919, question: "Which symptom is NOT typical of Alzheimer's?", options: ["Wandering", "Short memory loss", "Increased reflexes", "Personality changes"], correct: 2 },
    { id: 920, question: "ALS patients typically retain which function the longest?", options: ["Motor control", "Vision", "Cognition", "Facial muscle strength"], correct: 2 },
    { id: 921, question: "Which brain region is most affected early in Alzheimer's disease?", options: ["Brainstem", "Hippocampus", "Cerebellum", "Occipital lobe"], correct: 1 },
    { id: 922, question: "Which is TRUE about ALS?", options: ["It is curable with high-dose steroids", "It involves sensory loss", "It preserves intellectual function", "It causes early confusion"], correct: 2 },
    { id: 923, question: "Spastic paralysis in ALS is due to:", options: ["LMN degeneration", "UMN degeneration", "Loss of acetylcholine", "Reduced serotonin levels"], correct: 1 },
    { id: 924, question: "A hallmark of severe Alzheimer's is:", options: ["Hyperreflexia", "Loss of ability to recognize family", "Excessive dopamine release", "Full recovery with therapy"], correct: 1 },
    { id: 925, question: "Which is the mechanism of cholinesterase inhibitors?", options: ["Destroy acetylcholine receptors", "Prevent breakdown of acetylcholine", "Increase dopamine", "Reduce serotonin reuptake"], correct: 1 },
    { id: 926, question: "A patient with ALS shows increased muscle tone and hyperreflexia in legs. Which motor neuron is affected?", options: ["LMN only", "Sensory neuron", "UMN", "No neurons involved"], correct: 2 },
    { id: 927, question: "An elderly man cannot remember where he placed items, forgets conversations, but recalls childhood clearly. Most likely diagnosis?", options: ["Dementia from infection", "Early Alzheimer's disease", "ALS", "Brain tumor"], correct: 1 },
    { id: 928, question: "A patient shows difficulty swallowing, drooling, and respiratory muscle weakness. Which stage of ALS is this?", options: ["Very early", "Mild", "Advanced", "Non-progressive"], correct: 2 },
    { id: 929, question: "A 72-year-old woman shows sudden stepwise decline in memory after multiple TIAs. Diagnosis?", options: ["Alzheimer's", "ALS", "Vascular dementia", "Parkinson's disease"], correct: 2 },
    { id: 930, question: "A patient presents with spastic paralysis in one arm but flaccid paralysis in the other. What does this indicate?", options: ["Damage to both UMN and LMN pathways", "Only sensory nerve injury", "Reversible inflammation", "Pure Alzheimer's disease"], correct: 0 },
    { id: 931, question: "Which clinical feature is LEAST likely to appear in ALS?", options: ["Fasciculations", "Muscle atrophy", "Loss of sensation", "Respiratory weakness"], correct: 2 },
    { id: 932, question: "Which type of memory is most impaired first in Alzheimer's?", options: ["Childhood memories", "Long-term stored memories", "Recent short-term memory", "Procedural memory"], correct: 2 },
    { id: 933, question: "Dementia generally involves impairment in all EXCEPT:", options: ["Learning", "Judgment", "Sensory pathways", "Memory"], correct: 2 },
    { id: 934, question: "Which neurotransmitter is most linked to Alzheimer's cognitive decline?", options: ["GABA", "Acetylcholine", "Dopamine", "Serotonin"], correct: 1 },
    { id: 935, question: "A patient develops both hyperreflexia and muscle twitching. Which disorder fits best?", options: ["Alzheimer's", "ALS", "Meningitis", "Rabies"], correct: 1 },
    { id: 936, question: "A characteristic feature of advanced Alzheimer's includes:", options: ["Increased motor strength", "Complete sensory loss", "Inability to recognize family", "Preserved recent memory"], correct: 2 },
    { id: 937, question: "Which structural protein contributes to Alzheimer's neurofibrillary tangles?", options: ["Tau protein", "Keratin", "Elastin", "Actin"], correct: 0 },
    { id: 938, question: "ALS most commonly spares which function?", options: ["Limb strength", "Breathing", "Cognition", "Swallowing"], correct: 2 },
    { id: 939, question: "In vascular dementia, symptoms progress in which pattern?", options: ["Continuous gradual decline", "Stepwise deterioration", "Rapid full recovery", "Only behavioral problems"], correct: 1 },
    { id: 940, question: "Lower motor neuron damage results in:", options: ["Spasticity", "Hyperreflexia", "Flaccid paralysis", "Clonus"], correct: 2 },
    { id: 941, question: "In ALS, degeneration of upper motor neurons specifically causes:", options: ["Fasciculations", "Hypotonia", "Spastic paralysis", "Loss of reflexes"], correct: 2 },
    { id: 942, question: "Which brain structure is responsible for forming new memories and is hit early in Alzheimer's?", options: ["Thalamus", "Hippocampus", "Medulla", "Cerebellum"], correct: 1 },
    { id: 943, question: "Which is TRUE regarding dementia?", options: ["It always involves motor neuron degeneration", "It is usually reversible", "It impairs executive function", "It is caused only by aging"], correct: 2 },
    { id: 944, question: "What is the purpose of anti-cholinesterase medications in Alzheimer's?", options: ["Increase dopamine breakdown", "Keep acetylcholine available longer", "Lower glutamate levels", "Reduce beta-amyloid deposits"], correct: 1 },
    { id: 945, question: "A patient shows increasing difficulty swallowing and speaking due to motor neuron loss. This indicates:", options: ["Alzheimer's", "ALS progression", "Dementia onset", "Meningitis recovery"], correct: 1 },
    { id: 946, question: "A 76-year-old man repeats questions, forgets appointments, but tells detailed childhood stories. Most likely diagnosis?", options: ["ALS", "Early Alzheimer's", "Wernicke's stroke", "Rabies"], correct: 1 },
    { id: 947, question: "A patient presents with progressive muscle weakness, intact sensation, and preserved memory. Which disorder?", options: ["ALS", "Dementia", "Alzheimer's", "Stroke"], correct: 0 },
    { id: 948, question: "A patient with dementia suddenly declines after a minor stroke. This represents:", options: ["Alzheimer's", "Vascular dementia", "ALS", "MS"], correct: 1 },
    { id: 949, question: "A 70-year-old woman cannot dress herself, wanders outside, and fails to recognize her daughter. This indicates:", options: ["Early dementia", "Advanced Alzheimer's", "Stroke recovery", "Normal aging"], correct: 1 },
    { id: 950, question: "A 65-year-old shows arm stiffness, brisk reflexes, but also visible muscle twitches. Which mechanism explains BOTH findings?", options: ["UMN + LMN degeneration", "Pure sensory loss", "Increased dopamine", "Immune-mediated demyelination"], correct: 0 }
  ],
  "5. Stress and Associated Problems": [
    { id: 501, question: "Which stage of the General Adaptation Syndrome involves catecholamine release?", options: ["Exhaustion stage", "Resistance stage", "Alarm stage", "Recovery stage"], correct: 2 },
    { id: 502, question: "Which organ is MOST responsible for initiating the stress response?", options: ["Thalamus", "Hypothalamus", "Cerebellum", "Pituitary gland"], correct: 1 },
    { id: 503, question: "Which hormone increases during the resistance stage?", options: ["Oxytocin", "Insulin", "Cortisol", "Melatonin"], correct: 2 },
    { id: 504, question: "Which of the following is NOT a significant physiological effect of the stress response?", options: ["Increased blood glucose", "Bronchodilation", "Increased inflammatory response", "Increased heart rate"], correct: 2 },
    { id: 505, question: "Prolonged vasoconstriction during stress can lead to:", options: ["Kidney failure", "Hyperthyroidism", "Increased urine output", "Muscle hypertrophy"], correct: 0 },
    { id: 506, question: "Which best describes a precipitating factor?", options: ["A factor that worsens a condition", "A factor that initially triggers stress", "A genetic mutation", "A treatment for stress"], correct: 1 },
    { id: 507, question: "Which is an example of an exacerbating factor?", options: ["Chronic eczema", "Latent herpes infection", "Emotional stress", "Vaccination"], correct: 2 },
    { id: 508, question: "What is the final possible outcome of the exhaustion stage?", options: ["Elevated cortisol", "Full recovery", "Death", "Increased glucose"], correct: 2 },
    { id: 509, question: "Which part of the nervous system is activated during the alarm stage?", options: ["Parasympathetic nervous system", "Somatic nervous system", "Sympathetic nervous system", "Enteric nervous system"], correct: 2 },
    { id: 510, question: "Which statement about stress effects is TRUE?", options: ["It decreases blood pressure", "It decreases glucose levels", "It decreases immune responses", "It decreases ventilation"], correct: 2 },
    { id: 511, question: "PTSD typically appears within:", options: ["24 hours", "1 week", "1 month", "3 months"], correct: 3 },
    { id: 512, question: "Which stress effect increases the risk of infection?", options: ["Increased glucose", "Increased ventilation", "Suppressed inflammatory response", "Bronchodilation"], correct: 2 },
    { id: 513, question: "Elevated cortisol during stress causes:", options: ["Faster wound healing", "Immunosuppression", "Hypotension", "Hypoglycemia"], correct: 1 },
    { id: 514, question: "Necrotizing periodontal disease can be triggered by:", options: ["Dehydration", "Stress-related immune suppression", "Increased saliva", "Vasodilation"], correct: 1 },
    { id: 515, question: "Which organ pair is MOST involved in stress response?", options: ["Kidney & pancreas", "Hypothalamus & adrenal glands", "Heart & liver", "Lungs & cerebellum"], correct: 1 },
    { id: 516, question: "Which organs are activated during the alarm stage of the General Adaptation Syndrome (GAS)?", options: ["Cerebellum, pancreas, kidneys", "Hypothalamus, sympathetic nervous system, adrenal glands", "Occipital lobe, bronchi, liver", "Parasympathetic system, thyroid gland, spleen"], correct: 1 },
    { id: 517, question: "Which hormones are released during acute stress in the alarm stage?", options: ["Oxytocin and ADH", "Epinephrine and norepinephrine", "Dopamine and serotonin", "Cortisol only"], correct: 1 },
    { id: 518, question: "The resistance stage of GAS is characterized by:", options: ["Exhaustion of all resources", "Immediate catecholamine release", "Elevated hormone levels such as cortisol", "Activation of parasympathetic system"], correct: 2 },
    { id: 519, question: "The exhaustion stage may lead to all EXCEPT:", options: ["Recovery", "Resolution", "Death", "Increased immune activity"], correct: 3 },
    { id: 520, question: "Which of the following is a significant physiological effect of stress mentioned in the lecture?", options: ["Bronchoconstriction", "Decreased ventilation", "Elevated glucose levels", "Decreased heart rate"], correct: 2 },
    { id: 521, question: "Stress decreases inflammatory responses primarily due to increased:", options: ["ADH", "Cortisol", "Insulin", "Histamine"], correct: 1 },
    { id: 522, question: "Prolonged vasoconstriction during stress may result in:", options: ["Kidney failure", "Hypertension relief", "Increased urine production", "Improved GI motility"], correct: 0 },
    { id: 523, question: "Which is a specific problem of chronic stress?", options: ["Chronic back pain", "Necrotizing periodontal disease", "Frequent urination", "Weight gain"], correct: 1 },
    { id: 524, question: "A precipitating factor is defined as:", options: ["A factor that worsens a disease", "A factor that initially triggers stress", "A genetic disorder", "A treatment intervention"], correct: 1 },
    { id: 525, question: "An exacerbating factor is BEST defined as:", options: ["A factor that starts a disease", "A factor that worsens an existing disease", "A bacterial infection only", "A genetic factor"], correct: 1 },
    { id: 526, question: "Autoimmune diseases that worsen under emotional stress include all EXCEPT:", options: ["Multiple sclerosis (MS)", "Systemic lupus erythematosus (SLE)", "Rheumatoid arthritis (RA)", "Diabetes insipidus"], correct: 3 },
    { id: 527, question: "Which of the following is a potential effect of prolonged severe stress?", options: ["Renal failure", "Improved immunity", "Enhanced wound healing", "Vasodilation"], correct: 0 },
    { id: 528, question: "Why does stress delay wound healing?", options: ["Decreased cortisol", "Increased catecholamine destruction", "Increased cortisol suppresses immune response", "Decreased glucose supply"], correct: 2 },
    { id: 529, question: "PTSD (Post-traumatic stress disorder) typically appears within:", options: ["1 week", "1 month", "3 months", "6 months"], correct: 2 },
    { id: 530, question: "PTSD is commonly associated with:", options: ["Brain tumors", "Soldiers exposed to warfare", "Vitamin deficiency", "Food allergies"], correct: 1 },
    { id: 531, question: "A 46-year-old man experiences a sudden stressful event. Within minutes, his heart rate increases, blood pressure rises, bronchi dilate, and glucose level spikes. Which stage of GAS is he experiencing?", options: ["Resistance stage", "Exhaustion stage", "Alarm stage", "Post-recovery stage"], correct: 2 },
    { id: 532, question: "A patient reports severe emotional stress due to family issues. Her chronic eczema suddenly worsens. This worsening is due to a(n):", options: ["Precipitating factor", "Exacerbating factor", "Compensatory factor", "Homeostatic factor"], correct: 1 },
    { id: 533, question: "A patient with long-term stress develops increased cortisol and chronic vasoconstriction. She now presents with reduced kidney function. Which mechanism explains her renal failure?", options: ["Decreased immune response", "Poor blood supply to the kidneys", "Increased neural activity", "Elevated body temperature"], correct: 1 },
    { id: 534, question: "A soldier develops recurring nightmares, anxiety, and difficulty concentrating 2 months after returning from combat. What condition does this most likely represent?", options: ["Acute stress", "PTSD", "Panic disorder", "Bipolar disorder"], correct: 1 },
    { id: 535, question: "A patient is under long-term stress and notes that her wounds take longer to heal after surgery. Which physiological change explains this?", options: ["Increased histamine", "Increased parasympathetic activity", "Increased cortisol suppressing inflammation", "Decreased catecholamine release"], correct: 2 },
    { id: 536, question: "The first stage of the stress response (GAS) that activates the hypothalamus, sympathetic nervous system, and adrenal glands is:", options: ["Resistance stage", "Exhaustion stage", "Alarm stage", "Recovery stage"], correct: 2 },
    { id: 537, question: "During the alarm stage, the adrenal glands release which hormones?", options: ["Insulin and cortisol", "Epinephrine and norepinephrine", "ADH and oxytocin", "Thyroxine and calcitonin"], correct: 1 },
    { id: 538, question: "The resistance stage of GAS is characterized by:", options: ["Immediate catecholamine release", "Elevated hormone levels that keep the body functioning at high performance", "Body collapse", "No hormonal involvement"], correct: 1 },
    { id: 539, question: "The exhaustion stage can result in:", options: ["Complete recovery only", "Resolution or death", "Increased immune function", "Hyperinflammation"], correct: 1 },
    { id: 540, question: "Which is a MAJOR physiological effect of stress?", options: ["Low glucose", "Low heart rate", "Bronchodilation to increase oxygen", "Immune system overactivation"], correct: 2 },
    { id: 541, question: "Stress increases blood glucose levels primarily because:", options: ["Cortisol raises glucose for energy", "The kidneys release insulin", "The liver shuts down", "Catecholamines reduce glucose"], correct: 0 },
    { id: 542, question: "Chronic vasoconstriction due to stress may lead to:", options: ["Enhanced kidney filtration", "Renal failure", "Increased urine output", "Decreased blood pressure"], correct: 1 },
    { id: 543, question: "Necrotizing periodontal disease is associated with:", options: ["Low stress levels", "Chronic high stress", "Vitamin deficiency", "Allergic reactions"], correct: 1 },
    { id: 544, question: "A precipitating factor is BEST described as:", options: ["Something that worsens a condition", "Something that initially triggers the stress or disease", "A treatment", "A genetic mutation"], correct: 1 },
    { id: 545, question: "An exacerbating factor refers to:", options: ["A trigger of the disease", "Something that makes an existing condition worse", "A bacterial infection", "A type of treatment"], correct: 1 },
    { id: 546, question: "Emotional distress worsening eczema or lupus is an example of:", options: ["Precipitating factor", "Exacerbating factor", "Compensatory mechanism", "Homeostasis"], correct: 1 },
    { id: 547, question: "Which autoimmune disorders were specifically listed as worsened by stress?", options: ["Eczema, UC, MS, SLE, RA", "Diabetes type 1 only", "Thyroid disorders only", "Asthma only"], correct: 0 },
    { id: 548, question: "Severe or prolonged stress can lead to delayed wound healing because:", options: ["Cortisol suppresses inflammation", "Cortisol increases blood flow", "Low epinephrine enhances healing", "Bronchodilation slows healing"], correct: 0 },
    { id: 549, question: "A soldier develops nightmares and anxiety 3 months after a traumatic event. This is:", options: ["Acute stress", "PTSD", "Panic disorder", "Seasonal depression"], correct: 1 },
    { id: 550, question: "PTSD most commonly occurs in:", options: ["Children with eczema", "Soldiers after traumatic events", "Infants exposed to infection", "People with allergies"], correct: 1 },
    { id: 551, question: "A patient suddenly encounters a threatening situation. Within seconds, her HR rises, BP rises, bronchi dilate, glucose increases. Which stage is this?", options: ["Exhaustion", "Alarm", "Resistance", "Recovery"], correct: 1 },
    { id: 552, question: "A patient with known chronic eczema experiences severe emotional stress and the eczema worsens. This is due to:", options: ["Precipitating factor", "Exacerbating factor", "Homeostasis", "GAS resistance stage"], correct: 1 },
    { id: 553, question: "A person under long-term stress shows decreased immune response and delayed wound healing. Which hormone is responsible?", options: ["Dopamine", "Cortisol", "Insulin", "Aldosterone"], correct: 1 },
    { id: 554, question: "A patient under prolonged vasoconstriction due to stress now has poor kidney function. The cause is:", options: ["High glucose levels", "Reduced renal blood flow", "High immune activity", "Increased ADH"], correct: 1 },
    { id: 555, question: "A man experiences severe stress and later develops increased risk of infections and slow recovery from surgery. Which GAS stage is he likely entering?", options: ["Alarm", "Resistance", "Exhaustion", "Adaptation"], correct: 2 },
    { id: 556, question: "A 22-year-old student is writing multiple exams this week. Her body keeps blood pressure, temperature, and blood glucose within a normal range despite mild stress. This balance is called:", options: ["Compensation", "Homeostasis", "Exhaustion", "Adaptation syndrome"], correct: 1 },
    { id: 557, question: "A 45-year-old man has been under severe work stress for months. Recently, chronic eczema and a recurrent cold sore (HSV) flare up. This shows which effect of prolonged stress?", options: ["Improved tissue repair", "Increased wear and tear of tissues", "Decreased susceptibility to infection", "Enhanced immune system"], correct: 1 },
    { id: 558, question: "A sudden car accident almost happens in front of a woman. Her heart rate and blood pressure increase immediately, breathing becomes faster, and she feels very alert. Which stage of General Adaptation Syndrome (GAS) is this?", options: ["Alarm stage", "Resistance stage", "Exhaustion stage", "Recovery stage"], correct: 0 },
    { id: 559, question: "In the alarm stage, which of the following is NOT a key structure involved?", options: ["Hypothalamus", "Sympathetic nervous system", "Adrenal medulla", "Pancreatic beta cells"], correct: 3 },
    { id: 560, question: "A nurse is working on night shifts for several weeks. Her body keeps functioning \"okay\" with high hormone levels, but she feels constantly wired. This stage of GAS is:", options: ["Alarm", "Resistance", "Exhaustion", "Recovery"], correct: 1 },
    { id: 561, question: "A caregiver has been under intense stress for years caring for a sick family member. Suddenly she develops severe illness, weight loss, and cannot cope anymore. Which stage is this?", options: ["Alarm", "Resistance", "Exhaustion", "Recovery"], correct: 2 },
    { id: 562, question: "A patient under acute stress shows: Increased blood pressure, Increased heart rate. Which category of stress effect is this?", options: ["Bronchodilation", "CNS stimulation", "Cardiovascular activation", "Anti-inflammatory effect"], correct: 2 },
    { id: 563, question: "A woman with stage fright has rapid breathing and feels she can take in more air before a speech. Which effect of stress is this?", options: ["Bronchodilation & increased ventilation", "Reduced metabolism", "Immune suppression", "Decreased blood glucose"], correct: 0 },
    { id: 564, question: "A man under stress for an exam has increased blood glucose levels even though he didn't eat recently. This is due to:", options: ["Increased insulin secretion", "Decreased cortisol", "Increased gluconeogenesis and glycogen breakdown", "Increased antibody production"], correct: 2 },
    { id: 565, question: "During acute stress, which combination is correct?", options: ["CNS stimulation & increased inflammatory response", "CNS stimulation & decreased inflammatory response", "CNS inhibition & increased inflammatory response", "CNS inhibition & decreased inflammatory response"], correct: 1 },
    { id: 566, question: "A student under stress before exams develops: Tension headaches, Aphthous ulcers in the mouth, Necrotizing periodontal disease. These are:", options: ["Systemic effects of infection", "Specific problems caused by stress", "Genetic disorders", "Autoimmune diseases"], correct: 1 },
    { id: 567, question: "A 55-year-old hypertensive man under chronic stress develops decreased kidney function due to reduced blood supply. Which stress-related mechanism explains this?", options: ["Persistent vasodilation", "Prolonged vasoconstriction", "Decreased catecholamines", "Increased inflammatory response"], correct: 1 },
    { id: 568, question: "A patient in ICU under severe physical and emotional stress develops a bleeding gastric ulcer. The main contributing factors are:", options: ["High WBC count and fever", "Prolonged vasoconstriction and decreased mucosal regeneration", "Hyperventilation and respiratory alkalosis", "Allergy-mediated histamine release"], correct: 1 },
    { id: 569, question: "A woman after a major disaster develops frequent respiratory infections. Lab shows high cortisol. Why does stress increase her infection risk?", options: ["Cortisol increases WBC activity", "Cortisol suppresses immune response", "Catecholamines directly kill WBCs", "Stress antibodies block T cells"], correct: 1 },
    { id: 570, question: "A postoperative patient is under high stress and anxiety. His surgical wound is healing slowly. Most likely cause?", options: ["Increased blood flow and RBCs", "Decreased protein synthesis and cell proliferation", "Increased mitosis in fibroblasts", "Excessive inflammation"], correct: 1 },
    { id: 571, question: "A woman has chronic asthma. She is stable most of the time, but during exam week her asthma attacks become frequent. In this scenario, stress is best described as:", options: ["Only a precipitating factor", "Only an exacerbating factor", "Both a precipitating and exacerbating factor", "Neither"], correct: 2 },
    { id: 572, question: "Which is the BEST example of a precipitating factor for a stress-related problem?", options: ["Chronic asthma already diagnosed", "Latent herpes infection (cold sores) becoming active during exams", "Long-standing rheumatoid arthritis", "Normal immune function"], correct: 1 },
    { id: 573, question: "A patient with multiple sclerosis (MS) reports that symptoms always worsen during periods of family conflict. Here, stress acts mainly as:", options: ["Precipitating factor", "Exacerbating factor", "Protective factor", "Infectious agent"], correct: 1 },
    { id: 574, question: "A soldier returns from war. Months later, he has nightmares, flashbacks, anxiety, and avoids reminders of the event. He also drinks heavily. This condition is:", options: ["Acute stress response", "General adaptation syndrome", "Post-traumatic stress disorder (PTSD)", "Simple anxiety disorder"], correct: 2 },
    { id: 575, question: "According to the lecture, PTSD usually appears:", options: ["Immediately after the event", "Within a few hours", "Within about 3 months of the event", "After 10 years only"], correct: 2 },
    { id: 576, question: "A stressed student wants to cope in a healthy way. Which is a recommended strategy from the lecture?", options: ["Heavy drinking", "Regular moderate exercise", "Ignoring sleep and studying all night", "Taking anxiolytic drugs without prescription"], correct: 1 },
    { id: 577, question: "A busy nurse under stress decides to sleep only 3 hours a night and lives on coffee and chips. This behavior will:", options: ["Improve coping with stress", "Worsen stress and health", "Have no effect", "Guarantee no PTSD"], correct: 1 },
    { id: 578, question: "Which statement about anti-anxiety medications as a coping method is MOST accurate according to the lecture?", options: ["They are the first and best solution for any stress", "They should be avoided completely", "They can be used, but not regularly and not as the only coping strategy", "They cure the cause of stress"], correct: 2 },
    { id: 579, question: "A patient with ulcerative colitis experiences a flare of bloody diarrhea right after a major work deadline. This illustrates stress as:", options: ["Viral infection", "Exacerbating factor in chronic inflammatory disease", "Only a precipitating factor", "Direct bacterial cause"], correct: 1 },
    { id: 580, question: "A critically ill man under long-term severe stress develops renal failure. The main mechanism is:", options: ["Chronic hyperglycemia only", "Prolonged vasodilation of renal arteries", "Prolonged vasoconstriction → decreased renal blood flow", "Excess immune activation"], correct: 2 },
    { id: 581, question: "A woman had surgery and is also experiencing severe emotional stress. Her incision becomes infected and healing is delayed. Which two stress effects contribute MOST?", options: ["Increased inflammation & increased immunity", "Decreased immune response & decreased inflammatory response", "Increased WBC activity & increased antibody production", "Increased sleep & rest"], correct: 1 },
    { id: 582, question: "Which patient is at the highest risk for developing a stress-related ulcer?", options: ["Healthy teenager with mild exam stress", "ICU patient on ventilator with severe burns and trauma", "Middle-aged runner after a 5 km race", "Elderly patient walking daily and eating well"], correct: 1 },
    { id: 583, question: "A stressed dental hygiene student has: Tension headache, Mouth ulcers, Necrotizing gingivitis. These are best classified as:", options: ["General systemic effects", "Specific stress-related problems", "GAS stages", "Immune deficiency disorders"], correct: 1 },
    { id: 584, question: "A small amount of stress before a presentation helps a student stay alert and focused. It does not damage health. This is best described as:", options: ["Distress only", "Eustress (positive stress)", "Exhaustion stage", "PTSD"], correct: 1 },
    { id: 585, question: "A 60-year-old man has: Long-term work stress, Hypertension, Uses alcohol to cope. Now he develops: Mild renal failure, Recurrent infections, Delayed healing after minor injuries, Poor sleep and irritability. Which combination BEST explains his condition based on Lesson 5?", options: ["Acute alarm reaction with increased immunity", "Chronic stress → prolonged vasoconstriction, high cortisol, CNS stimulation", "Short-term stress → only beneficial effects", "Infection causing stress"], correct: 1 },
    { id: 586, question: "Roughly what percentage of doctor's office visits are directly or indirectly related to stress?", options: ["5–10%", "20–30%", "40–50%", "75–90%"], correct: 3 },
    { id: 587, question: "Homeostasis is best defined as:", options: ["The body's response only to severe injury", "The body's compensation to minor changes to keep the internal environment stable", "The body's tendency to always increase blood pressure", "The body's immune response to infection"], correct: 1 },
    { id: 588, question: "Long-term severe stress can cause all of the following EXCEPT:", options: ["Increased wear and tear on tissues", "Exhaustion of energy resources", "Improvement of chronic infections", "Exacerbation of chronic conditions such as eczema"], correct: 2 },
    { id: 589, question: "The stress syndrome \"GAS – General Adaptation Syndrome\" has how many stages?", options: ["2", "3", "4", "5"], correct: 1 },
    { id: 590, question: "In the alarm stage of GAS, which structures are primarily involved?", options: ["Cerebellum and pancreas", "Hypothalamus, sympathetic nervous system, adrenal glands", "Spinal cord and pituitary only", "Liver and kidneys"], correct: 1 },
    { id: 591, question: "Which hormone group is mainly secreted from the adrenal gland during the ALARM stage?", options: ["Thyroid hormones", "Catecholamines (epinephrine, norepinephrine)", "Insulin only", "Sex hormones"], correct: 1 },
    { id: 592, question: "The resistance stage of GAS is characterized by:", options: ["No hormonal change", "Decreased hormonal levels", "Elevated hormonal levels to operate at peak performance", "Complete shutdown of the endocrine system"], correct: 2 },
    { id: 593, question: "Which is NOT a possible outcome of the final stage of GAS?", options: ["Resolution and recovery", "Death due to prolonged stress", "Immediate tissue regeneration", "Exhaustion of resources"], correct: 2 },
    { id: 594, question: "Which of the following is NOT one of the 5 significant effects of the stress response?", options: ["Increased blood pressure and heart rate", "Bronchodilation and increased ventilation", "Increased blood glucose level", "Increased inflammatory response"], correct: 3 },
    { id: 595, question: "Decreased inflammatory response during stress can lead to:", options: ["Faster wound healing", "Slower healing and more infections after trauma/surgery", "No change in immunity", "Immediate recovery from chronic disease"], correct: 1 },
    { id: 596, question: "Which of the following can be a specific problem during the stress response?", options: ["Improved oral health", "Necrotizing periodontal disease", "Increased salivary flow", "Hyper-regeneration of tissues"], correct: 1 },
    { id: 597, question: "Prolonged vasoconstriction due to stress can lead to:", options: ["Increased blood flow to all organs", "Decreased blood flow and impaired organ function", "Only changes in skin color but no organ effect", "Increased urine production only"], correct: 1 },
    { id: 598, question: "Which statement about precipitating factor is correct?", options: ["It worsens an already existing disease only", "It is a factor that initially triggers stress or disease", "It is always an emotional factor", "It is the same as exacerbating factor"], correct: 1 },
    { id: 599, question: "Which is an example of an exacerbating factor for stress-related disease?", options: ["Latent viral infection", "Genetic mutation", "Physical or emotional distress", "Congenital malformation"], correct: 2 },
    { id: 600, question: "Which chronic conditions are worsened by stress? (Choose the BEST combination.)", options: ["Diabetes only", "Asthma and common cold only", "Multiple sclerosis, rheumatoid arthritis, systemic lupus erythematosus, eczema, ulcerative colitis", "Migraine only"], correct: 2 },
    { id: 601, question: "Which is a possible effect of prolonged or severe stress mentioned in the lecture?", options: ["Renal failure", "Improved kidney function", "Increased bone density", "Hyper-immunity"], correct: 0 },
    { id: 602, question: "Which of the following best describes PTSD (Post-Traumatic Stress Disorder) as explained?", options: ["It develops only in children", "It is a common consequence of major disasters or personal threats", "It appears immediately within 24 hours of trauma", "It is rarely seen in soldiers"], correct: 1 },
    { id: 603, question: "PTSD is associated with:", options: ["Very low risk of substance dependence", "High risk of developing dependence on alcohol or drugs", "Only physical symptoms without psychological ones", "Only temporary mild stress"], correct: 1 },
    { id: 604, question: "Which of the following was mentioned as a healthy way to cope with stress?", options: ["Completely ignoring problems", "Adequate rest and healthy diet", "Taking any medication randomly", "Isolating yourself from everyone"], correct: 1 },
    { id: 605, question: "Which of the following is TRUE regarding anti-anxiety medications?", options: ["They should always be taken regularly without concern", "They are the first and only way to cope", "They can help but should not be taken regularly if possible", "They completely cure stress"], correct: 2 },
    { id: 606, question: "A 23-year-old student hears suddenly that she has to take a surprise exam. Her heart rate and blood pressure increase, she starts to sweat, and her pupils dilate. Which stage of GAS is she most likely in?", options: ["No stage – this is not stress", "Alarm stage", "Resistance stage", "Final (exhaustion) stage"], correct: 1 },
    { id: 607, question: "A nurse has been working in an ICU under high stress for months. Her hormones (cortisol, catecholamines) have been elevated for a long time and she still functions at high performance, but feels tired. Which stage of GAS is this?", options: ["Alarm", "Resistance", "Final exhaustion", "Recovery"], correct: 1 },
    { id: 608, question: "An elderly man has been under extreme stress for years. He now has severe weight loss, fatigue, frequent infections, and his organs begin to fail. Which GAS stage best fits this description?", options: ["Alarm", "Resistance", "Final stage (exhaustion)", "Recovery"], correct: 2 },
    { id: 609, question: "A patient under prolonged stress shows signs of decreased kidney function due to reduced blood flow to the kidneys. Which mechanism is most directly responsible?", options: ["Bronchodilation", "Prolonged vasoconstriction", "Increased inflammatory response", "Increased saliva production"], correct: 1 },
    { id: 610, question: "After major surgery, a woman has been under extreme emotional stress. Her wound is healing very slowly and she develops an infection. Which stress effect best explains this?", options: ["Increased immune response", "Decreased inflammatory and immune response", "Decreased blood glucose", "Bronchoconstriction"], correct: 1 },
    { id: 611, question: "A man has had a latent hepatitis infection for years without symptoms. After a very stressful event, his hepatitis becomes active and symptomatic. The latent infection in this story is best described as:", options: ["Exacerbating factor", "Precipitating factor", "Coping mechanism", "Recovery factor"], correct: 1 },
    { id: 612, question: "A woman with known rheumatoid arthritis experiences a major emotional shock, after which her joint pain suddenly gets much worse. The emotional shock is:", options: ["Precipitating factor", "Exacerbating factor", "Protective factor", "Immune deficiency"], correct: 1 },
    { id: 613, question: "A soldier returns from war. Three months after coming home, he has nightmares, flashbacks, anxiety, and starts drinking heavily. What condition best fits this description?", options: ["Acute stress response", "PTSD", "Generalized anxiety only", "Dementia"], correct: 1 },
    { id: 614, question: "A student under constant stress decides to: Sleep 7–8 hours regularly, Eat balanced meals, Do 30 minutes of moderate exercise daily, Attend counselling once a week. These behaviors are best described as:", options: ["Precipitating factors", "Exacerbating factors", "Healthy coping strategies", "Symptoms of PTSD"], correct: 2 },
    { id: 615, question: "A chronic eczema patient is stable for months. Then she starts a very stressful new job, and her eczema suddenly flares up. Which statement is MOST accurate?", options: ["Stress is the precipitating factor and eczema is the exacerbating factor", "Eczema is the precipitating factor and stress is the exacerbating factor", "Both are precipitating factors", "Neither is related"], correct: 1 }
  ],
  "6. Blood and Circulatory System Disorders": [
    { id: 601, question: "Which component makes up 55% of total blood volume?", options: ["Hematocrit", "RBCs", "Plasma", "Platelets"], correct: 2 },
    { id: 602, question: "The hematocrit is composed primarily of:", options: ["WBCs", "Plasma proteins", "RBCs", "Platelets"], correct: 2 },
    { id: 603, question: "Which blood vessel type is the ONLY site of gas and nutrient exchange?", options: ["Arteries", "Veins", "Arterioles", "Capillaries"], correct: 3 },
    { id: 604, question: "The buffy coat contains:", options: ["Only RBCs", "WBCs and platelets", "Albumin and globulins", "Fibrinogen"], correct: 1 },
    { id: 605, question: "Which hormone stimulates RBC production?", options: ["Aldosterone", "Insulin", "Erythropoietin", "ADH"], correct: 2 },
    { id: 606, question: "Plasma differs from serum because plasma contains:", options: ["Electrolytes", "Antibodies", "Clotting factors", "RBCs"], correct: 2 },
    { id: 607, question: "Which plasma protein maintains osmotic pressure?", options: ["Globulin", "Albumin", "Fibrinogen", "Myoglobin"], correct: 1 },
    { id: 608, question: "CO₂ binds to which part of hemoglobin?", options: ["Heme", "Iron", "Globin", "Bilirubin"], correct: 2 },
    { id: 609, question: "Before reaching the liver, bilirubin is:", options: ["Conjugated", "Water-soluble", "Bound to glucuronic acid", "Unconjugated"], correct: 3 },
    { id: 610, question: "Hemochromatosis involves excessive accumulation of:", options: ["Albumin", "Fibrinogen", "Hemosiderin", "Lymphocytes"], correct: 2 },
    { id: 611, question: "Why do RBCs lose their nucleus during maturation?", options: ["To increase division rate", "To enlarge the mitochondria", "To allow more hemoglobin storage", "To increase membrane rigidity"], correct: 2 },
    { id: 612, question: "Which part of the cardiovascular system comes immediately before capillaries?", options: ["Veins", "Arterioles", "Venules", "Atria"], correct: 1 },
    { id: 613, question: "Which individual is expected to have the highest hematocrit?", options: ["Adult female", "Adult male", "Child", "Elderly patient"], correct: 1 },
    { id: 614, question: "Which plasma protein is essential for clot formation?", options: ["Albumin", "Globulins", "Fibrinogen", "Prothrombin only"], correct: 2 },
    { id: 615, question: "Why does serum appear more yellow than plasma?", options: ["Contains more bilirubin", "Contains no clotting factors", "Contains more RBC fragments", "Has lower water content"], correct: 1 },
    { id: 616, question: "A patient's blood sample shows: Normal plasma, Very thin buffy coat, Very high hematocrit. Which condition is MOST likely?", options: ["Leukemia", "Severe dehydration", "Polycythemia (↑RBC count)", "Viral infection"], correct: 2 },
    { id: 617, question: "A patient has a genetic mutation causing massive iron accumulation in the liver. What is the MOST likely cause?", options: ["Low EPO production", "Hemochromatosis", "Iron-deficiency anemia", "Increased albumin synthesis"], correct: 1 },
    { id: 618, question: "A newborn develops jaundice due to an inability to conjugate bilirubin. Which step is impaired?", options: ["Bilirubin transport", "Glucuronic acid binding", "Hemoglobin breakdown", "RBC production"], correct: 1 },
    { id: 619, question: "A patient's blood sample forms a clot. The remaining fluid is:", options: ["Plasma", "Serum", "Hematocrit", "Buffy coat"], correct: 1 },
    { id: 620, question: "A male patient has a hematocrit of 53%. Which statement is TRUE?", options: ["This is normal for males", "This is dangerously low", "Plasma volume is too high", "Platelet count is elevated"], correct: 0 },
    { id: 621, question: "A scientist examines a biconcave cell without a nucleus. What is its primary function?", options: ["Fight infection", "Initiate clotting", "Carry oxygen and carbon dioxide", "Produce antibodies"], correct: 2 },
    { id: 622, question: "A patient has low albumin. What symptom is most likely?", options: ["Hypertension", "Edema", "Polycythemia", "Excessive clotting"], correct: 1 },
    { id: 623, question: "Which condition increases the amount of carbaminohemoglobin?", options: ["Excess oxygenation", "Increased tissue CO₂", "High albumin", "High bilirubin"], correct: 1 },
    { id: 624, question: "Which statement about RBCs is TRUE?", options: ["They divide frequently", "They contain mitochondria", "They rely on anaerobic metabolism", "They have a short lifespan because they are nucleated"], correct: 2 },
    { id: 625, question: "Which of the following is a function shared by WBCs and plasma?", options: ["Clot formation", "Maintaining osmotic pressure", "Immune protection", "Oxygen transport"], correct: 2 },
    { id: 626, question: "What percentage of blood is composed of plasma?", options: ["10%", "45%", "55%", "90%"], correct: 2 },
    { id: 627, question: "The cellular portion (hematocrit) makes up what percentage of blood?", options: ["10%", "45%", "55%", "99%"], correct: 1 },
    { id: 628, question: "Which component forms the buffy coat?", options: ["Only RBCs", "WBCs and platelets", "Plasma proteins", "Albumin and globulin"], correct: 1 },
    { id: 629, question: "The plasma protein essential for clotting is:", options: ["Albumin", "Globulins", "Fibrinogen", "Hemoglobin"], correct: 2 },
    { id: 630, question: "Which hormone stimulates RBC production?", options: ["ACTH", "Erythropoietin", "Aldosterone", "ADH"], correct: 1 },
    { id: 631, question: "RBCs lose their nucleus to:", options: ["Prevent infection", "Increase hemoglobin storage space", "Divide faster", "Increase ATP production"], correct: 1 },
    { id: 632, question: "Which is the MOST abundant blood cell?", options: ["Neutrophils", "Platelets", "RBCs", "Lymphocytes"], correct: 2 },
    { id: 633, question: "Which structure is the ONLY site of nutrient & gas exchange?", options: ["Arteries", "Arterioles", "Capillaries", "Veins"], correct: 2 },
    { id: 634, question: "Plasma differs from serum because plasma contains:", options: ["More bilirubin", "Clotting factors", "More RBCs", "Globin"], correct: 1 },
    { id: 635, question: "Which protein maintains osmotic pressure of blood?", options: ["Globulins", "Fibrinogen", "Albumin", "Myosin"], correct: 2 },
    { id: 636, question: "Hemoglobin binds oxygen via the ______ portion and CO₂ via the ______ portion.", options: ["Globin / heme", "Heme / globin", "Iron / bilirubin", "Bilirubin / heme"], correct: 1 },
    { id: 637, question: "Before reaching the liver, bilirubin is in which form?", options: ["Conjugated", "Water-soluble", "Bound to glucuronic acid", "Unconjugated"], correct: 3 },
    { id: 638, question: "Conjugation of bilirubin occurs where?", options: ["Bone marrow", "Spleen", "Liver", "Kidneys"], correct: 2 },
    { id: 639, question: "Excess iron stored in tissues forms:", options: ["Albumin", "Fibrin", "Hemosiderin", "Myoglobin"], correct: 2 },
    { id: 640, question: "A genetic disease with massive iron storage in the liver is:", options: ["Hemophilia", "Hemochromatosis", "Leukocytosis", "Polycythemia"], correct: 1 },
    { id: 641, question: "A man has a hematocrit of 52%. Based on the lecture, this finding is:", options: ["Normal for males", "Dangerously low", "Due to low testosterone", "Evidence of infection"], correct: 0 },
    { id: 642, question: "A patient's blood sample clots, and fluid remains. What is the fluid?", options: ["Plasma", "Serum", "Bilirubin", "Hematocrit"], correct: 1 },
    { id: 643, question: "A newborn has high unconjugated bilirubin. The impaired step is:", options: ["Breakdown of hemoglobin", "Binding to albumin", "Conjugation with glucuronic acid in liver", "RBC production"], correct: 2 },
    { id: 644, question: "A patient with bone marrow suppression has decreased ALL formed elements. Which component drops?", options: ["Plasma", "Serum", "RBC, WBC, and platelets", "Only RBCs"], correct: 2 },
    { id: 645, question: "A patient shows extremely thin buffy coat. What is most likely?", options: ["Leukemia", "Low WBC count", "High hematocrit", "High albumin"], correct: 1 },
    { id: 646, question: "Which best explains why plasma is less yellow than serum?", options: ["Serum has more bilirubin", "Serum lacks clotting factors", "Plasma contains fewer proteins", "Plasma has fewer electrolytes"], correct: 0 },
    { id: 647, question: "Which component increases during dehydration?", options: ["Plasma volume", "Hematocrit", "Serum bilirubin", "Platelet size"], correct: 1 },
    { id: 648, question: "Carbaminohemoglobin increases when:", options: ["CO₂ level rises in tissues", "O₂ saturation increases", "Albumin rises", "Bilirubin rises"], correct: 0 },
    { id: 649, question: "Which best describes hematopoiesis?", options: ["Breakdown of hemoglobin", "Production of all blood cells from a stem cell", "Formation of antibodies", "Process of clotting"], correct: 1 },
    { id: 650, question: "Which is TRUE regarding RBC lifespan and structure?", options: ["They divide rapidly", "They rely on aerobic ATP production", "They lack a nucleus after maturation", "They store clotting factors"], correct: 2 },
    { id: 651, question: "Which component makes up 55% of total blood volume?", options: ["RBCs", "WBCs", "Plasma", "Serum"], correct: 2 },
    { id: 652, question: "The buffy coat contains:", options: ["Only RBCs", "WBCs and platelets", "Plasma proteins", "Hemoglobin"], correct: 1 },
    { id: 653, question: "Plasma contains clotting factors, but serum does not because:", options: ["Serum is dehydrated", "Clotting factors precipitate at the bottom", "Serum contains more water", "Serum contains more protein"], correct: 1 },
    { id: 654, question: "The protein responsible for maintaining osmotic pressure in blood is:", options: ["Globulin", "Albumin", "Hemoglobin", "Bilirubin"], correct: 1 },
    { id: 655, question: "Which plasma protein is essential for blood clotting?", options: ["Actin", "Fibrinogen", "Albumin", "Globulin"], correct: 1 },
    { id: 656, question: "RBCs lose their nucleus after maturation to:", options: ["Divide faster", "Prevent mutation", "Increase space for hemoglobin", "Produce more ATP"], correct: 2 },
    { id: 657, question: "Which hormone stimulates the bone marrow to produce RBCs?", options: ["Insulin", "Erythropoietin", "ACTH", "Cortisol"], correct: 1 },
    { id: 658, question: "Hemoglobin binds oxygen to the ___ portion and carbon dioxide to the ___ portion.", options: ["Heme / globin", "Globin / heme", "Iron / albumin", "Bilirubin / heme"], correct: 0 },
    { id: 659, question: "A combination of oxygen + hemoglobin is called:", options: ["Carbaminohemoglobin", "Deoxyhemoglobin", "Oxyhemoglobin", "Ferritin"], correct: 2 },
    { id: 660, question: "Excess iron stored in tissues forms:", options: ["Albumin", "Hemosiderin", "Fibrin", "Bilirubin"], correct: 1 },
    { id: 661, question: "A person has extremely high serum ferritin due to a genetic issue. What is the condition?", options: ["Hemophilia", "Hemochromatosis", "Leukocytosis", "Hypochromic anemia"], correct: 1 },
    { id: 662, question: "Before the liver processes bilirubin, it is in the form of:", options: ["Conjugated bilirubin", "Bound bilirubin", "Unconjugated bilirubin", "Bile-salt bilirubin"], correct: 2 },
    { id: 663, question: "Conjugation of bilirubin occurs when it binds to:", options: ["Hemoglobin", "Glucuronic acid", "Ferritin", "Globulin"], correct: 1 },
    { id: 664, question: "The ONLY site of nutrient, oxygen, and waste exchange is:", options: ["Arteries", "Arterioles", "Capillaries", "Venules"], correct: 2 },
    { id: 665, question: "Which blood vessel order is correct (from heart → return)?", options: ["Artery → venule → capillary → vein", "Vein → capillary → artery → venule", "Artery → arteriole → capillary → venule → vein", "Capillary → artery → vein"], correct: 2 },
    { id: 666, question: "Hematocrit is approximately 5–10% higher in males due to:", options: ["High estrogen", "Higher platelet count", "Testosterone stimulating marrow", "Larger plasma volume"], correct: 2 },
    { id: 667, question: "Which part of blood carries both oxygen and CO₂?", options: ["Platelets", "Hemoglobin in RBCs", "Plasma proteins", "WBCs"], correct: 1 },
    { id: 668, question: "Which part of blood contributes MOST to immune defense?", options: ["Platelets", "WBCs (leukocytes)", "RBCs", "Serum"], correct: 1 },
    { id: 669, question: "Which part of blood is MOST responsible for preventing blood loss?", options: ["WBCs", "Platelets", "RBCs", "Plasma water"], correct: 1 },
    { id: 670, question: "Which statement best describes hematopoiesis?", options: ["Production of all blood cells from bone marrow", "Breakdown of hemoglobin in spleen", "Conversion of bilirubin", "Production of serum proteins"], correct: 0 },
    { id: 671, question: "In an average adult, the total blood volume is approximately:", options: ["1 liter", "3 liters", "5 liters", "10 liters"], correct: 2 },
    { id: 672, question: "Which statement about the composition of blood is MOST accurate?", options: ["Plasma is about 90% of blood volume", "Formed elements (cells) make up about 45% of blood volume", "Red blood cells represent less than 10% of hematocrit", "Plasma does not contain any proteins"], correct: 1 },
    { id: 673, question: "Hematocrit refers to:", options: ["The percentage of plasma in blood", "The percentage of blood volume occupied by red blood cells", "The number of white blood cells per mm³", "The concentration of clotting factors"], correct: 1 },
    { id: 674, question: "Compared with females, hematocrit in males is:", options: ["5–10% higher", "5–10% lower", "Exactly the same", "Not related to hormones"], correct: 0 },
    { id: 675, question: "Which statement best describes the difference between plasma and serum?", options: ["Plasma has no proteins; serum is rich in proteins", "Plasma contains clotting factors; serum does not", "Serum contains clotting factors; plasma does not", "They are identical"], correct: 1 },
    { id: 676, question: "Which plasma protein is primarily responsible for maintaining osmotic pressure of the blood?", options: ["Globulins", "Fibrinogen", "Albumin", "Hemoglobin"], correct: 2 },
    { id: 677, question: "Gas and nutrient exchange between blood and tissues occurs mainly at the level of:", options: ["Arteries", "Arterioles", "Capillaries", "Veins"], correct: 2 },
    { id: 678, question: "Which of the following correctly lists the major blood vessels in order from the heart to the tissues and back?", options: ["Vein → venule → capillary → arteriole → artery", "Artery → arteriole → capillary → venule → vein", "Capillary → artery → venule → arteriole → vein", "Arteriole → artery → capillary → vein → venule"], correct: 1 },
    { id: 679, question: "Which blood cell type is the most abundant in blood?", options: ["Leukocytes", "Thrombocytes (platelets)", "Erythrocytes", "All are equal"], correct: 2 },
    { id: 680, question: "Leukocytes (white blood cells) are developed from stem cells in the bone marrow through a process called:", options: ["Erythropoiesis", "Leukopoiesis", "Thrombopoiesis", "Fibrinolysis"], correct: 1 },
    { id: 681, question: "The unique ability of some leukocytes to leave the bloodstream and enter tissues is called:", options: ["Phagocytosis", "Diapedesis", "Fibrinolysis", "Hemostasis"], correct: 1 },
    { id: 682, question: "Which TWO leukocytes are specifically mentioned as being able to perform diapedesis (exit the bloodstream and go to tissues)?", options: ["Neutrophils and eosinophils", "Basophils and monocytes", "Lymphocytes and monocytes", "Eosinophils and lymphocytes"], correct: 1 },
    { id: 683, question: "Which of the following is a granulocyte?", options: ["Lymphocyte", "Monocyte", "Neutrophil", "Macrophage"], correct: 2 },
    { id: 684, question: "Which leukocyte is most important in allergic reactions and parasitic infections?", options: ["Neutrophils", "Eosinophils", "Basophils", "Lymphocytes"], correct: 1 },
    { id: 685, question: "Which leukocytes release histamine and heparin and are involved in inflammation?", options: ["Neutrophils", "Eosinophils", "Basophils", "Lymphocytes"], correct: 2 },
    { id: 686, question: "Which cells are mainly responsible for cell-mediated and humoral immunity?", options: ["Neutrophils", "Eosinophils", "Lymphocytes", "Basophils"], correct: 2 },
    { id: 687, question: "Monocytes that exit the bloodstream and enter tissues differentiate into:", options: ["Neutrophils", "Platelets", "Macrophages", "Basophils"], correct: 2 },
    { id: 688, question: "Thrombocytes (platelets) are:", options: ["Nucleated cells involved in oxygen transport", "Non-nucleated cell fragments essential for hemostasis", "Immune cells that produce antibodies", "Large nucleated cells that live for months"], correct: 1 },
    { id: 689, question: "Hemostasis refers to:", options: ["Maintenance of stable internal environment", "Regulation of blood glucose", "Stopping bleeding and forming a blood clot", "Destruction of pathogens"], correct: 2 },
    { id: 690, question: "Which is the correct sequence of steps in blood clot formation?", options: ["Platelet plug → vasoconstriction → coagulation", "Coagulation → platelet plug → vasodilation", "Vasoconstriction → platelet accumulation (platelet plug) → coagulation (fibrin clot)", "Fibrinolysis → vasoconstriction → platelet plug"], correct: 2 },
    { id: 691, question: "The process of breaking down a blood clot is called:", options: ["Hemopoiesis", "Diapedesis", "Fibrinolysis", "Leukopoiesis"], correct: 2 },
    { id: 692, question: "Which of the following can act as a clotting inhibitor to prevent unnecessary clot formation?", options: ["Vitamin K", "Hemoglobin", "Heparin and antithrombin III", "Calcium ions"], correct: 2 },
    { id: 693, question: "Which factors were specifically highlighted in the clotting cascade as important for the exam?", options: ["Factors I, II, and V only", "Factor VIII, calcium ions, and vitamin K", "Factor IX and XII only", "Only vitamin C"], correct: 1 },
    { id: 694, question: "Antigens that determine blood type (A, B) are located:", options: ["In plasma only", "Inside the nucleus of the RBC", "On the surface of red blood cells", "On platelets only"], correct: 2 },
    { id: 695, question: "Which blood type is called the universal donor?", options: ["AB+", "AB−", "O+", "O−"], correct: 3 },
    { id: 696, question: "Which blood type is the universal recipient?", options: ["AB+", "AB−", "O+", "O−"], correct: 0 },
    { id: 697, question: "A person with blood type A will have:", options: ["Antigen A on RBC and antibody B in plasma", "Antigen B on RBC and antibody A in plasma", "Antigens A and B and no antibodies", "No antigens and both A and B antibodies"], correct: 0 },
    { id: 698, question: "A person with A negative (A−) blood:", options: ["Can donate to A and AB, and receive from any type", "Can donate to A and AB (regardless of Rh), but receive only from A− and O−", "Can donate only to A−, and receive from A and AB", "Can only donate to O−"], correct: 1 },
    { id: 699, question: "All anemias result in:", options: ["Increased oxygen transport", "Significant reduction in oxygen transport", "Increased hemoglobin synthesis", "Increased ATP production"], correct: 1 },
    { id: 700, question: "Decreased oxygen transport in anemia leads to:", options: ["Increased energy production", "Less energy (ATP) production in cells", "No change in cellular metabolism", "Only increased inflammation"], correct: 1 },
    { id: 701, question: "Which of the following is a compensatory mechanism in anemia?", options: ["Bradycardia and vasodilation", "Tachycardia and vasoconstriction", "Decreased respiratory rate", "Decreased heart rate"], correct: 1 },
    { id: 702, question: "General signs of anemia include all of the following EXCEPT:", options: ["Pallor", "Fatigue", "Dyspnea (shortness of breath)", "Increased regeneration of epithelial cells"], correct: 3 },
    { id: 703, question: "Iron deficiency anemia (IDA) is mainly due to:", options: ["Defective white blood cells", "Impaired hemoglobin synthesis because of insufficient iron", "Excessive vitamin B12", "Excessive folic acid intake"], correct: 1 },
    { id: 704, question: "In iron deficiency anemia, red blood cells are typically:", options: ["Large and hyperchromic", "Microcytic and hypochromic", "Normal size with normal color", "Macrocytic and hyperchromic"], correct: 1 },
    { id: 705, question: "Which of the following is NOT a typical etiology of iron deficiency anemia?", options: ["Insufficient iron intake or absorption", "Chronic blood loss", "Acute liver disease", "Genetic mutation of hemoglobin (like sickle cell disease)"], correct: 3 },
    { id: 706, question: "Which symptoms are especially important for IDA (iron deficiency anemia)?", options: ["Muscle cramps and seizures", "Stomatitis, glossitis, and menstrual irregularities", "Hearing loss and tinnitus", "Night blindness and dry skin"], correct: 1 },
    { id: 707, question: "The best treatment strategy for iron deficiency anemia includes:", options: ["High-fat diet", "Iron-rich foods and iron supplements", "Only vitamin C supplementation", "Bed rest only"], correct: 1 },
    { id: 708, question: "Pernicious anemia (PA) is primarily associated with deficiency of:", options: ["Iron only", "Vitamin C and vitamin D", "Vitamin B12 and folic acid (B9)", "Calcium and phosphorus"], correct: 2 },
    { id: 709, question: "Red blood cells in pernicious anemia are typically:", options: ["Small and hypochromic", "Large (macrocytic / megaloblastic) and pale", "Normal size with increased hemoglobin", "Fragmented and sickle-shaped"], correct: 1 },
    { id: 710, question: "In pernicious anemia, red blood cells are typically:", options: ["Microcytic and hypochromic", "Macrocytic (megaloblastic) with low hemoglobin", "Normal size with high hemoglobin", "Fragmented and sickle-shaped"], correct: 1 },
    { id: 711, question: "Which deficiencies are most closely associated with pernicious anemia?", options: ["Iron only", "Vitamin B12 and folic acid (B9)", "Vitamin C and vitamin D", "Calcium and phosphorus"], correct: 1 },
    { id: 712, question: "Which of the following is NOT listed as a cause (etiology) of pernicious anemia?", options: ["Genetic factors", "Malabsorption of vitamin B12", "Gastrectomy (removal of part of the stomach)", "Acute trauma to long bones"], correct: 3 },
    { id: 713, question: "Why does gastrectomy increase the risk of pernicious anemia?", options: ["The liver cannot store iron anymore", "The stomach can no longer produce intrinsic factor needed for B12 absorption", "The kidneys stop making erythropoietin", "The intestine stops absorbing glucose"], correct: 1 },
    { id: 714, question: "Which symptoms are important for pernicious anemia?", options: ["Leg cramps, dry skin, blurred vision", "Glossitis, paresthesia, and digestive discomfort", "Severe bruising and nosebleeds", "Night blindness and hair loss"], correct: 1 },
    { id: 715, question: "Which of the following is an appropriate treatment for pernicious anemia?", options: ["Only iron tablets", "High-dose vitamin C", "Oral supplements and vitamin B12 injections", "No treatment is needed"], correct: 2 },
    { id: 716, question: "Aplastic anemia is primarily characterized by:", options: ["Excessive destruction of red blood cells in the spleen", "Impairment or failure of bone marrow", "Overproduction of red blood cells", "Defective hemoglobin structure"], correct: 1 },
    { id: 717, question: "Which of the following is NOT listed as an etiology (cause) of aplastic anemia?", options: ["Myelotoxic agents (radiation, chemicals, drugs)", "Viral infections such as hepatitis C", "Genetic abnormalities", "Dehydration due to vomiting"], correct: 3 },
    { id: 718, question: "In aplastic anemia, two key laboratory findings are:", options: ["Leukocytosis and thrombocytosis", "Leukopenia and thrombocytopenia", "High hemoglobin and high RBC count", "Increased neutrophils and eosinophils"], correct: 1 },
    { id: 719, question: "What does the term \"leukopenia\" mean?", options: ["Low red blood cell count", "Low platelet count", "Low white blood cell count", "Low hemoglobin only"], correct: 2 },
    { id: 720, question: "Which of the following treatment strategies was mentioned for aplastic anemia?", options: ["Only iron-rich diet", "Removal of bone marrow–suppressing agents, blood transfusion, and possibly bone marrow transplant", "Simple rest and hydration", "Vitamin C and D supplementation"], correct: 1 },
    { id: 721, question: "Hemolytic anemia is best defined as:", options: ["Failure of bone marrow to produce any blood cells", "Excessive destruction of red blood cells", "Lack of iron intake", "Overproduction of platelets"], correct: 1 },
    { id: 722, question: "Which of the following was NOT listed as an etiology of hemolytic anemia?", options: ["Genetic disorders", "Immune reactions", "Changes in blood chemistry", "Vitamin C deficiency only"], correct: 3 },
    { id: 723, question: "Which two specific hemolytic anemias were mentioned as major types?", options: ["Iron deficiency anemia and thalassemia", "Sickle cell anemia and thalassemia", "Aplastic anemia and pernicious anemia", "Hemophilia and sickle cell anemia"], correct: 1 },
    { id: 724, question: "Sickle cell anemia is caused by:", options: ["Lack of iron intake", "Lack of vitamin B12", "Formation of abnormal hemoglobin due to a genetic mutation", "Excess erythropoietin secretion"], correct: 2 },
    { id: 725, question: "What does \"diploid\" mean?", options: ["Having only one copy of each gene", "Having two sets of chromosomes, thus two copies (alleles) of each gene", "Having three copies of each gene", "Having no chromosomes"], correct: 1 },
    { id: 726, question: "In the simplified notation the genotype AA represents:", options: ["A person with sickle cell disease", "A carrier (trait)", "A healthy person with normal hemoglobin", "A person with thalassemia"], correct: 2 },
    { id: 727, question: "The genotype AS (or HBA HBS) represents:", options: ["A diseased person with severe sickle cell anemia", "A carrier (sickle cell trait)", "A person with aplastic anemia", "A person with iron deficiency anemia"], correct: 1 },
    { id: 728, question: "The genotype SS (or HBS HBS) represents:", options: ["Completely healthy", "Carrier with no risk for children", "Diseased person with sickle cell anemia", "Person with only thalassemia minor"], correct: 2 },
    { id: 729, question: "Which amino acid substitution in the beta chain of hemoglobin is responsible for sickle cell anemia?", options: ["Valine → glutamic acid", "Glutamic acid → valine", "Lysine → alanine", "Glycine → serine"], correct: 1 },
    { id: 730, question: "What is the MAIN consequence of the abnormal sickle hemoglobin on red blood cells?", options: ["RBCs become smaller and paler", "RBCs become spherical and very flexible", "RBCs become sickle-shaped, get stuck in capillaries, and have shorter lifespan", "RBCs become transparent and invisible in smear"], correct: 2 },
    { id: 731, question: "Which of the following best describes the risk in a couple where BOTH parents are carriers (AS x AS) for sickle cell?", options: ["0% chance of sickle cell disease in children", "25% healthy (AA), 50% carriers (AS), 25% disease (SS)", "50% healthy, 50% disease", "100% carriers only"], correct: 1 },
    { id: 732, question: "Which statement about carriers (AS / trait) is TRUE?", options: ["They always have severe symptoms of sickle cell disease", "They never pass the gene to their children", "They may have mild or no symptoms, but can transmit the defective allele", "They cannot marry another carrier"], correct: 2 },
    { id: 733, question: "A person with genotype AA for the sickle cell gene is:", options: ["Diseased (sickle cell anemia)", "Carrier (trait)", "Healthy", "Unable to produce hemoglobin"], correct: 2 },
    { id: 734, question: "A person with genotype AS is best described as:", options: ["Having full sickle cell anemia", "A carrier (sickle cell trait)", "Completely healthy with no abnormal allele", "Having thalassemia"], correct: 1 },
    { id: 735, question: "A person with genotype SS will:", options: ["Be a normal healthy individual", "Be a carrier only", "Have sickle cell anemia", "Be unable to have children"], correct: 2 },
    { id: 736, question: "Which of the following best describes homozygous for the sickle cell gene?", options: ["AA only", "AS only", "AA and SS", "Only SS"], correct: 2 },
    { id: 737, question: "Which of the following best describes heterozygous for the sickle cell gene?", options: ["AA", "AS", "SS", "No alleles present"], correct: 1 },
    { id: 738, question: "What is the probability of a child with sickle cell anemia (SS) if a carrier man (AS) marries a healthy woman (AA)?", options: ["0%", "25%", "50%", "75%"], correct: 0 },
    { id: 739, question: "What is the probability of a child with sickle cell anemia if both parents are carriers (AS × AS)?", options: ["0%", "25%", "50%", "75%"], correct: 1 },
    { id: 740, question: "Which of the following is a major complication of sickle cell anemia?", options: ["RBCs become smaller and very flexible", "RBCs become sickle-shaped, get stuck in vessels, causing thrombosis and necrosis", "Platelets disappear completely", "Plasma volume is zero"], correct: 1 },
    { id: 741, question: "Which symptom is particularly associated with sickle cell anemia?", options: ["Hyperbilirubinemia and jaundice", "Only headache", "Only hypertension", "Only night blindness"], correct: 0 },
    { id: 742, question: "Hemophilia A is mainly caused by a deficiency of:", options: ["Clotting factor II", "Clotting factor V", "Clotting factor VIII", "Clotting factor X"], correct: 2 },
    { id: 743, question: "Hemophilia A is transmitted via:", options: ["Y chromosome", "X chromosome (X-linked)", "Autosomal dominant gene", "Mitochondrial DNA"], correct: 1 },
    { id: 744, question: "Why is hemophilia A more common and more severe in males?", options: ["Males have more platelets", "Males have no X chromosome", "Males have only one X chromosome, so one abnormal allele causes disease", "Males cannot produce factor VIII at all"], correct: 2 },
    { id: 745, question: "Which genotypes are possible in females for hemophilia A?", options: ["XᴴY and XʰY", "XᴴXᴴ, XᴴXʰ, and XʰXʰ", "Only XʰXʰ", "Only XᴴXᴴ"], correct: 1 },
    { id: 746, question: "What are the two possible genotypes for males regarding hemophilia A?", options: ["XᴴXᴴ and XʰXʰ", "XᴴY and XʰY", "XᴴY and YY", "XᴴXʰ and XY"], correct: 1 },
    { id: 747, question: "A diseased man (XʰY) marries a trait woman (XᴴXʰ). What is the probability that their daughters (girls) have hemophilia A?", options: ["0%", "25% of all daughters (50% of daughters)", "50% of all children", "100% of daughters"], correct: 1 },
    { id: 748, question: "Which of the following is a typical clinical feature of hemophilia A?", options: ["Severe hemorrhage after minor trauma", "Dehydration without bleeding", "Only low blood pressure", "Only headache without bleeding"], correct: 0 },
    { id: 749, question: "Which of the following treatments was mentioned for hemophilia A?", options: ["High-dose iron only", "Vitamin B12 injection", "DDAVP and replacement of factor VIII", "Bone marrow transplant only"], correct: 2 },
    { id: 750, question: "Leukemia is best defined as:", options: ["Overproduction of platelets", "Overproduction of erythrocytes", "Uncontrolled multiplication of leukocytes (white blood cells)", "Complete absence of plasma"], correct: 2 },
    { id: 751, question: "Which statement correctly matches acute leukemia?", options: ["Involves mature cells and usually older adults", "Involves immature white blood cells and is more common in children", "Involves only red blood cells", "Only affects platelets"], correct: 1 },
    { id: 752, question: "ALL stands for:", options: ["Acute Lymphocytic Leukemia", "Acute Liver Lesion", "Adult Lymph Node Loss", "Acute Low Leukocyte"], correct: 0 },
    { id: 753, question: "AML stands for:", options: ["Acute Myelogenous Leukemia", "Acute Muscle Lesion", "Adult Myxoma Leukemia", "Autoimmune Myeloid Loss"], correct: 0 },
    { id: 754, question: "Which of the following is TRUE about chronic leukemia?", options: ["It produces immature cells and usually affects children", "It produces mature cells and usually affects older people", "It only affects platelets", "It is always caused by vitamin deficiency"], correct: 1 },
    { id: 755, question: "Common symptoms of leukemia:", options: ["Severe hemorrhage, bone pain, weight loss, splenomegaly and hepatomegaly", "Only fever and cough", "Only nausea and vomiting", "Only hair loss"], correct: 0 },
    { id: 756, question: "Which treatment options were listed for leukemia?", options: ["Antibiotics only", "Chemotherapy, interferons, and bone marrow transplant in severe cases", "Vitamin C tablets only", "Iron-rich diet only"], correct: 1 },
    { id: 757, question: "Which of the following is NOT one of the five key functions of blood mentioned?", options: ["Transport of oxygen and nutrients", "Removal of waste products", "Maintaining homeostasis", "Producing bile in the liver"], correct: 3 },
    { id: 758, question: "Approximately what percentage of whole blood volume is cells (hematocrit)?", options: ["10%", "25%", "45%", "90%"], correct: 2 },
    { id: 759, question: "Plasma minus clotting factors is called:", options: ["Serum", "Bile", "Lymph", "Interstitial fluid"], correct: 0 },
    { id: 760, question: "Which three components are especially important for blood clotting?", options: ["Albumin, hemoglobin, sodium", "Calcium, vitamin K, and clotting factor VIII", "Iron, vitamin C, and albumin", "Glucose, insulin, and fibrinogen"], correct: 1 },
    { id: 761, question: "Correct sequence of events in hemostasis (clot formation) is:", options: ["Coagulation → vasoconstriction → platelet plug", "Platelet plug → vasoconstriction → coagulation", "Vasoconstriction → platelet accumulation (platelet plug) → coagulation", "Coagulation → platelet accumulation → vasodilation"], correct: 2 },
    { id: 762, question: "The breakdown of a blood clot (fibrin) is called:", options: ["Hematopoiesis", "Fibrinolysis", "Diapedesis", "Hemostasis"], correct: 1 },
    { id: 763, question: "Which of the following is NOT a major function of blood?", options: ["Transport of oxygen and nutrients", "Removal of cellular waste products", "Production of bile", "Contribution to immune defense"], correct: 2 },
    { id: 764, question: "Approximately how many liters of blood does an average adult have?", options: ["1–2 L", "3 L", "5 L", "9–10 L"], correct: 2 },
    { id: 765, question: "Which sequence correctly represents blood flow from artery to vein?", options: ["Artery → Vein → Capillary → Arteriole → Venule", "Vein → Capillary → Artery → Venule → Arteriole", "Artery → Arteriole → Capillary → Venule → Vein", "Capillary → Artery → Arteriole → Vein → Venule"], correct: 2 },
    { id: 766, question: "The site of exchange of gases, nutrients, and wastes between blood and tissues is:", options: ["Arteries", "Capillaries", "Veins", "Heart"], correct: 1 },
    { id: 767, question: "Which statement about blood composition is correct?", options: ["Plasma = 90% of blood volume", "Cells (formed elements) = about 45% of blood volume", "White blood cells are 55% of blood volume", "Platelets are more than 50% of blood volume"], correct: 1 },
    { id: 768, question: "Hematocrit refers to:", options: ["Percentage of plasma in blood", "Percentage of clotting factors in serum", "Percentage of formed elements (mainly RBCs) in blood", "Percentage of WBCs only"], correct: 2 },
    { id: 769, question: "In general, hematocrit is:", options: ["Higher in females than males", "Higher in males than females", "The same in both sexes", "Only present in children"], correct: 1 },
    { id: 770, question: "Plasma minus clotting factors is called:", options: ["Lymph", "Serum", "Interstitial fluid", "Bile"], correct: 1 },
    { id: 771, question: "Which plasma protein is mainly responsible for osmotic pressure of blood?", options: ["Fibrinogen", "Hemoglobin", "Albumin", "Globulin"], correct: 2 },
    { id: 772, question: "Which of the following is TRUE about erythrocytes?", options: ["They are nucleated in peripheral blood", "They are biconcave and anucleate when mature", "They primarily perform phagocytosis", "They are the least abundant blood cell"], correct: 1 },
    { id: 773, question: "The main function of hemoglobin is:", options: ["To digest pathogens", "To transport oxygen and carbon dioxide", "To produce hormones", "To synthesize clotting factors"], correct: 1 },
    { id: 774, question: "Which combination is correctly matched?", options: ["Oxygen binds to the globin part", "Carbon dioxide binds to the heme part", "Oxygen binds to heme, and carbon dioxide binds to globin", "Both oxygen and carbon dioxide bind only to iron"], correct: 2 },
    { id: 775, question: "The combination of hemoglobin and oxygen is called:", options: ["Deoxyhemoglobin", "Carbaminohemoglobin", "Oxyhemoglobin", "Methemoglobin"], correct: 2 },
    { id: 776, question: "The hormone primarily responsible for stimulating RBC production in bone marrow is:", options: ["Insulin", "Erythropoietin", "Cortisol", "Thyroxine"], correct: 1 },
    { id: 777, question: "Excess iron is stored in tissues (especially the liver) as:", options: ["Albumin", "Hemosiderin and ferritin", "Bilirubin", "Cholesterol"], correct: 1 },
    { id: 778, question: "A hereditary condition characterized by massive iron accumulation in the liver is:", options: ["Hemophilia", "Hemochromatosis", "Leukemia", "Thrombocytopenia"], correct: 1 },
    { id: 779, question: "Which statement about bilirubin is CORRECT?", options: ["It is formed from breakdown of plasma proteins", "It is a yellow pigment formed from the heme portion of hemoglobin", "It is produced by platelets", "It is conjugated in the kidney"], correct: 1 },
    { id: 780, question: "Which group correctly lists the granulocytes?", options: ["Neutrophils, eosinophils, basophils", "Lymphocytes, monocytes", "Erythrocytes, neutrophils, lymphocytes", "Monocytes, basophils"], correct: 0 },
    { id: 781, question: "Which group correctly lists the agranulocytes?", options: ["Neutrophils and eosinophils", "Basophils and platelets", "Lymphocytes and monocytes", "Erythrocytes and neutrophils"], correct: 2 },
    { id: 782, question: "Which leukocytes are especially important in allergic reactions and parasitic infections?", options: ["Neutrophils", "Eosinophils", "Basophils", "Lymphocytes"], correct: 1 },
    { id: 783, question: "Which cells release histamine and heparin and are involved in inflammatory reactions?", options: ["Neutrophils", "Eosinophils", "Basophils", "Platelets"], correct: 2 },
    { id: 784, question: "Which two leukocytes are emphasized as capable of diapedesis (actively leaving the bloodstream into tissues)?", options: ["Neutrophils and eosinophils", "Lymphocytes and platelets", "Basophils and monocytes", "Erythrocytes and neutrophils"], correct: 2 },
    { id: 785, question: "Lymphocytes are mainly responsible for:", options: ["Blood clotting", "Oxygen transport", "Specific (adaptive) immune responses", "Maintaining osmotic pressure"], correct: 2 },
    { id: 786, question: "Platelets (thrombocytes):", options: ["Are large nucleated cells", "Are necessary for hemostasis (clot formation)", "Carry oxygen", "Produce antibodies"], correct: 1 },
    { id: 787, question: "Which sequence correctly describes the three main steps of hemostasis?", options: ["Coagulation → Vasoconstriction → Platelet plug", "Vasoconstriction → Platelet plug formation → Coagulation", "Platelet plug → Fibrinolysis → Vasodilation", "Fibrinolysis → Coagulation → Vasoconstriction"], correct: 1 },
    { id: 788, question: "The breakdown of a blood clot (fibrin) is called:", options: ["Hematopoiesis", "Diapedesis", "Fibrinolysis", "Hemolysis"], correct: 2 },
    { id: 789, question: "Which of the following acts as a natural anticoagulant?", options: ["Albumin", "Heparin", "Hemoglobin", "Bilirubin"], correct: 1 },
    { id: 790, question: "Which three items were highlighted as especially important for blood coagulation?", options: ["Albumin, hemoglobin, sodium", "Calcium, vitamin K, and clotting factor VIII", "Iron, vitamin C, and fibrinogen", "Bilirubin, histamine, and serotonin"], correct: 1 },
    { id: 791, question: "In the ABO system, antigens are located:", options: ["In plasma", "On the surface of erythrocytes", "On platelets only", "Only in the liver"], correct: 1 },
    { id: 792, question: "In the ABO system, antibodies are primarily found:", options: ["On the surface of RBCs", "In plasma", "In bone marrow", "Only in lymph nodes"], correct: 1 },
    { id: 793, question: "Which blood type is the universal donor (true universal donor)?", options: ["A+", "O+", "O−", "AB+"], correct: 2 },
    { id: 794, question: "Which blood type is the universal recipient (true universal recipient)?", options: ["O−", "AB+", "A−", "B+"], correct: 1 },
    { id: 795, question: "A person with blood type A− can safely receive RBCs from which of the following types? (Ignore plasma)", options: ["A− and O− only", "A+, AB+, and O+", "O+ only", "AB− only"], correct: 0 },
    { id: 796, question: "All types of anemia ultimately result in:", options: ["Increased oxygen transport", "Significant reduction in oxygen transport", "Increased WBC production", "Increased blood viscosity"], correct: 1 },
    { id: 797, question: "A common compensatory mechanism in anemia includes:", options: ["Bradycardia", "Vasodilation and bradycardia", "Vasoconstriction and tachycardia", "Suppression of bone marrow"], correct: 2 },
    { id: 798, question: "Common general signs of anemia include ALL of the following EXCEPT:", options: ["Pallor", "Fatigue", "Dyspnea (shortness of breath)", "Weight gain and edema only"], correct: 3 },
    { id: 799, question: "In iron deficiency anemia, RBCs are typically:", options: ["Macrocytic and hyperchromic", "Microcytic and hypochromic", "Normocytic and normochromic", "Absent completely"], correct: 1 },
    { id: 800, question: "Which is NOT a typical cause (etiology) of iron deficiency anemia?", options: ["Insufficient iron intake", "Malabsorption of iron", "Chronic blood loss", "Deficiency of vitamin B12 only"], correct: 3 },
    { id: 801, question: "Which additional symptoms were emphasized as more specific for iron deficiency anemia?", options: ["Stomatitis, glossitis, and menstrual irregularities", "Only jaundice", "Only bone pain", "Only peripheral neuropathy"], correct: 0 },
    { id: 802, question: "Pernicious anemia is primarily due to deficiency of:", options: ["Iron", "Vitamin C", "Vitamin B12 and folic acid (B9)", "Vitamin K"], correct: 2 },
    { id: 803, question: "RBCs in pernicious anemia are best described as:", options: ["Microcytic, hypochromic", "Normocytic, normochromic", "Megaloblastic / macrocytic with low hemoglobin", "Completely absent"], correct: 2 },
    { id: 804, question: "Which clinical features were emphasized for pernicious anemia?", options: ["Glossitis, paresthesia, and digestive discomfort", "Only chest pain", "Only edema", "Only cough and fever"], correct: 0 },
    { id: 805, question: "Aplastic anemia is mainly due to:", options: ["Increased RBC destruction in the spleen", "Impairment or failure of bone marrow", "Loss of intrinsic factor in the stomach", "Iron overload in the liver"], correct: 1 },
    { id: 806, question: "Which two lab findings are particularly associated with aplastic anemia?", options: ["Leukocytosis and thrombocytosis", "Leukopenia and thrombocytopenia", "Polycythemia and leukocytosis", "Increased platelets with normal WBC"], correct: 1 },
    { id: 807, question: "Hemolytic anemias are characterized by:", options: ["Decreased destruction of RBCs", "Excessive destruction (hemolysis) of RBCs", "Lack of WBCs", "Only iron deficiency"], correct: 1 },
    { id: 808, question: "In sickle cell anemia, which is TRUE?", options: ["RBCs are normal in shape but fewer", "RBCs become sickle-shaped and can obstruct small vessels", "It is due to vitamin K deficiency", "It only occurs in old age"], correct: 1 },
    { id: 809, question: "Thalassemia is:", options: ["A viral infection of WBCs", "A genetic disorder affecting the alpha and/or beta chains of hemoglobin", "Caused only by iron deficiency", "An autoimmune disease"], correct: 1 },
    { id: 810, question: "Thalassemia minor usually means:", options: ["Homozygous severe disease", "Heterozygous carrier with milder symptoms", "No abnormal gene", "Acute infection"], correct: 1 },
    { id: 811, question: "Predisposing factors to bleeding/clotting disorders include all EXCEPT:", options: ["Thrombocytopenia", "Vitamin K deficiency", "Liver disease", "Increased hemoglobin only"], correct: 3 },
    { id: 812, question: "Hemophilia A is due to deficiency of:", options: ["Factor II", "Factor V", "Factor VIII", "Factor X"], correct: 2 },
    { id: 813, question: "Hemophilia A inheritance pattern is:", options: ["Autosomal dominant", "Autosomal recessive", "X-linked (sex-linked) recessive", "Y-linked"], correct: 2 },
    { id: 814, question: "A typical symptom of hemophilia A is:", options: ["Hypercoagulation and thrombosis", "Severe hemorrhage after minor trauma and hemarthrosis (blood in joints)", "Tinnitus and vertigo only", "Brown discoloration of teeth"], correct: 1 },
    { id: 815, question: "Leukemia is best defined as:", options: ["Overproduction of platelets", "Overproduction of erythrocytes", "Uncontrolled multiplication of leukocytes", "Failure of the liver to produce albumin"], correct: 2 },
    { id: 816, question: "Acute leukemia is characterized by:", options: ["Overproduction of mature cells, usually in older adults", "Overproduction of immature cells, often in children", "Only platelet abnormalities", "Only RBC abnormalities"], correct: 1 },
    { id: 817, question: "ALL stands for:", options: ["Acute Liver Lesion", "Acute Lymphocytic Leukemia", "Adult Lymph Node Loss", "Acute Low Leukocyte"], correct: 1 },
    { id: 818, question: "AML stands for:", options: ["Acute Myelogenous Leukemia", "Acute Muscle Lesion", "Adult Myeloid Loss", "Autoimmune Myelitis"], correct: 0 },
    { id: 819, question: "Chronic leukemia (CLL, CML) is more likely to involve:", options: ["Immature cells in children", "Mature cells in older adults", "Only platelets", "Only erythrocytes"], correct: 1 },
    { id: 820, question: "Common clinical features of leukemia include:", options: ["Severe hemorrhage, bone pain, weight loss, splenomegaly and hepatomegaly", "Only cough and sputum", "Only diarrhea", "Only hypertension"], correct: 0 },
    { id: 821, question: "Which treatment options were mentioned for leukemia?", options: ["Vitamin B12 injections only", "Chemotherapy, interferons, and bone marrow transplantation in severe cases", "Only iron supplements", "Only surgery"], correct: 1 },
    { id: 822, question: "A 25-year-old woman presents with fatigue, pallor, shortness of breath on exertion, and very pale, small RBCs on blood smear. She reports heavy menstrual periods and poor diet. Which diagnosis is most likely?", options: ["Iron deficiency anemia", "Pernicious anemia", "Aplastic anemia", "Hemophilia A"], correct: 0 }
  ],
  "1. Introduction to Dental Materials and Oral environment and patient considerations": [
    { id: 823, question: "Why is it especially important for dental hygienists to understand how dental materials behave in the mouth?", options: ["So they can independently place all permanent restorations", "So they can help select, maintain, and explain materials used in patients' mouths", "So they can avoid doing any clinical procedures", "So they can manufacture new dental materials"], correct: 1 },
    { id: 824, question: "Which of the following is NOT one of the main reasons for studying dental materials?", options: ["To enhance safety in handling and disposal", "To promote awareness of material performance", "To maintain and treat existing restorations properly", "To replace the dentist in diagnosing and treatment planning"], correct: 3 },
    { id: 825, question: "According to evidence-based dentistry, good clinical decisions are based on:", options: ["Clinical experience only", "Latest research only", "Research evidence, clinician's expertise, and patient's needs and preferences", "Patient preference only"], correct: 2 },
    { id: 826, question: "Which statement best describes the role of the dental hygienist regarding restorative materials?", options: ["They only clean teeth and never need to recognize restorations.", "They often spend more time in the mouth and can assess material status and educate patients.", "They are not allowed to talk about materials with patients.", "They only work with preventive materials like fluoride and sealants."], correct: 1 },
    { id: 827, question: "Which historical statement is TRUE?", options: ["Modern amalgam formulas were developed by GV Black to control mercury content.", "Resin materials were first used in the 1700s.", "Fluoride was first introduced into community water in 1801.", "Gold was never used as a decorative or restorative material."], correct: 0 },
    { id: 828, question: "The primary purpose of the American Dental Association (ADA) Seal of Acceptance is to:", options: ["Register all dental hygienists", "Indicate that a product has been evaluated for safety and efficacy", "Replace FDA approval for medical devices", "Guarantee that a product is covered by insurance"], correct: 1 },
    { id: 829, question: "Which FDA device class includes items like examination gloves and prophy paste?", options: ["Class I", "Class II", "Class III", "Class IV"], correct: 0 },
    { id: 830, question: "Which international organization develops testing standards and specifications for dental materials (e.g., ISO/TC 106)?", options: ["WHO", "FDI and ISO", "CDC", "NIH"], correct: 1 },
    { id: 831, question: "Which statement best describes biocompatibility in dental materials?", options: ["The ability to dissolve slowly in saliva", "The ability to function in the body without causing harm or irritation", "The ability to match tooth color exactly", "The ability to resist fracture under any load"], correct: 1 },
    { id: 832, question: "A patient presents with redness and irritation localized around the margins of a metal crown. 10–20% of people may be sensitive to which metal commonly found in some dental alloys?", options: ["Gold", "Platinum", "Nickel", "Titanium"], correct: 2 },
    { id: 833, question: "Which of the following correctly matches the type of force with its description?", options: ["Compressive – pulls a material apart", "Tensile – pushes a material together", "Shear – two surfaces slide across each other", "Torsion – force with no movement"], correct: 2 },
    { id: 834, question: "Flexure in dentistry is best described as:", options: ["A twisting force combining compression and tension", "A bending of a structure, such as a long-span bridge, under load", "A direct pulling apart of a material", "A sudden fracture from a single heavy blow"], correct: 1 },
    { id: 835, question: "Fatigue failure of a dental material refers to:", options: ["Sudden breakage from one very large force", "Deformation that is always reversible", "Fracture occurring over time from repeated small stresses", "Fracture that happens only in hot environments"], correct: 2 },
    { id: 836, question: "When the coefficient of thermal expansion of a restorative material is very different from that of tooth structure, repeated heating and cooling can lead to:", options: ["Improved bonding", "Percolation and microleakage", "Better esthetics", "Complete immunity to decay"], correct: 1 },
    { id: 837, question: "A patient with multiple amalgam restorations feels a sharp \"electric shock\" when biting on aluminum foil. This phenomenon is called:", options: ["Thermal expansion", "Galvanism", "Fatigue", "Solubility"], correct: 1 },
    { id: 838, question: "Which statement about thermal conductivity is CORRECT?", options: ["Metals conduct heat rapidly and may irritate the pulp if not insulated.", "Enamel and dentin conduct heat faster than gold.", "Acrylics are excellent heat conductors.", "Cement bases are placed to increase heat transfer."], correct: 0 },
    { id: 839, question: "Which of the following is the best definition of microleakage?", options: ["Total breakdown of a restoration", "Microscopic gap at the tooth–restoration interface allowing fluid and bacteria to enter", "Complete loss of adhesion between all materials in the mouth", "Only staining at the surface without bacterial involvement"], correct: 1 },
    { id: 840, question: "A restoration with poor isolation during placement allows saliva contamination at the margins. This primarily increases the risk of:", options: ["Improved bonding", "Microleakage and recurrent decay", "Increased fracture toughness", "Higher esthetic value"], correct: 1 },
    { id: 841, question: "In color science for dentistry, value refers to:", options: ["The dominant color family (e.g., yellow, brown)", "The intensity or saturation of a color", "How light or dark a color appears", "The exact wavelength of the color"], correct: 2 },
    { id: 842, question: "A restoration that matches the tooth under daylight but looks different under fluorescent light is an example of:", options: ["Vitality", "Metamerism", "Opacity", "Optical scattering"], correct: 1 },
    { id: 843, question: "Which surface condition increases biofilm accumulation on restorations?", options: ["Highly polished ceramic", "Glazed porcelain", "Rough, poorly polished composite", "Well-finished gold alloy"], correct: 2 },
    { id: 844, question: "Which statement about oral biofilm and dentures is CORRECT?", options: ["Dentures cannot retain microorganisms.", "Dentures can harbor Candida and may contribute to denture stomatitis.", "Dentures prevent all fungal infections.", "Biofilm on dentures is not clinically important."], correct: 1 },
    { id: 845, question: "When using an explorer to identify restorative materials, which tactile sensation is MOST consistent with porcelain?", options: ["Feels very rough and chalky", "Feels slightly rough like unpolished composite", "Feels smooth and glass-like", "Feels soft and rubbery"], correct: 2 },
    { id: 846, question: "Which of the following is classified as an auxiliary material in dental materials science?", options: ["Composite resin used for a Class II filling", "Glass ionomer used as a permanent restoration", "Gypsum used for study models", "Fluoride varnish used for caries prevention"], correct: 2 },
    { id: 847, question: "Which combination correctly lists the three main classifications of dental materials?", options: ["Preventive, restorative, auxiliary", "Primary, secondary, tertiary", "Chemical, physical, biological", "Metallic, ceramic, polymer"], correct: 0 },
    { id: 848, question: "Which property describes a material's ability to return to its original shape after being deformed?", options: ["Fatigue", "Elastic deformation", "Permanent deformation", "Fracture toughness"], correct: 1 },
    { id: 849, question: "Which force combination is MOST associated with chewing sticky caramel?", options: ["Compression only", "Tensile + compressive forces", "Shear only", "Flexure only"], correct: 1 },
    { id: 850, question: "Which material is MOST likely to absorb water and swell over time?", options: ["Gold alloy", "Porcelain", "Acrylic denture base", "Zirconia"], correct: 2 },
    { id: 851, question: "A material that dissolves easily in saliva demonstrates high:", options: ["Solubility", "Water sorption", "Corrosion resistance", "Strength"], correct: 0 },
    { id: 852, question: "Which situation BEST describes corrosion?", options: ["Composite changing color from coffee", "Metal restoration breaking down chemically in saliva", "Acrylic denture absorbing water", "Sealant shrinking during polymerization"], correct: 1 },
    { id: 853, question: "Which material has a coefficient of thermal expansion most similar to natural tooth structure?", options: ["Unfilled acrylic", "Gold", "Composite resin", "Porcelain"], correct: 1 },
    { id: 854, question: "Which property is MOST critical when choosing a material for lower molars experiencing high masticatory force?", options: ["High translucency", "High fracture toughness", "High solubility", "Low surface energy"], correct: 1 },
    { id: 855, question: "Which factor MOST reduces the likelihood of microleakage?", options: ["Leaving margins unetched", "Proper bonding and sealing techniques", "Using a high CTE material", "Increasing film thickness"], correct: 1 },
    { id: 856, question: "Which surface has the least biofilm accumulation?", options: ["Rough resin composite", "Scratched acrylic", "Polished ceramic", "Worn amalgam"], correct: 2 },
    { id: 857, question: "Which description BEST matches viscosity in adhesive systems?", options: ["Ability to resist fracture", "Ability to flow", "Resistance to heat transfer", "Ability to bond chemically"], correct: 1 },
    { id: 858, question: "Poor wetting (high contact angle) would MOST likely result in:", options: ["Stronger adhesion", "Weaker bonding", "Increased microhardness", "Higher esthetic value"], correct: 1 },
    { id: 859, question: "Which term refers to the bending of a material under load?", options: ["Shear", "Flexure", "Tension", "Compression"], correct: 1 },
    { id: 860, question: "Which phenomenon explains why two materials that look identical outdoors may appear mismatched in the dental operatory?", options: ["Opacity", "Metamerism", "Translucency", "Vitality"], correct: 1 },
    { id: 861, question: "Which material is MOST likely to corrode over time in the mouth?", options: ["High noble metal alloy", "Gold", "Amalgam", "Porcelain"], correct: 2 },
    { id: 862, question: "Transillumination is particularly useful for detecting:", options: ["Composite margin integrity", "Porcelain crown thickness", "Caries under enamel", "Metal restoration margins"], correct: 2 },
    { id: 863, question: "Which class of dental materials includes items such as fluoride varnish and sealants?", options: ["Restorative materials", "Auxiliary materials", "Preventive/therapeutic materials", "Provisional materials"], correct: 2 },
    { id: 864, question: "Which material is MOST resistant to solubility in saliva?", options: ["Glass ionomer", "Unfilled acrylic", "Gold alloy", "Resin composite"], correct: 2 },
    { id: 865, question: "Which force is MOST responsible when teeth slide against each other during chewing?", options: ["Tension", "Compression", "Shear", "Flexure"], correct: 2 },
    { id: 866, question: "A fracture that occurs from repeated temperature changes + moisture + chewing over time is called:", options: ["Immediate fracture", "Elastic deformation", "Fatigue failure", "Creep"], correct: 2 },
    { id: 867, question: "What is the primary risk when a restorative material has a thermal expansion rate much higher than enamel?", options: ["Enhanced esthetics", "Microleakage and percolation", "Increased strength", "Reduced solubility"], correct: 1 },
    { id: 868, question: "Which of the following is a chemical retention method?", options: ["Retention grooves in cavity design", "Undercuts in Class II amalgam", "Bonding between glass ionomer and tooth minerals", "Using pins for retention"], correct: 2 },
    { id: 869, question: "Which surface condition provides the best adhesion for bonding?", options: ["Smooth, unetched surface", "Etched surface with increased surface energy", "Contaminated surface with saliva", "Thick adhesive layer"], correct: 1 },
    { id: 870, question: "Which appearance BEST describes porcelain under an explorer?", options: ["Chalky and soft", "Rough and grainy", "Smooth and glass-like", "Slightly sticky"], correct: 2 },
    { id: 871, question: "Which statement is TRUE about water sorption?", options: ["It improves color stability", "It increases the risk of odor and staining", "It only occurs in metals", "It only happens with fluoride materials"], correct: 1 },
    { id: 872, question: "Biofilm accumulation is greatest on which surface?", options: ["Highly polished porcelain", "Smooth enamel", "Rough composite surface", "New gold crown"], correct: 2 },
    { id: 873, question: "A patient's denture shows redness and fungal infection on the palate. This condition is MOST likely:", options: ["Microleakage", "Denture stomatitis", "Metal hypersensitivity", "Thermal irritation"], correct: 1 },
    { id: 874, question: "Which of the following is a class II (moderate risk) medical device according to FDA?", options: ["Toothbrush", "Amalgam", "Dental implant", "Dental mirror"], correct: 1 },
    { id: 875, question: "Which optical property allows some light to pass through but not fully?", options: ["Opaque", "Transparent", "Translucent", "Metallic"], correct: 2 },
    { id: 876, question: "Which color term refers to the dominant family of color (yellow, brown, red, etc.)?", options: ["Value", "Chroma", "Hue", "Shade"], correct: 2 },
    { id: 877, question: "A student compares two composites that have the same hue and chroma, but one looks significantly brighter. This difference is due to:", options: ["Metamerism", "Value", "Opacity", "Chroma variation"], correct: 1 },
    { id: 878, question: "Which civilization first used gold bridges and dentures between 600–300 B.C.E.?", options: ["Egyptians", "Etruscans", "Romans", "Greeks"], correct: 1 },
    { id: 879, question: "Who discovered that fluoride in Colorado Springs water was causing dental fluorosis?", options: ["William Taggart", "Frederic McKay", "GV Black", "Pierre Fauchard"], correct: 1 },
    { id: 880, question: "Which development marked the beginning of modern gold casting techniques in dentistry?", options: ["Acid etch technique", "Porcelain denture introduction", "Taggart's casting method (1907)", "Early silver paste"], correct: 2 },
    { id: 881, question: "The first community water fluoridation program began in:", options: ["1801", "1901", "1945", "1992"], correct: 2 },
    { id: 882, question: "Which organization evaluates dental products and awards the ADA Seal of Acceptance?", options: ["WHO", "FDA", "ADA Council on Scientific Affairs", "ISO"], correct: 2 },
    { id: 883, question: "According to FDA classification, dental implants are considered:", options: ["Class I", "Class II", "Class III", "Class IV"], correct: 2 },
    { id: 884, question: "What is the main purpose of the ISO (International Organization for Standardization) in dentistry?", options: ["Approving dental clinics", "Setting global quality and safety standards", "Registering dental professionals", "Replacing ADA certification"], correct: 1 },
    { id: 885, question: "Which material was first introduced in the 1800s and became the basis for modern dental amalgam?", options: ["Resin composites", "Silver paste", "Porcelain teeth", "Zinc phosphate cement"], correct: 1 },
    { id: 886, question: "Why must dental hygienists understand material limitations?", options: ["To prescribe medications", "To improve patient education and prevent restoration failure", "To fabricate crowns in-office", "To diagnose periodontal disease"], correct: 1 },
    { id: 887, question: "Which category includes materials used to create models, impressions, or polishing?", options: ["Preventive", "Restorative", "Auxiliary", "Therapeutic"], correct: 2 },
    { id: 888, question: "Which term refers to the internal resistance of a material when force is applied?", options: ["Strain", "Stress", "Resilience", "Toughness"], correct: 1 },
    { id: 889, question: "Which type of failure occurs due to many small, repeated forces over long periods?", options: ["Instant fracture", "Thermal shock", "Fatigue failure", "Chemical erosion"], correct: 2 },
    { id: 890, question: "Repeated expansion and contraction due to temperature changes can lead to:", options: ["Increased retention", "Percolation and microleakage", "Reduced corrosion", "Better esthetics"], correct: 1 },
    { id: 891, question: "Which light phenomenon causes a restoration to match under daylight but not under fluorescent lighting?", options: ["Scattering", "Opacity", "Metamerism", "Hue shift"], correct: 2 },
    { id: 892, question: "Which surface is MOST likely to promote biofilm adhesion?", options: ["Polished ceramic crown", "Rough, unpolished composite", "Glazed porcelain", "Polished amalgam"], correct: 1 },
    { id: 893, question: "Which historical material was commonly used by the Etruscans between 600–300 B.C.E. for dental restorations?", options: ["Composite resin", "Gold bridges and dentures", "Porcelain crowns", "Silver amalgam"], correct: 1 },
    { id: 894, question: "Which advancement introduced the modern use of tooth-coloured restorations?", options: ["William Taggart's casting method (1907)", "Introduction of resins (1930s)", "Development of rubber bases", "Water fluoridation (1945)"], correct: 1 },
    { id: 895, question: "Which regulatory body classifies dental materials into Class I, II, and III devices?", options: ["ADA", "FDI", "FDA", "ISO"], correct: 2 },
    { id: 896, question: "Which of the following products would be classified as a Class III FDA device?", options: ["Prophy paste", "Composite resin", "Impression material", "Dental implants"], correct: 3 },
    { id: 897, question: "Evidence-based dentistry requires the integration of:", options: ["Patient preference only", "Clinical expertise + best evidence + patient preferences", "Manufacturer recommendations", "Historical practice and tradition"], correct: 1 },
    { id: 898, question: "The most common cause of early tooth loss in ancient populations, which still affects oral health today, is:", options: ["Fluoride deficiency", "Nutritional deficiencies", "Dental caries and periodontal disease", "Acidic diet"], correct: 2 },
    { id: 899, question: "Which category of dental materials includes impression materials and gypsum?", options: ["Preventive", "Restorative", "Therapeutic", "Auxiliary"], correct: 3 },
    { id: 900, question: "What oral environment factor MOST significantly affects the durability of materials that absorb water (e.g., acrylics)?", options: ["Temperature", "Water sorption", "Shearing forces", "Flexural stress"], correct: 1 },
    { id: 901, question: "A restoration that repeatedly expands and contracts due to temperature changes may lead to:", options: ["Increased fracture toughness", "Percolation", "Reduced solubility", "Increased translucency"], correct: 1 },
    { id: 902, question: "Which material has a coefficient of thermal expansion (CTE) closest to tooth structure?", options: ["Amalgam", "Composite", "Gold", "Unfilled acrylic"], correct: 2 },
    { id: 903, question: "A material that breaks suddenly with little deformation is described as:", options: ["Ductile", "Resilient", "Brittle", "Tough"], correct: 2 },
    { id: 904, question: "Fatigue failure is accelerated by all of the following EXCEPT:", options: ["Moisture", "Temperature cycling", "pH changes", "Increased material viscosity"], correct: 3 },
    { id: 905, question: "Galvanism occurs when:", options: ["Two metals contact in saliva, creating an electrical current", "Heat transfers rapidly through metal", "A material dissolves in acid", "A restoration expands too quickly"], correct: 0 },
    { id: 906, question: "Which property describes the amount of energy a material can absorb before permanent deformation?", options: ["Ultimate strength", "Resilience", "Flexural strength", "Hardness"], correct: 1 },
    { id: 907, question: "Which factor improves adhesive wetting on enamel?", options: ["High viscosity", "Low surface energy", "Etching the surface", "Increased film thickness"], correct: 2 },
    { id: 908, question: "The dimension of colour that describes intensity or saturation is:", options: ["Hue", "Value", "Chroma", "Opacity"], correct: 2 },
    { id: 909, question: "A restoration that appears more opaque and blocks light transmission is demonstrating:", options: ["High translucency", "Increased scattering", "High water sorption", "Microleakage"], correct: 1 },
    { id: 910, question: "Shade matching should be done under:", options: ["Fluorescent lighting", "Natural or colour-corrected lighting", "Dim operatory lights", "Blue LED light only"], correct: 1 },
    { id: 911, question: "Rough, unpolished restorative surfaces increase biofilm accumulation because they:", options: ["Support fluoride release", "Increase surface energy", "Provide retention niches for bacteria", "Scatter light more effectively"], correct: 2 },
    { id: 912, question: "Which detection method helps differentiate enamel from restorative materials by showing how light passes through?", options: ["Radiographs", "Explorer tactile evaluation", "Transillumination", "Magnification loupes"], correct: 2 },
    { id: 913, question: "A polished porcelain surface typically feels:", options: ["Grainy", "Smooth and glass-like", "Stiff and metallic", "Soft and porous"], correct: 1 },
    { id: 914, question: "Why must dental professionals understand the properties of all materials used in the clinic?", options: ["To reduce appointment time", "To avoid legal issues", "To ensure safe handling, correct selection, and patient education", "To reduce cost"], correct: 2 },
    { id: 915, question: "Which property makes noble metals more resistant to corrosion?", options: ["High solubility", "Low surface energy", "Chemical inertness", "High viscosity"], correct: 2 },
    { id: 916, question: "The ADA Seal of Acceptance indicates:", options: ["A material is the cheapest option", "A product meets safety and efficacy standards", "A product is made in the U.S.", "The manufacturer requested approval"], correct: 1 },
    { id: 917, question: "Implants restore biting forces most similar to:", options: ["Baby teeth", "Partial dentures", "Natural teeth", "Full dentures"], correct: 2 }
  ],
  "2. Physical and Mechanical properties of dental materials and General handling and safety of dental materials in the dental office": [
    { id: 918, question: "Which type of bond is responsible for forming a \"sea of electrons\" that allows metals to be conductive and malleable?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: 2 },
    { id: 919, question: "Which secondary bond is the strongest and significantly affects the properties of water-based dental materials?", options: ["Temporary dipole", "Covalent", "Hydrogen bond", "Ionic"], correct: 2 },
    { id: 920, question: "Which solid type has an ordered 3D lattice and a sharp melting point?", options: ["Amorphous", "Crystalline", "Polymerized", "Gel-like"], correct: 1 },
    { id: 921, question: "A material that softens gradually without a defined melting point is classified as:", options: ["Crystalline", "Amorphous", "Metallic", "Ionic solid"], correct: 1 },
    { id: 922, question: "The resistance of a liquid to flow is known as:", options: ["Density", "Viscosity", "Elasticity", "Ductility"], correct: 1 },
    { id: 923, question: "Increasing temperature will typically have what effect on viscosity?", options: ["Increases viscosity", "Decreases viscosity", "No effect", "Turns the liquid into a solid"], correct: 1 },
    { id: 924, question: "Which physical property affects how well a material matches natural esthetics?", options: ["Density", "Colour and optical properties", "Solubility", "Thermal expansion"], correct: 1 },
    { id: 925, question: "Hardness represents a material's ability to:", options: ["Absorb water", "Resist penetration and wear", "Conduct heat", "Stretch without breaking"], correct: 1 },
    { id: 926, question: "Elastic deformation is best described as:", options: ["Permanent change in shape", "Temporary deformation that returns to original form", "Sudden fracture at ultimate strength", "Breakdown due to chemical reactions"], correct: 1 },
    { id: 927, question: "Which term describes the maximum stress a material can withstand before fracturing?", options: ["Yield strength", "Ultimate strength", "Resilience", "Toughness"], correct: 1 },
    { id: 928, question: "A material that can be stretched into a wire without breaking is considered:", options: ["Malleable", "Ductile", "Brittle", "Resilient"], correct: 1 },
    { id: 929, question: "A material that can be hammered or pressed into a new shape without fracturing is:", options: ["Ductile", "Brittle", "Malleable", "Elastic"], correct: 2 },
    { id: 930, question: "Galvanism occurs due to:", options: ["Chemical corrosion", "Two dissimilar metals interacting in saliva", "High thermal expansion", "Low solubility"], correct: 1 },
    { id: 931, question: "Which material class is strong, brittle, and heat-resistant, making it useful for crowns and veneers?", options: ["Metals", "Ceramics", "Polymers", "Gels"], correct: 1 },
    { id: 932, question: "Polymers vary in flexibility depending primarily on:", options: ["Colour", "Cross-linking", "Density", "Melting point"], correct: 1 },
    { id: 933, question: "A temporary restorative material would be best classified based on which criterion?", options: ["Composition", "Longevity", "Colour", "Strength"], correct: 1 },
    { id: 934, question: "Increasing the catalyst ratio in a two-component system will:", options: ["Slow down the set", "Produce a more dense material", "Speed up the chemical reaction", "Improve optical clarity"], correct: 2 },
    { id: 935, question: "Initial set refers to the stage when:", options: ["The material is fully hardened", "Manipulation must stop", "The reaction has not begun", "The material becomes permanently deformed"], correct: 1 },
    { id: 936, question: "Light-activated materials offer what main clinical advantage?", options: ["Stronger mechanical properties", "Unlimited working time", "No shrinkage", "They do not require curing lights"], correct: 1 },
    { id: 937, question: "Shelf life is reduced by:", options: ["Cool storage", "Dark storage", "Heat, humidity, and light exposure", "Keeping products sealed"], correct: 2 },
    { id: 938, question: "Bio-aerosols less than 50 μm are classified as:", options: ["Splatter", "Vapour", "Aerosols", "Toxic dust"], correct: 2 },
    { id: 939, question: "Mercury should NEVER be cleaned with a vacuum because:", options: ["It causes immediate corrosion", "It can explode", "It releases dangerous vapours", "It damages the vacuum motor"], correct: 2 },
    { id: 940, question: "A chronic chemical exposure is best described as:", options: ["One high-dose exposure", "Long-term low-level exposure", "A mild irritation", "Contact causing only reversible changes"], correct: 1 },
    { id: 941, question: "The purpose of OSHA Hazard Communication Standard in dental offices is to:", options: ["Train patients on product use", "Inform employees about chemical hazards", "Approve dental materials", "Monitor clinical treatment outcomes"], correct: 1 },
    { id: 942, question: "Which practice supports eco-conscious dentistry?", options: ["Reusing disposable items", "Diluting disinfectants", "Using amalgam separators", "Avoiding PPE to reduce waste"], correct: 2 },
    { id: 943, question: "Which primary bond involves electron transfer between atoms?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: 0 },
    { id: 944, question: "Which primary bond shares electrons between atoms and forms strong, directional bonding?", options: ["Ionic", "Covalent", "Metallic", "Dipole"], correct: 1 },
    { id: 945, question: "Which change in a material is considered physical, not chemical?", options: ["Setting of composite", "Rust forming on a crown", "Wax melting", "Polymer cross-linking"], correct: 2 },
    { id: 946, question: "A dental material that dissolves easily in acid is said to have high:", options: ["Sorption", "Hardness", "Solubility", "Viscosity"], correct: 2 },
    { id: 947, question: "Which of the following is an example of chemical set material?", options: ["Composite cured by blue light", "Gypsum", "Pit and fissure sealants", "Porcelain"], correct: 1 },
    { id: 948, question: "Which factor increases the strength of a polymer?", options: ["Higher water sorption", "More cross-linking", "Less dense packing", "Increased temperature"], correct: 1 },
    { id: 949, question: "A material that can resist indentation is high in:", options: ["Creep", "Hardness", "Toughness", "Elasticity"], correct: 1 },
    { id: 950, question: "Which material class typically shows creep under long-term stress?", options: ["Ceramics", "Metals", "Polymers", "Composites"], correct: 2 },
    { id: 951, question: "Which material has excellent compressive strength but poor tensile strength?", options: ["Ceramics", "Metals", "Polymers", "Waxes"], correct: 0 },
    { id: 952, question: "Which is a characteristic of amorphous solids?", options: ["Defined melting point", "Highly ordered molecular structure", "Gradual softening", "Strong ionic bonding"], correct: 2 },
    { id: 953, question: "Which property refers to a material's ability to conduct electricity or heat?", options: ["Thermal expansion", "Conductivity", "Sorption", "Solubility"], correct: 1 },
    { id: 954, question: "A dental material that must withstand shear forces is MOST critical in which tooth region?", options: ["Incisal edges", "Lingual pits", "Buccal cervical areas", "Proximal contacts"], correct: 0 },
    { id: 955, question: "Which term refers to permanent deformation under constant force over time?", options: ["Fatigue", "Elastic recovery", "Stress relaxation", "Creep"], correct: 3 },
    { id: 956, question: "An increase in surface area of a restoration preparation will generally:", options: ["Increase stress concentration", "Reduce stress per unit area", "Increase strain", "Increase microleakage"], correct: 1 },
    { id: 957, question: "Which material is MOST likely to generate heat during setting, requiring careful handling?", options: ["Glass ionomer", "Acrylic resins", "Zinc phosphate cement", "Composite resin"], correct: 1 },
    { id: 958, question: "Which visual clue helps distinguish composite from enamel during scaling?", options: ["Composite appears slightly duller and rougher when dried", "Composite turns transparent", "Enamel becomes sticky", "Composite fluoresces bright blue"], correct: 0 },
    { id: 959, question: "Which light interaction makes enamel appear slightly bluish at the incisal edge?", options: ["Absorption", "Scattering", "Reflection", "Transmission"], correct: 3 },
    { id: 960, question: "Shade matching should be completed before tooth dehydration because dryness:", options: ["Increases translucency", "Decreases value", "Makes teeth appear lighter", "Makes teeth appear darker"], correct: 2 },
    { id: 961, question: "Biofilm accumulation on dentures commonly results in:", options: ["Enamel erosion", "Candida-associated stomatitis", "Fluoride uptake", "Composite wear"], correct: 1 },
    { id: 962, question: "Which restoration material appears MOST radiopaque on radiographs?", options: ["Sealant", "Composite", "Ceramic", "Amalgam"], correct: 3 },
    { id: 963, question: "Which primary bond produces materials with high melting points and strong brittleness?", options: ["Metallic", "Covalent", "Ionic", "Hydrogen"], correct: 2 },
    { id: 964, question: "Which of the following BEST describes a polymer with low cross-linking?", options: ["More rigid", "More flexible", "Higher fracture toughness", "Higher melting point"], correct: 1 },
    { id: 965, question: "Which phase change is involved when gypsum goes from dihydrate → hemihydrate during manufacturing?", options: ["Chemical dissolution", "Dehydration", "Hydration", "Polymerization"], correct: 1 },
    { id: 966, question: "A material that can withstand repeated chewing without permanent deformation demonstrates high:", options: ["Hardness", "Resilience", "Ultimate strength", "Solubility resistance"], correct: 1 },
    { id: 967, question: "Which statement is TRUE regarding stress–strain curves?", options: ["The higher the elastic modulus, the more flexible the material", "A steep slope indicates a stiff material", "The plastic region occurs before the elastic region", "Dentists prefer materials with no elastic region"], correct: 1 },
    { id: 968, question: "Which material demonstrates low thermal conductivity, protecting the pulp?", options: ["Gold", "Amalgam", "Enamel", "Composite resin"], correct: 3 },
    { id: 969, question: "A patient reports a shock when a metal instrument touches a recent amalgam restoration. This indicates:", options: ["Thermal expansion", "Galvanic reaction", "Polymerization shrinkage", "Creep"], correct: 1 },
    { id: 970, question: "High water sorption in a material may lead to:", options: ["Increased hardness", "Swelling and odor retention", "Improved translucency", "Reduced staining"], correct: 1 },
    { id: 971, question: "Which force is MOST responsible when tearing tough foods like meat?", options: ["Tensile", "Compressive", "Shear", "Torque"], correct: 0 },
    { id: 972, question: "Which restorative option is MOST likely to fracture under localized high stress?", options: ["Composite resin", "Porcelain", "Amalgam", "Gold alloy"], correct: 1 },
    { id: 973, question: "Which material class exhibits high compressive strength but low tensile strength?", options: ["Metals", "Ceramics", "Polymers", "Waxes"], correct: 1 },
    { id: 974, question: "Which factor MOST increases the risk of microleakage?", options: ["Matching CTE with enamel", "Strong bonding", "Rapid thermal changes", "Low viscosity adhesive"], correct: 2 },
    { id: 975, question: "Etching enamel increases bonding primarily by:", options: ["Reducing surface energy", "Increasing contact angle", "Creating microporosities", "Increasing viscosity"], correct: 2 },
    { id: 976, question: "Which shade parameter changes when a tooth appears brighter?", options: ["Hue", "Chroma", "Value", "Opacity"], correct: 2 },
    { id: 977, question: "A highly opaque restoration is MOST likely to:", options: ["Transmit light well", "Scatter light strongly", "Have high translucency", "Mimic natural enamel"], correct: 1 },
    { id: 978, question: "A restoration that matches under sunlight but not under operatory light demonstrates:", options: ["Colour instability", "Fluorescence", "Metamerism", "Incorrect hue"], correct: 2 },
    { id: 979, question: "Which surface is MOST plaque-retentive?", options: ["Glazed ceramic", "Polished amalgam", "Rough composite", "Gold alloy"], correct: 2 },
    { id: 980, question: "Which detection method BEST differentiates porcelain from composite?", options: ["Transillumination", "Radiographs", "Explorer roughness", "Surface shine under air-dry"], correct: 0 },
    { id: 981, question: "A material that returns to its original shape after gentle stretching shows:", options: ["Creep", "Elastic behavior", "Plastic deformation", "Fatigue"], correct: 1 },
    { id: 982, question: "Which dental material is LEAST soluble in oral fluids?", options: ["Glass ionomer", "Porcelain", "Composite resin", "Acrylic resin"], correct: 1 },
    { id: 983, question: "Which property describes a material's resistance to indentation or scratching?", options: ["Elasticity", "Hardness", "Toughness", "Cohesion"], correct: 1 },
    { id: 984, question: "What is the primary advantage of nanocomposites in modern dentistry?", options: ["Higher thermal conductivity", "Poor polish retention", "Enhanced esthetics and strength", "Increased solubility"], correct: 2 },
    { id: 985, question: "Which government body is responsible for classifying dental devices into Class I, II, and III?", options: ["ADA", "WHO", "FDA", "ISO"], correct: 2 },
    { id: 986, question: "Class III dental devices include which of the following?", options: ["Gloves", "Fluoride varnish", "Implants", "Amalgam"], correct: 2 },
    { id: 987, question: "Which characteristic BEST explains why gold is considered an ideal dental metal?", options: ["High solubility", "High corrosion resistance", "Low ductility", "Low malleability"], correct: 1 },
    { id: 988, question: "A dental material that dissolves easily in oral fluids is considered:", options: ["Hydrophobic", "Highly resilient", "Highly soluble", "Radiopaque"], correct: 2 },
    { id: 989, question: "Which step is essential for chemical bonding in glass ionomer cement?", options: ["Heating", "Acid–base reaction", "Light curing", "Thermocycling"], correct: 1 },
    { id: 990, question: "Which property describes the ability of a material to absorb energy before fracturing?", options: ["Stiffness", "Brittleness", "Toughness", "Hardness"], correct: 2 },
    { id: 991, question: "Which oral condition MOST increases the risk of corrosion in a metal restoration?", options: ["High pH", "Low moisture", "Acidic saliva", "High salivary flow"], correct: 2 },
    { id: 992, question: "Percolation is BEST described as:", options: ["Material dissolving into saliva", "Fluid movement in gaps from thermal expansion", "Crack formation from tensile forces", "A color mismatch due to lighting"], correct: 1 },
    { id: 993, question: "Which restorative material MOST closely matches enamel's coefficient of thermal expansion (CTE)?", options: ["Composite resin", "Gold", "Amalgam", "Acrylic resin"], correct: 1 },
    { id: 994, question: "A material with a low modulus of elasticity will be:", options: ["Stiff", "Brittle", "Flexible", "Highly radiopaque"], correct: 2 },
    { id: 995, question: "Which type of force primarily affects long-span bridges?", options: ["Shear", "Flexure", "Compression", "Oblique force"], correct: 1 },
    { id: 996, question: "A restoration with high opacity will appear:", options: ["More natural", "More glass-like", "More reflective and solid", "More translucent"], correct: 2 },
    { id: 997, question: "Which early dental civilization used gold wires and animal teeth for prosthetics?", options: ["Egyptians", "Romans", "Etruscans", "Greeks"], correct: 2 },
    { id: 998, question: "The introduction of the acid-etch technique in 1955 led to:", options: ["Decreased use of composite", "Tooth-colored restorations becoming common", "Elimination of bonding agents", "Reduced enamel durability"], correct: 1 },
    { id: 999, question: "What is the FIRST step in biofilm formation?", options: ["Colonization by anaerobes", "Pellicle formation", "Calculus buildup", "Demineralization of enamel"], correct: 1 },
    { id: 1000, question: "Which surface is MOST likely to resist plaque accumulation?", options: ["Rough acrylic", "Polished ceramic", "Matt composite", "Scratched porcelain"], correct: 1 },
    { id: 1001, question: "Which diagnostic method helps distinguish enamel cracks from composite margins?", options: ["Air-drying", "Transillumination", "Explorer roughness", "Occlusal analysis"], correct: 1 },
    { id: 1002, question: "Which shade component decreases when a tooth becomes darker with age?", options: ["Hue", "Chroma", "Value", "Fluorescence"], correct: 2 }
  ],
  "3. Dental amalgams, Metals and Alloys": [
    { id: 1003, question: "What is dental amalgam made from?", options: ["Pure silver only", "Alloy powder mixed with mercury", "Composite resin and glass", "Porcelain and metal"], correct: 1 },
    { id: 1004, question: "What is the main advantage of dental amalgam?", options: ["Excellent esthetics", "High flexibility", "High strength and durability", "Chemical bonding to tooth"], correct: 2 },
    { id: 1005, question: "What is the main disadvantage of dental amalgam?", options: ["Weak under chewing forces", "Poor durability", "Poor esthetics (silver color)", "Not resistant to moisture"], correct: 2 },
    { id: 1006, question: "What type of alloy is most commonly used in modern amalgam?", options: ["Low-copper amalgam", "High-copper amalgam", "Zinc-only amalgam", "Palladium-only amalgam"], correct: 1 },
    { id: 1007, question: "What does \"creep\" in amalgam mean?", options: ["Sudden fracture", "Color change of surface", "Slow deformation under chewing forces", "Expansion due to moisture"], correct: 2 },
    { id: 1008, question: "What does tarnish refer to in dental amalgam?", options: ["Deep internal corrosion", "Surface discoloration only", "Complete fracture of restoration", "Expansion of restoration"], correct: 1 },
    { id: 1009, question: "Why is a liner or base used under deep amalgam restorations?", options: ["To improve esthetics", "To increase bonding", "To protect the pulp from temperature changes", "To reduce creep"], correct: 2 },
    { id: 1010, question: "What is the purpose of a matrix system in Class II restorations?", options: ["To whiten the tooth", "To block saliva", "To recreate proximal walls and proper contours", "To strengthen enamel"], correct: 2 },
    { id: 1011, question: "Why are overhangs dangerous?", options: ["They change tooth color", "They trap plaque and increase periodontal disease risk", "They improve contact", "They prevent corrosion"], correct: 1 },
    { id: 1012, question: "How long does an amalgam restoration take to reach full strength?", options: ["1 hour", "6 hours", "12 hours", "About 24 hours"], correct: 3 },
    { id: 1013, question: "What is the biggest health risk related to mercury in dentistry?", options: ["Swallowed mercury", "Skin contact", "Mercury vapor inhalation", "Taste alteration"], correct: 2 },
    { id: 1014, question: "Which metal is the MOST corrosion-resistant?", options: ["Copper", "Silver", "Gold", "Nickel"], correct: 2 },
    { id: 1015, question: "What is an alloy?", options: ["A single pure metal", "A mixture of two or more metals", "A type of ceramic", "A composite resin"], correct: 1 },
    { id: 1016, question: "Why are alloys used instead of pure metals in dentistry?", options: ["Pure metals are always stronger", "Pure metals are too hard", "Pure metals are often too soft or too reactive", "Pure metals bond better"], correct: 2 },
    { id: 1017, question: "Which alloy is most commonly used for removable partial denture frameworks?", options: ["Gold", "Silver", "Nickel-chromium", "Copper-tin"], correct: 2 },
    { id: 1018, question: "What is a PFM crown?", options: ["Pure ceramic crown", "All-metal crown", "Porcelain fused to metal crown", "Composite crown"], correct: 2 },
    { id: 1019, question: "Why must metal and porcelain have similar thermal expansion in PFM crowns?", options: ["To improve color", "To prevent porcelain cracking", "To reduce corrosion", "To improve bonding to enamel"], correct: 1 },
    { id: 1020, question: "What is a wrought alloy?", options: ["Alloy placed directly into the tooth", "Alloy shaped by casting only", "Alloy mechanically bent or shaped after casting", "Alloy used only for crowns"], correct: 2 },
    { id: 1021, question: "Nickel allergies are most commonly seen in:", options: ["Children", "Men", "Older adults", "Women"], correct: 3 },
    { id: 1022, question: "Which file material is more flexible in curved canals?", options: ["Stainless steel", "Nickel-titanium (NiTi)", "Gold", "Silver"], correct: 1 },
    { id: 1023, question: "What does \"biocompatibility\" mean in dental materials?", options: ["Ability to resist fracture", "Ability to match tooth color", "Ability to function safely without harming tissues", "Ability to conduct heat"], correct: 2 },
    { id: 1024, question: "Which material property describes resistance to scratching or indentation?", options: ["Toughness", "Hardness", "Elasticity", "Ductility"], correct: 1 },
    { id: 1025, question: "Which force pulls a material apart?", options: ["Compressive", "Shearing", "Tensile", "Torsional"], correct: 2 },
    { id: 1026, question: "Which force squeezes or compresses a material?", options: ["Tensile", "Shearing", "Torsional", "Compressive"], correct: 3 },
    { id: 1027, question: "Which force causes sliding of one surface over another?", options: ["Compressive", "Tensile", "Shearing", "Flexural"], correct: 2 },
    { id: 1028, question: "Twisting forces acting on a material are called:", options: ["Tension", "Compression", "Torsion", "Flexure"], correct: 2 },
    { id: 1029, question: "Flexure refers to:", options: ["Twisting of a material", "Stretching of a material", "Bending of a material under force", "Crushing of a material"], correct: 2 },
    { id: 1030, question: "Stress is defined as:", options: ["External force", "Internal resistance to applied force", "Permanent deformation", "Elastic recovery"], correct: 1 },
    { id: 1031, question: "Strain is defined as:", options: ["Applied force", "Energy absorption", "Deformation caused by stress", "Resistance to corrosion"], correct: 2 },
    { id: 1032, question: "What happens when a material is under compression?", options: ["It stretches", "It shortens", "It twists", "It fractures immediately"], correct: 1 },
    { id: 1033, question: "What happens when a material is under tension?", options: ["It shortens", "It twists", "It stretches", "It corrodes"], correct: 2 },
    { id: 1034, question: "Elastic deformation means:", options: ["Permanent shape change", "Deformation that returns to original shape", "Fracture without bending", "Corrosion of surface"], correct: 1 },
    { id: 1035, question: "Plastic (permanent) deformation means:", options: ["Shape returns to normal", "Temporary strain", "Shape does NOT return to original", "Energy absorption without damage"], correct: 2 },
    { id: 1036, question: "Which property describes energy absorption before fracture?", options: ["Hardness", "Brittleness", "Toughness", "Density"], correct: 2 },
    { id: 1037, question: "What causes fatigue failure in dental materials?", options: ["One large force", "Chemical setting reaction", "Repeated small forces over time", "Thermal conductivity"], correct: 2 },
    { id: 1038, question: "Which oral factor most affects material longevity?", options: ["Hair color", "Saliva pH", "Patient height", "Blood type"], correct: 1 },
    { id: 1039, question: "Low solubility means a material:", options: ["Dissolves easily", "Shrinks in saliva", "Lasts longer in the mouth", "Absorbs water easily"], correct: 2 },
    { id: 1040, question: "High water sorption can cause materials to:", options: ["Harden", "Swell and stain", "Conduct heat better", "Improve bonding"], correct: 1 },
    { id: 1041, question: "Corrosion is best described as:", options: ["Mechanical fracture", "Chemical breakdown of metal", "Thermal expansion", "Optical scattering"], correct: 1 },
    { id: 1042, question: "Galvanism occurs when:", options: ["Identical metals touch", "Dissimilar metals contact in saliva", "Composite touches enamel", "Gold touches porcelain"], correct: 1 },
    { id: 1043, question: "A symptom of galvanism is:", options: ["Tooth mobility", "Sharp electric shock", "Gingival recession", "Dry mouth"], correct: 1 },
    { id: 1044, question: "Thermal expansion means a material:", options: ["Shrinks when heated", "Expands when heated", "Fractures when cooled", "Absorbs water"], correct: 1 },
    { id: 1045, question: "Over-contraction of a material can cause:", options: ["Cracks", "Leakage and sensitivity", "Increased strength", "Better esthetics"], correct: 1 },
    { id: 1046, question: "The coefficient of thermal expansion (CTE) measures:", options: ["Color change", "Size change with temperature", "Heat transfer speed", "Strength of material"], correct: 1 },
    { id: 1047, question: "Percolation refers to:", options: ["Corrosion of metals", "Light transmission", "Fluid and bacteria movement from thermal cycling", "Fracture from force"], correct: 2 },
    { id: 1048, question: "Materials with high thermal conductivity:", options: ["Insulate the pulp", "Transfer heat quickly", "Prevent sensitivity", "Reduce expansion"], correct: 1 },
    { id: 1049, question: "Which material has LOW thermal conductivity?", options: ["Gold", "Amalgam", "Composite resin", "Silver"], correct: 2 },
    { id: 1050, question: "Mechanical retention relies on:", options: ["Chemical bonding only", "Undercuts and shape", "Light activation", "Surface energy"], correct: 1 },
    { id: 1051, question: "Chemical retention relies on:", options: ["Physical locking", "Undercuts only", "Chemical bonding to tooth structure", "Polishing"], correct: 2 },
    { id: 1052, question: "Acid etching improves retention by:", options: ["Smoothing the surface", "Increasing surface roughness and energy", "Weakening enamel", "Sealing dentinal tubules permanently"], correct: 1 },
    { id: 1053, question: "Which property allows metal to be stretched into a wire?", options: ["Malleability", "Ductility", "Hardness", "Brittleness"], correct: 1 },
    { id: 1054, question: "Which property allows metal to be hammered into thin sheets?", options: ["Ductility", "Elasticity", "Malleability", "Toughness"], correct: 2 },
    { id: 1055, question: "A material that bends and returns to its original shape shows:", options: ["Plastic deformation", "Brittleness", "Elasticity", "Hardness"], correct: 2 },
    { id: 1056, question: "A material that stays deformed after force is removed shows:", options: ["Elasticity", "Plastic deformation", "Ductility", "Fatigue"], correct: 1 },
    { id: 1057, question: "Toughness refers to:", options: ["Resistance to scratching", "Resistance to corrosion", "Ability to absorb energy without fracturing", "Resistance to heat"], correct: 2 },
    { id: 1058, question: "Which metal is MOST ductile?", options: ["Gold", "Iron", "Copper", "Nickel"], correct: 0 },
    { id: 1059, question: "Which material is MOST brittle?", options: ["Gold", "Amalgam", "Composite resin", "Ceramics"], correct: 3 },
    { id: 1060, question: "Which metal is commonly used in orthodontic wires because of flexibility?", options: ["Gold", "NiTi", "Silver", "Amalgam"], correct: 1 },
    { id: 1061, question: "Why is stainless steel still used in dentistry?", options: ["Cheap and weak", "Strong and corrosion resistant", "Best esthetics", "Bonds chemically to enamel"], correct: 1 },
    { id: 1062, question: "What causes corrosion in metals?", options: ["Light", "Chemical or electrochemical reactions", "Bonding agents", "High viscosity"], correct: 1 },
    { id: 1063, question: "Noble metals are resistant to:", options: ["Fracture", "Tarnish", "Corrosion", "Thermal damage"], correct: 2 },
    { id: 1064, question: "Which metal is considered a noble metal?", options: ["Nickel", "Chromium", "Gold", "Zinc"], correct: 2 },
    { id: 1065, question: "Which property allows a restoration to withstand chewing forces?", options: ["Esthetics", "Strength", "Water sorption", "Chroma"], correct: 1 },
    { id: 1066, question: "The main use of amalgam is for:", options: ["Anterior restorations", "Posterior restorations", "Veneers", "Sealants"], correct: 1 },
    { id: 1067, question: "High copper amalgams reduce:", options: ["Strength", "Creep", "Bonding", "Esthetics"], correct: 1 },
    { id: 1068, question: "What does condensation do in amalgam placement?", options: ["Aligns crystals", "Removes excess mercury and packs material", "Adds esthetics", "Causes shrinkage"], correct: 1 },
    { id: 1069, question: "What is trituration?", options: ["Polishing amalgam", "Mixing amalgam alloy and mercury", "Drying amalgam", "Etching enamel"], correct: 1 },
    { id: 1070, question: "Why is delayed polishing recommended for amalgam?", options: ["To reduce cost", "To allow full setting and strength", "To improve bonding", "To increase shrinkage"], correct: 1 },
    { id: 1071, question: "Which of the following improves amalgam longevity?", options: ["Overhangs", "Poor condensation", "Proper carving & polishing", "Thin liner only"], correct: 2 },
    { id: 1072, question: "Marginal breakdown increases:", options: ["Esthetics", "Plaque retention", "Bond strength", "Pulp vitality"], correct: 1 },
    { id: 1073, question: "Which metal is most conductive of heat?", options: ["Composite", "Gold", "Ceramic", "Acrylic"], correct: 1 },
    { id: 1074, question: "What alloy is commonly used for crowns and bridges?", options: ["Aluminum", "Gold alloys", "Plastic", "Mercury"], correct: 1 },
    { id: 1075, question: "What is the MAIN reason metals are alloyed in dentistry?", options: ["To increase water absorption", "To improve strength and properties", "To add color", "To reduce bonding"], correct: 1 },
    { id: 1076, question: "What type of bond is found in metallic bonding?", options: ["Shared electrons", "Transferred electrons", "Free-floating electron cloud", "Hydrogen bonding"], correct: 2 },
    { id: 1077, question: "Which is a disadvantage of gold restorations?", options: ["Weak", "High corrosion", "Poor esthetics", "High creep"], correct: 2 },
    { id: 1078, question: "What is the function of chromium in alloys?", options: ["Adds softness", "Increases corrosion resistance", "Increases water absorption", "Reduces strength"], correct: 1 },
    { id: 1079, question: "What is a casting alloy used for?", options: ["Wires", "Crowns, inlays, onlays", "Sealants", "Gypsum"], correct: 1 },
    { id: 1080, question: "What property helps files resist breaking inside canals?", options: ["Brittleness", "Toughness", "Esthetics", "Opacity"], correct: 1 },
    { id: 1081, question: "The main cause of galvanic shock is:", options: ["Same metals touching", "Dissimilar metals in saliva", "Light exposure", "Composite resin"], correct: 1 },
    { id: 1082, question: "Which of the following makes alloys harder?", options: ["Mercury", "Gold", "Chromium", "Plastic"], correct: 2 },
    { id: 1083, question: "What is the main disadvantage of base metal alloys?", options: ["Weak strength", "Corrosion", "Possible allergic reactions", "Poor hardness"], correct: 2 },
    { id: 1084, question: "A casting defect that traps gas is called:", options: ["Porosity", "Tarnish", "Creep", "Fracture"], correct: 0 },
    { id: 1085, question: "The ability of a metal to resist indentation is called:", options: ["Toughness", "Hardness", "Elasticity", "Ductility"], correct: 1 },
    { id: 1086, question: "Which metal is often used for implant fixtures?", options: ["Nickel", "Titanium", "Copper", "Mercury"], correct: 1 },
    { id: 1087, question: "Titanium is ideal for implants because it is:", options: ["Brittle", "Corrosive", "Biocompatible", "Esthetic only"], correct: 2 },
    { id: 1088, question: "A disadvantage of ceramics compared to metals is:", options: ["Low esthetics", "Brittleness", "Corrosion", "Low hardness"], correct: 1 },
    { id: 1089, question: "What is burnishing used for?", options: ["Shaping cavity", "Smoothing margins", "Etching enamel", "Heating mercury"], correct: 1 },
    { id: 1090, question: "Which metal is most resistant to tarnish?", options: ["Copper", "Silver", "Gold", "Zinc"], correct: 2 },
    { id: 1091, question: "A metal that fractures without much bending is:", options: ["Ductile", "Elastic", "Brittle", "Tough"], correct: 2 },
    { id: 1092, question: "High copper amalgams improve:", options: ["Corrosion", "Creep resistance", "Expansion", "Water sorption"], correct: 1 },
    { id: 1093, question: "Why is mercury stored in sealed containers?", options: ["To increase density", "To prevent vapor release", "To thicken it", "To add esthetics"], correct: 1 },
    { id: 1094, question: "What is the MAIN role of zinc in amalgam?", options: ["Improves setting reaction", "Weakens structure", "Causes corrosion", "Adds color"], correct: 0 },
    { id: 1095, question: "Which material is least conductive of heat?", options: ["Gold", "Amalgam", "Composite", "Silver"], correct: 2 },
    { id: 1096, question: "A crack that forms due to long-term stress is caused by:", options: ["Brittleness", "Fatigue failure", "Ductility", "Corrosion"], correct: 1 },
    { id: 1097, question: "Which property allows a metal to resist breaking after bending?", options: ["Hardness", "Toughness", "Chroma", "Density"], correct: 1 },
    { id: 1098, question: "Which metal is commonly used in RPD frameworks?", options: ["Gold", "Nickel-chromium", "Amalgam", "Zinc"], correct: 1 },
    { id: 1099, question: "Which is NOT a function of metals in dentistry?", options: ["Crowns", "Bridges", "Denture bases", "Sealants"], correct: 3 },
    { id: 1100, question: "Which factor increases corrosion risk?", options: ["Dry oral cavity", "High acidity", "Gold usage", "Proper polishing"], correct: 1 },
    { id: 1101, question: "Why must PFM crowns be carefully matched in thermal expansion?", options: ["To improve color", "To prevent porcelain fracture", "To improve bonding", "To avoid mercury expansion"], correct: 1 },
    { id: 1102, question: "Titanium forms a protective oxide layer that:", options: ["Weakens the surface", "Increases corrosion", "Prevents corrosion", "Causes allergies"], correct: 2 },
    { id: 1103, question: "What is the main advantage of dental amalgam?", options: ["Excellent esthetics", "High flexibility", "High strength and durability", "Chemical bonding to tooth"], correct: 2 },
    { id: 1104, question: "What is the main disadvantage of dental amalgam?", options: ["Weak under chewing forces", "Poor durability", "Poor esthetics (silver color)", "Not resistant to moisture"], correct: 2 },
    { id: 1105, question: "What type of alloy is most commonly used in modern amalgam?", options: ["Low-copper amalgam", "High-copper amalgam", "Zinc-only amalgam", "Palladium-only amalgam"], correct: 1 },
    { id: 1106, question: "What does \"creep\" in amalgam mean?", options: ["Sudden fracture", "Color change of surface", "Slow deformation under chewing forces", "Expansion due to moisture"], correct: 2 },
    { id: 1107, question: "What does tarnish refer to in dental amalgam?", options: ["Deep internal corrosion", "Surface discoloration only", "Complete fracture of restoration", "Expansion of restoration"], correct: 1 },
    { id: 1108, question: "Why is a liner or base used under deep amalgam restorations?", options: ["To improve esthetics", "To increase bonding", "To protect the pulp from temperature changes", "To reduce creep"], correct: 2 },
    { id: 1109, question: "What is the purpose of a matrix system in Class II restorations?", options: ["To whiten the tooth", "To block saliva", "To recreate proximal walls and proper contours", "To strengthen enamel"], correct: 2 },
    { id: 1110, question: "Why are overhangs dangerous?", options: ["They change tooth color", "They trap plaque and increase periodontal disease risk", "They improve contact", "They prevent corrosion"], correct: 1 },
    { id: 1111, question: "How long does an amalgam restoration take to reach full strength?", options: ["1 hour", "6 hours", "12 hours", "About 24 hours"], correct: 3 },
    { id: 1112, question: "What is the biggest health risk related to mercury in dentistry?", options: ["Swallowed mercury", "Skin contact", "Mercury vapor inhalation", "Taste alteration"], correct: 2 },
    { id: 1575, question: "The chemical name of gypsum is:", options: ["Calcium carbonate", "Calcium sulfate dihydrate", "Sodium sulfate", "Potassium chloride"], correct: 1 },
    { id: 1576, question: "An impression is a:", options: ["Positive reproduction", "Negative reproduction", "Final cast", "Study model"], correct: 1 },
    { id: 1577, question: "A cast is a:", options: ["Negative reproduction", "Temporary reproduction", "Positive reproduction", "Preliminary reproduction"], correct: 2 },
    { id: 1578, question: "The main reason gypsum is used in dentistry is to:", options: ["Disinfect impressions", "Fabricate trays", "Produce accurate casts", "Seal restorations"], correct: 2 },
    { id: 1579, question: "The number one factor that affects the accuracy of a cast is:", options: ["Color of the stone", "Storage temperature", "Water–powder ratio", "Mixing speed"], correct: 2 },
    { id: 1580, question: "Calcination is the process of:", options: ["Mixing gypsum with water", "Cooling gypsum", "Heating gypsum to remove water", "Hardening gypsum"], correct: 2 },
    { id: 1581, question: "The hardening of gypsum is an example of a(n):", options: ["Endothermic reaction", "Exothermic reaction", "Mechanical reaction", "Physical change"], correct: 1 },
    { id: 1582, question: "The byproduct released during the hardening of gypsum is:", options: ["Oxygen", "Alcohol", "Heat", "Acid"], correct: 2 },
    { id: 1583, question: "The strongest type of gypsum is:", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 3 },
    { id: 1584, question: "The weakest type of gypsum is:", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 1 },
    { id: 1585, question: "If too much water is added to gypsum, the final cast will be:", options: ["Stronger", "Harder", "Weaker", "More accurate"], correct: 2 },
    { id: 1586, question: "Rounded gypsum particles result in:", options: ["Stronger casts", "Weaker casts", "Faster setting", "Greater expansion"], correct: 1 },
    { id: 1587, question: "Strength and hardness of gypsum primarily depend on:", options: ["Color and odor", "Water–powder ratio and particle shape", "Storage container", "Disinfectant used"], correct: 1 },
    { id: 1588, question: "Dimensional accuracy refers to:", options: ["Surface smoothness", "Color stability", "Ability to reproduce exact size", "Resistance to tearing"], correct: 2 },
    { id: 1589, question: "Initial set of gypsum occurs when:", options: ["The material is still fluid and glossy", "The surface loses gloss and becomes rigid", "Final expansion is complete", "The cast fractures"], correct: 1 },
    { id: 1590, question: "Final set of gypsum is characterized by:", options: ["Continued flow", "Complete hardening and no heat release", "High moisture content", "Immediate trimming"], correct: 1 },
    { id: 1591, question: "The anatomic portion of a cast includes:", options: ["The base of the cast", "The teeth and oral structures", "The trimming area", "The tray outline"], correct: 1 },
    { id: 1592, question: "The art portion of a cast refers to:", options: ["The teeth", "The gingiva", "The base of the cast", "The occlusal surface"], correct: 2 },
    { id: 1593, question: "The best way to avoid air bubbles when pouring a cast is to:", options: ["Pour rapidly", "Vibrate gently while pouring slowly", "Tilt the impression upside down", "Add extra water"], correct: 1 },
    { id: 1594, question: "The double-pour method means:", options: ["Pouring the cast all at once", "Pouring the anatomic portion first, then the base", "Using two impressions", "Mixing two types of gypsum"], correct: 1 },
    { id: 1595, question: "When separating the cast from the impression, you should:", options: ["Twist forcefully", "Pull sharply in different directions", "Gently rock and remove in one direction", "Freeze the impression"], correct: 2 },
    { id: 1596, question: "The purpose of trimming a cast is to:", options: ["Increase hardness", "Improve color", "Create proper shape and proportions", "Speed up the set"], correct: 2 },
    { id: 1597, question: "Gypsum powder should be stored:", options: ["In a humid environment", "In open air", "In a sealed, dry container", "In the refrigerator"], correct: 2 },
    { id: 1598, question: "If gypsum powder is exposed to moisture before use, it will:", options: ["Become stronger", "Set faster and lose strength", "Become more accurate", "Have no change"], correct: 1 },
    { id: 1599, question: "Impressions must be disinfected:", options: ["After pouring the cast", "Before pouring the cast"], correct: 1 },
    { id: 1600, question: "Which gypsum product is most commonly used for study models?", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 2 },
    { id: 1601, question: "Which gypsum product is primarily used for working casts for crowns and bridges?", options: ["Type I", "Type II", "Type III", "Type IV"], correct: 3 },
    { id: 1602, question: "Increasing the water–powder ratio will result in:", options: ["Faster set and greater strength", "Slower set and weaker cast", "Faster set and stronger cast", "No effect on strength"], correct: 1 },
    { id: 1603, question: "Which factor increases the strength of a gypsum cast?", options: ["Excess water", "Proper water–powder ratio", "Rounded particles", "High humidity"], correct: 1 },
    { id: 1604, question: "Gypsum expansion occurs mainly during:", options: ["Initial set", "Final set", "Trimming", "Storage"], correct: 1 },
    { id: 1605, question: "The purpose of boxing an impression is to:", options: ["Strengthen the cast", "Create a base around the impression", "Disinfect the impression", "Speed up the setting time"], correct: 1 },
    { id: 1606, question: "Which of the following helps improve reproduction of fine detail in a gypsum cast?", options: ["High humidity", "Proper vibration during pouring", "Extra water", "Rapid pouring"], correct: 1 },
    { id: 1607, question: "The main cause of air bubbles in a gypsum cast is:", options: ["Old gypsum powder", "Improper vibration", "Excess tray adhesive", "Over-trimming"], correct: 1 },
    { id: 1608, question: "Which portion of the cast represents the support and base?", options: ["Anatomic portion", "Occlusal portion", "Art portion", "Functional portion"], correct: 2 },
    { id: 1609, question: "Which statement about the single-step pour method is correct?", options: ["Only the base is poured", "The anatomic portion and base are poured at the same time", "It requires two separate pours", "It requires boxing wax"], correct: 1 },
    { id: 1610, question: "When is the best time to separate a cast from the impression?", options: ["Immediately after mixing", "During the initial set", "After the final set", "Before trimming"], correct: 2 },
    { id: 1611, question: "Over-vibration during pouring may cause:", options: ["Increased strength", "Air entrapment", "Separation of gypsum and water", "Reduced expansion"], correct: 2 },
    { id: 1612, question: "Which factor can cause distortion of the final cast?", options: ["Correct mixing time", "Delayed separation", "Improper removal from the impression", "Proper water–powder ratio"], correct: 2 },
    { id: 1613, question: "The purpose of trimming the cast is to:", options: ["Increase setting speed", "Improve esthetics and proportions", "Increase expansion", "Disinfect the stone"], correct: 1 },
    { id: 1614, question: "Which statement about gypsum storage is correct?", options: ["Gypsum should be stored in open containers", "Gypsum should be stored in a warm, humid area", "Gypsum should be stored in a sealed, dry container", "Gypsum should be refrigerated"], correct: 2 },
    { id: 1615, question: "Exposure of gypsum powder to moisture before use will:", options: ["Improve its strength", "Delay setting", "Cause premature setting and weaken the cast", "Have no effect"], correct: 2 },
    { id: 1616, question: "Which of the following improves the dimensional accuracy of a gypsum cast?", options: ["Excess water", "Rapid mixing", "Correct water–powder ratio", "High humidity"], correct: 2 },
    { id: 1617, question: "The double-pour method is preferred because it:", options: ["Reduces air bubbles", "Creates a stronger base", "Allows better control of the anatomic portion", "Eliminates trimming"], correct: 2 },
    { id: 1618, question: "Which of the following is a sign that gypsum has reached the initial set?", options: ["Surface becomes glossy", "Surface loses its shine and becomes dull", "Cast becomes very hot", "Final hardness is reached"], correct: 1 },
    { id: 1619, question: "Improper trimming of a cast may result in:", options: ["Better accuracy", "Improved strength", "Loss of important anatomic landmarks", "Increased setting speed"], correct: 2 }
  ],
  "1. Periodontal Anatomy": [
    { id: 1113, question: "The gingiva is part of the oral mucosa that:", options: ["Covers the alveolar processes and surrounds the necks of the teeth", "Covers the tongue surface", "Lines the pharynx", "Covers the palate only"], correct: 0 },
    { id: 1114, question: "In health, the color of gingiva is usually:", options: ["Red", "Coral pink", "White", "Purple"], correct: 1 },
    { id: 1115, question: "The variation in gingival color depends primarily on:", options: ["Bone density", "Amount of melanin pigmentation", "Enamel shade", "Blood type"], correct: 1 },
    { id: 1116, question: "The mucogingival junction (MGJ) separates:", options: ["Free and attached gingiva", "Attached gingiva and alveolar mucosa", "Free gingiva and sulcular epithelium", "Oral and junctional epithelium"], correct: 1 },
    { id: 1117, question: "The movable, darker tissue below the MGJ is called:", options: ["Free gingiva", "Attached gingiva", "Alveolar mucosa", "Interdental papilla"], correct: 2 },
    { id: 1118, question: "The attached gingiva extends from the MGJ to the:", options: ["Gingival margin", "Cementoenamel junction (CEJ)", "Alveolar crest", "Sulcular epithelium"], correct: 0 },
    { id: 1119, question: "The MGJ is visible in all regions of the mouth except:", options: ["Buccal", "Palatal", "Lingual", "Interproximal"], correct: 1 },
    { id: 1120, question: "The color of healthy attached gingiva is typically:", options: ["Light coral pink", "Bright red", "Dark blue", "White"], correct: 0 },
    { id: 1121, question: "Melanin pigmentation in gingiva is:", options: ["A sign of disease", "Common and normal in darker-skinned individuals", "Always caused by calculus", "Due to poor brushing"], correct: 1 },
    { id: 1122, question: "Stippling refers to:", options: ["Smooth surface of inflamed gingiva", "Orange-peel–like texture seen in healthy attached gingiva", "White line along the gingival margin", "Bumpy appearance due to calculus"], correct: 1 },
    { id: 1123, question: "Stippling is most visible when:", options: ["The tissue is wet", "The tissue is dry", "The gingiva is inflamed", "After brushing"], correct: 1 },
    { id: 1124, question: "The absence of stippling can indicate:", options: ["Health", "Past or present inflammation", "Presence of melanin", "Overkeratinization"], correct: 1 },
    { id: 1125, question: "Stippling occurs only on:", options: ["Free gingiva", "Attached gingiva", "Alveolar mucosa", "Sulcular epithelium"], correct: 1 },
    { id: 1126, question: "The shape of healthy interdental papilla is determined by:", options: ["Tooth shape and contact points", "Color of the enamel", "Presence of pigmentation", "Oral hygiene habits only"], correct: 0 },
    { id: 1127, question: "The tissue between two adjacent teeth that fills the embrasure space is called:", options: ["Marginal gingiva", "Interdental papilla", "Attached gingiva", "Alveolar mucosa"], correct: 1 },
    { id: 1128, question: "The concave depression between facial and lingual papillae beneath the contact area is called:", options: ["Col", "Groove", "Sulcus", "Margin"], correct: 0 },
    { id: 1129, question: "The col area is usually:", options: ["Keratinized", "Non-keratinized", "Heavily pigmented", "Stippled"], correct: 1 },
    { id: 1130, question: "A high frenum attachment near the gingival margin may cause:", options: ["Gingival recession", "Keratinization", "Increased pigmentation", "Stippling"], correct: 0 },
    { id: 1131, question: "The edge of the gingiva that forms the soft tissue wall of the gingival sulcus is called:", options: ["Attached gingiva", "Free gingiva", "Alveolar mucosa", "Gingival col"], correct: 1 },
    { id: 1132, question: "Healthy free gingiva has which contour at the margin?", options: ["Rounded and bulbous", "Knife-edged and firm", "Ulcerated", "Irregular"], correct: 1 },
    { id: 1133, question: "The oral (outer) epithelium covers which parts of the gingiva?", options: ["Only the sulcus", "The outer surface of free and attached gingiva", "The alveolar bone", "The tooth root surface"], correct: 1 },
    { id: 1134, question: "The primary function of the oral epithelium is:", options: ["Absorption of nutrients", "Protection from mechanical and microbial injury", "Secretion of saliva", "Production of enamel"], correct: 1 },
    { id: 1135, question: "The oral epithelium is usually:", options: ["Non-keratinized", "Parakeratinized or keratinized", "Lined by ciliated cells", "Covered by enamel"], correct: 1 },
    { id: 1136, question: "Keratinization of the oral epithelium provides:", options: ["Flexibility and moisture", "Resistance to mechanical forces", "Soft and thin texture", "Increased pigmentation"], correct: 1 },
    { id: 1137, question: "The most keratinized area in the mouth is the:", options: ["Buccal mucosa", "Palatal gingiva", "Sulcular epithelium", "Alveolar mucosa"], correct: 1 },
    { id: 1138, question: "The least keratinized area in the mouth is the:", options: ["Palatal mucosa", "Buccal mucosa", "Attached gingiva", "Free gingiva"], correct: 1 },
    { id: 1139, question: "The sulcular epithelium lines:", options: ["The outer surface of the gingiva", "The inner wall of the gingival sulcus", "The alveolar bone", "The root apex"], correct: 1 },
    { id: 1140, question: "The sulcular epithelium is normally:", options: ["Keratinized", "Parakeratinized", "Non-keratinized", "Pigmented"], correct: 2 },
    { id: 1141, question: "The sulcular epithelium joins the junctional epithelium at the:", options: ["Cementoenamel junction", "Base of the gingival sulcus", "Alveolar crest", "Gingival margin"], correct: 1 },
    { id: 1142, question: "The main function of the sulcular epithelium is to:", options: ["Absorb nutrients", "Act as a barrier and allow gingival crevicular fluid flow", "Form enamel", "Produce saliva"], correct: 1 },
    { id: 1143, question: "Gingival crevicular fluid (GCF) functions to:", options: ["Nourish the enamel", "Cleanse the sulcus and provide immune defense", "Reduce salivary flow", "Transport oxygen"], correct: 1 },
    { id: 1144, question: "GCF is typically:", options: ["Opaque", "Yellow", "Clear", "Thick and solid"], correct: 2 },
    { id: 1145, question: "When inflammation is present, the amount of gingival crevicular fluid:", options: ["Decreases", "Increases", "Remains unchanged", "Dries out"], correct: 1 },
    { id: 1146, question: "The junctional epithelium (JE) is located:", options: ["Above the gingival margin", "At the base of the sulcus, near the CEJ", "On the palate", "Between alveolar bone and cementum"], correct: 1 },
    { id: 1147, question: "The junctional epithelium is attached to the tooth surface by:", options: ["Desmosomes only", "Hemidesmosomes and the basal lamina", "Collagen fibers", "Enamel rods"], correct: 1 },
    { id: 1148, question: "Which of the following best describes the sulcular epithelium?", options: ["Keratinized epithelium lining the outer gingiva", "Non-keratinized epithelium lining the gingival sulcus", "Junctional epithelium attached to the tooth", "Connective tissue beneath the gingiva"], correct: 1 },
    { id: 1149, question: "Which type of epithelium directly attaches to the tooth surface?", options: ["Oral (outer) epithelium", "Sulcular epithelium", "Junctional epithelium", "Alveolar mucosa"], correct: 2 },
    { id: 1150, question: "The sulcular epithelium and junctional epithelium are both:", options: ["Keratinized", "Parakeratinized", "Non-keratinized", "Highly keratinized"], correct: 2 },
    { id: 1151, question: "Which statement about the junctional epithelium is TRUE?", options: ["It has many layers of keratinized cells.", "It is attached to the tooth via hemidesmosomes and basal lamina.", "It has rete pegs extending into connective tissue.", "It is located above the sulcus."], correct: 1 },
    { id: 1152, question: "Which statement best differentiates the sulcular epithelium from the junctional epithelium?", options: ["Sulcular epithelium is attached to the tooth, while junctional is not.", "Sulcular epithelium is non-keratinized, while junctional is keratinized.", "Sulcular epithelium lines the sulcus; junctional epithelium attaches at the base of the sulcus.", "Both are keratinized in healthy tissue."], correct: 2 },
    { id: 1153, question: "The junctional epithelium is:", options: ["Thick and keratinized", "Thin and non-keratinized", "Pigmented", "Composed of cementoblasts"], correct: 1 },
    { id: 1154, question: "The permeability of the junctional epithelium allows:", options: ["Movement of gingival crevicular fluid and defense cells", "Tooth mobility", "Enamel formation", "Pigment production"], correct: 0 },
    { id: 1155, question: "Trauma from probing too deeply can cause:", options: ["Parakeratinization of the outer gingiva", "Penetration and damage to the junctional epithelium", "Melanin pigmentation", "Gingival keratosis"], correct: 1 },
    { id: 1156, question: "Bacterial invasion through a damaged junctional epithelium can lead to:", options: ["Formation of a periodontal pocket", "Increased keratinization", "Healing and tightening", "Tooth whitening"], correct: 0 },
    { id: 1157, question: "The main role of the junctional epithelium is to:", options: ["Produce collagen fibers", "Provide a seal between tooth and gingiva to protect deeper tissues", "Form enamel rods", "Anchor bone to cementum"], correct: 1 },
    { id: 1158, question: "The gingival connective tissue is also called the:", options: ["Lamina propria", "Basal lamina", "Junctional attachment", "Periodontal ligament"], correct: 0 },
    { id: 1159, question: "The lamina propria provides:", options: ["Nutrients for enamel", "Structural support for the epithelium", "Hard tissue formation", "Immune suppression"], correct: 1 },
    { id: 1160, question: "The lamina propria consists primarily of:", options: ["Ameloblasts", "Collagen fibers", "Enamel rods", "Cementoblasts"], correct: 1 },
    { id: 1161, question: "Approximately what percentage of the lamina propria is made of connective tissue fibers?", options: ["20%", "40%", "60%", "80%"], correct: 2 },
    { id: 1162, question: "The majority of fibers in the lamina propria are composed of:", options: ["Elastin", "Collagen", "Reticular fibers", "Actin"], correct: 1 },
    { id: 1163, question: "The papillary layer of the lamina propria:", options: ["Lies beneath the epithelium and contains rete pegs", "Forms the alveolar bone", "Contains dentinal tubules", "Lines the sulcular epithelium"], correct: 0 },
    { id: 1164, question: "The deeper layer of the lamina propria is the:", options: ["Rete peg layer", "Reticular layer", "Basal layer", "Alveolar layer"], correct: 1 },
    { id: 1165, question: "The primary function of the reticular layer is to:", options: ["Provide pigmentation", "Attach gingiva to underlying bone", "Produce saliva", "Absorb nutrients"], correct: 1 },
    { id: 1166, question: "Rete pegs are:", options: ["Pigment granules in the gingiva", "Epithelial projections into the connective tissue", "Bone spicules", "Blood vessels"], correct: 1 },
    { id: 1167, question: "The rete pegs function to:", options: ["Reduce blood flow", "Strengthen the connection between epithelium and connective tissue", "Produce keratin", "Create pigmentation"], correct: 1 },
    { id: 1168, question: "Visible stippling of the gingiva corresponds to:", options: ["The surface openings of salivary ducts", "The presence of rete pegs and connective tissue attachments", "The junctional epithelium", "Bone resorption"], correct: 1 },
    { id: 1169, question: "If rete pegs are destroyed due to disease, the gingiva becomes:", options: ["More stippled", "Smooth and shiny", "Pigmented", "Keratinized"], correct: 1 },
    { id: 1170, question: "Healthy gingival epithelium with visible stippling indicates:", options: ["Inflammation", "Poor oral hygiene", "Tissue resilience and health", "Pigment loss"], correct: 2 },
    { id: 1171, question: "The lamina propria contains which type of cells in addition to collagen fibers?", options: ["Fibroblasts and macrophages", "Ameloblasts and odontoblasts", "Cementocytes and osteocytes", "Enameloblasts"], correct: 0 },
    { id: 1172, question: "Fibroblasts in the gingival connective tissue are responsible for:", options: ["Enamel formation", "Collagen production and maintenance", "Melanin secretion", "Bone resorption"], correct: 1 },
    { id: 1173, question: "Keratinization refers to:", options: ["The loss of pigment", "The formation of a tough, protective surface layer of cells", "The attachment of gingiva to bone", "The production of collagen"], correct: 1 },
    { id: 1174, question: "Parakeratinized epithelium differs from orthokeratinized because:", options: ["It contains nuclei in surface cells", "It lacks any keratin", "It is thicker and pigmented", "It produces enamel"], correct: 0 },
    { id: 1175, question: "The degree of gingival keratinization is influenced by:", options: ["Tooth brushing habits and frictional forces", "Enamel thickness", "Bone density", "Saliva pH"], correct: 0 },
    { id: 1176, question: "Increased keratinization occurs in areas:", options: ["Not exposed to friction", "With greater masticatory stress", "With inflammation", "Lacking rete pegs"], correct: 1 },
    { id: 1177, question: "Loss of keratinization makes the gingiva more:", options: ["Resistant to injury", "Susceptible to trauma and infection", "Pigmented", "Calcified"], correct: 1 },
    { id: 1178, question: "The periodontal ligament (PDL) connects:", options: ["Enamel to dentin", "Cementum to alveolar bone", "Gingiva to enamel", "Bone to mucosa"], correct: 1 },
    { id: 1179, question: "The main function of the PDL is to:", options: ["Store calcium", "Anchor the tooth and absorb occlusal forces", "Produce enamel", "Seal dentinal tubules"], correct: 1 },
    { id: 1180, question: "The average width of the PDL space in health is approximately:", options: ["0.05 mm", "0.2 mm", "1.0 mm", "2.0 mm"], correct: 1 },
    { id: 1181, question: "Cells found in the periodontal ligament include all EXCEPT:", options: ["Fibroblasts", "Cementoblasts", "Ameloblasts", "Osteoblasts"], correct: 2 },
    { id: 1182, question: "The principal fibers of the PDL are composed primarily of:", options: ["Reticular fibers", "Elastic fibers", "Collagen", "Actin"], correct: 2 },
    { id: 1183, question: "The PDL helps resist:", options: ["Tooth eruption", "Masticatory and occlusal forces", "Enamel attrition", "Bone mineralization"], correct: 1 },
    { id: 1184, question: "Which of the following is NOT a principal fiber group of the PDL?", options: ["Oblique", "Apical", "Circular", "Interradicular"], correct: 2 },
    { id: 1185, question: "The oblique fiber group resists which type of force?", options: ["Horizontal", "Vertical or occlusal compressive forces", "Lateral shear", "Rotational"], correct: 1 },
    { id: 1186, question: "The apical fiber group helps:", options: ["Prevent the tooth from being pushed deeper into bone", "Resist horizontal movement", "Attach gingiva to cementum", "Form enamel"], correct: 0 },
    { id: 1187, question: "The alveolar crest fibers run:", options: ["From cementum to alveolar crest", "Horizontally between roots", "Parallel to gingival margin", "Around tooth circumference"], correct: 0 },
    { id: 1188, question: "The interradicular fibers are found only in:", options: ["Incisors", "Multirooted teeth", "Mandibular canines", "Single-rooted premolars"], correct: 1 },
    { id: 1189, question: "The PDL contains which type of nerves?", options: ["Only sympathetic", "Sensory and proprioceptive", "Autonomic only", "None"], correct: 1 },
    { id: 1190, question: "Cementum covers which part of the tooth?", options: ["Enamel", "Dentin of the root", "Pulp", "Gingiva"], correct: 1 },
    { id: 1191, question: "The primary role of cementum is to:", options: ["Form enamel", "Anchor PDL fibers to the tooth", "Resorb bone", "Protect gingiva"], correct: 1 },
    { id: 1192, question: "Cementum is most similar in composition to:", options: ["Enamel", "Bone", "Dentin", "Cartilage"], correct: 1 },
    { id: 1193, question: "Hydroxyapatite makes up approximately what percent of the inorganic content of cementum?", options: ["25%", "35%", "45–50%", "75%"], correct: 2 },
    { id: 1194, question: "Which of the following is TRUE about cementum?", options: ["It is vascular and contains nerves", "It is avascular and receives nutrients from the PDL", "It has enamel rods", "It resorbs easily like dentin"], correct: 1 },
    { id: 1195, question: "Functions of cementum include all of the following EXCEPT:", options: ["Anchoring the teeth", "Maintaining occlusal relationships", "Providing a seal for dentinal tubules", "Forming new enamel"], correct: 3 },
    { id: 1196, question: "The alveolar bone proper lines the tooth socket and is also known as:", options: ["Cortical plate", "Cribriform plate", "Basal bone", "Spongiosa"], correct: 1 },
    { id: 1197, question: "The crest of the alveolar process in health is located:", options: ["1–2 mm apical to the cementoenamel junction (CEJ)", "At the CEJ", "3–4 mm apical to the CEJ", "Level with enamel surface"], correct: 0 },
    { id: 1198, question: "The main blood supply to the periodontium comes from the:", options: ["Facial and lingual arteries", "Alveolar bone marrow", "PDL capillaries only", "Submental vein"], correct: 0 },
    { id: 1199, question: "Branches of these vessels extend into:", options: ["Cementum", "The central alveolar bone and periosteum", "Gingival sulcus", "Enamel rods"], correct: 1 },
    { id: 1200, question: "Some branches of the periodontal blood supply terminate in:", options: ["Capillary loops in gingival connective tissue near the epithelium", "Bone marrow spaces", "Tooth pulp", "Oral mucosa only"], correct: 0 },
    { id: 1201, question: "The major function of the gingival blood supply is to:", options: ["Nourish enamel", "Supply oxygen and nutrients, remove waste, and defend against infection", "Resorb bone", "Harden the gingiva"], correct: 1 },
    { id: 1202, question: "The capillary network is most dense in which area?", options: ["Alveolar bone", "Free gingiva and interdental papilla", "Enamel surface", "Tongue dorsum"], correct: 1 },
    { id: 1203, question: "The nerves that supply the periodontium are primarily branches of the:", options: ["Facial nerve (VII)", "Trigeminal nerve (V)", "Glossopharyngeal nerve (IX)", "Hypoglossal nerve (XII)"], correct: 1 },
    { id: 1204, question: "The PDL nerve endings function to provide:", options: ["Salivation", "Pain, touch, and pressure sensations", "Muscle movement", "Secretion control"], correct: 1 },
    { id: 1205, question: "The gingival ligament fibers are located within:", options: ["The cementum only", "The gingival connective tissue (lamina propria)", "The alveolar bone", "The enamel surface"], correct: 1 },
    { id: 1206, question: "The dentogingival fiber group extends from:", options: ["Alveolar crest to cementum", "Cementum near CEJ into the free gingiva", "Bone to bone", "Dentin to pulp"], correct: 1 },
    { id: 1207, question: "The circular fiber group:", options: ["Encircles the tooth within the free gingiva", "Runs diagonally across bone", "Attaches to dentin", "Runs apically to the root tip"], correct: 0 },
    { id: 1208, question: "The alveologingival fibers extend from:", options: ["Cementum to gingival margin", "Alveolar crest into the free gingiva", "Dentin to enamel", "Pulp to bone"], correct: 1 },
    { id: 1209, question: "The dentoperiosteal fibers run from:", options: ["Cementum, over the alveolar crest, to the periosteum", "Bone marrow to pulp", "Gingiva to enamel", "Epithelium to bone"], correct: 0 },
    { id: 1210, question: "The transseptal fiber group connects:", options: ["Adjacent teeth across the interdental septum", "Cementum to gingiva", "PDL to bone", "Enamel to enamel"], correct: 0 },
    { id: 1211, question: "The main difference between gingival and periodontal fiber groups is:", options: ["Cell type", "Location—gingival in gingiva; periodontal in bone", "Chemical composition", "Blood supply"], correct: 1 },
    { id: 1212, question: "Gingival fibers help to:", options: ["Attach tooth to bone", "Maintain the contour and position of the gingiva", "Form cementum", "Absorb chewing forces"], correct: 1 },
    { id: 1213, question: "Physiologic mesial migration (drift) refers to:", options: ["Abnormal tooth movement due to bone loss", "Normal tooth movement toward the midline over time", "Tooth eruption", "Tooth rotation"], correct: 1 },
    { id: 1214, question: "Physiologic mesial migration allows the dentition to:", options: ["Compensate for wear and maintain contact", "Loosen over time", "Develop diastemas", "Rotate posteriorly"], correct: 0 },
    { id: 1215, question: "During mesial migration, bone resorption occurs along which surface?", options: ["Distal", "Mesial (pressure side)", "Buccal", "Lingual"], correct: 1 },
    { id: 1216, question: "Bone deposition occurs on which surface during mesial drift?", options: ["Mesial", "Distal (tension side)", "Occlusal", "Apical"], correct: 1 },
    { id: 1217, question: "The cells responsible for bone resorption and deposition during tooth movement are:", options: ["Odontoblasts and ameloblasts", "Osteoclasts and osteoblasts", "Fibroblasts and keratinocytes", "Cementocytes and epithelial cells"], correct: 1 },
    { id: 1218, question: "What is an antigen?", options: ["A harmful organism", "A molecule that triggers an immune response", "A protein that neutralizes pathogens", "A hormone in saliva"], correct: 1 },
    { id: 1219, question: "What is an antibody?", options: ["A blood vessel", "A protein produced by B cells to bind and neutralize antigens", "A digestive enzyme", "A nerve transmitter"], correct: 1 },
    { id: 1220, question: "What is a pathogen?", options: ["Any microorganism capable of causing disease", "A harmless commensal bacterium", "A dental restoration", "A nutrient source"], correct: 0 },
    { id: 1221, question: "Microbial assault from dental plaque biofilms means:", options: ["Attack on bacteria by toothpaste", "Damage caused by microbial toxins in plaque to periodontal tissues", "Immune cells damaging enamel", "Food particles irritating gums"], correct: 1 },
    { id: 1222, question: "The host response refers to:", options: ["The body's reaction to microbial invasion", "The bacterial metabolism", "Enzyme secretion by plaque", "Tooth movement"], correct: 0 },
    { id: 1223, question: "Which cells act as the body's scavengers by engulfing pathogens?", options: ["Lymphocytes", "Macrophages", "Basophils", "Osteoblasts"], correct: 1 },
    { id: 1224, question: "What are polymorphonuclear leukocytes (PMNs)?", options: ["Red blood cells", "Neutrophils that provide the first line of defense", "Plasma cells", "Platelets"], correct: 1 },
    { id: 1225, question: "PMNs are particularly attracted to periodontal lesions through:", options: ["Osmosis", "Chemotaxis", "Diffusion", "Active transport"], correct: 1 },
    { id: 1226, question: "Macrophages gather up antigens and present them to:", options: ["Neutrophils", "Lymphocytes", "Platelets", "Erythrocytes"], correct: 1 },
    { id: 1227, question: "Blastogenesis refers to:", options: ["Cell death", "Cell division to increase lymphocyte numbers", "Protein degradation", "Bone resorption"], correct: 1 },
    { id: 1228, question: "Cell disintegration is referred to as:", options: ["Cytokinesis", "Lysis", "Phagocytosis", "Apoptosis"], correct: 1 },
    { id: 1229, question: "Cytokines are:", options: ["Structural proteins", "Signaling molecules regulating immune and inflammatory responses", "Nerve transmitters", "Digestive enzymes"], correct: 1 },
    { id: 1230, question: "Which cells release histamine and play a role in allergic reactions?", options: ["Mast cells and basophils", "Neutrophils and macrophages", "Fibroblasts and keratinocytes", "Osteoblasts and osteoclasts"], correct: 0 },
    { id: 1231, question: "What is the function of eosinophils?", options: ["Engulf bacteria", "Defend against parasites and modulate allergic inflammation", "Produce antibodies", "Build collagen"], correct: 1 },
    { id: 1232, question: "Basophils mainly release:", options: ["Collagen", "Histamine and heparin", "Cytokines only", "Calcium"], correct: 1 },
    { id: 1233, question: "The immune response that acts immediately and non-specifically is called:", options: ["Adaptive immunity", "Innate immunity", "Passive immunity", "Acquired immunity"], correct: 1 },
    { id: 1234, question: "The adaptive immune response is characterized by:", options: ["Memory and specificity for antigens", "Immediate action without memory", "Only mechanical defense", "No antibody production"], correct: 0 },
    { id: 1235, question: "B lymphocytes function mainly by:", options: ["Phagocytosis", "Producing antibodies", "Releasing histamine", "Breaking down bone"], correct: 1 },
    { id: 1236, question: "T lymphocytes function mainly by:", options: ["Producing collagen", "Directly attacking infected cells and coordinating immune responses", "Forming antibodies", "Transporting oxygen"], correct: 1 },
    { id: 1237, question: "The activation of osteoclasts during periodontal inflammation leads to:", options: ["Bone deposition", "Alveolar bone destruction", "Tooth calcification", "Enamel formation"], correct: 1 },
    { id: 1238, question: "\"Cause destruction of alveolar bone by inducing osteoclastic activity\" refers to:", options: ["Cytokine function", "Fibroblast repair", "Lymphocyte proliferation", "Enamel resorption"], correct: 0 },
    { id: 1239, question: "Which cytokine is most associated with bone resorption in periodontal disease?", options: ["IL-10", "TNF-α", "Growth hormone", "Histamine"], correct: 1 },
    { id: 1240, question: "What happens when neutrophils reach the site of infection?", options: ["They secrete antibodies", "They perform phagocytosis and then die", "They divide repeatedly", "They become fibroblasts"], correct: 1 },
    { id: 1241, question: "The accumulation of dead neutrophils at a site of infection results in:", options: ["Plaque", "Pus (suppuration)", "Enamel formation", "Bone calcification"], correct: 1 },
    { id: 1242, question: "Macrophages differ from neutrophils because they:", options: ["Are smaller and die quickly", "Are long-lived and initiate immune signaling", "Cannot phagocytose", "Form antibodies"], correct: 1 },
    { id: 1243, question: "The complement system helps defend against pathogens by:", options: ["Neutralizing antibodies", "Enhancing phagocytosis and cell lysis", "Breaking down enamel", "Producing hormones"], correct: 1 },
    { id: 1244, question: "During inflammation, vasodilation is caused mainly by:", options: ["Cytokines", "Histamine from mast cells", "Bone resorption", "Collagen cross-linking"], correct: 1 },
    { id: 1245, question: "Excessive or chronic immune response in the periodontium can lead to:", options: ["Tissue healing", "Collagen destruction and bone loss", "Tooth remineralization", "Gum pigmentation"], correct: 1 },
    { id: 1246, question: "The host immune system in periodontal disease aims to:", options: ["Eliminate all bacteria", "Control bacterial levels while minimizing tissue damage", "Promote inflammation indefinitely", "Stimulate plaque growth"], correct: 1 },
    { id: 1247, question: "In health, the balance between microbial challenge and host response results in:", options: ["Stable periodontium", "Continuous bone resorption", "Tooth mobility", "Gingival necrosis"], correct: 0 },
    { id: 1248, question: "The junctional epithelium attaches to the tooth surface via:", options: ["Desmosomes only", "Hemidesmosomes and the basal lamina", "Collagen fibrils", "Reticular fibers"], correct: 1 },
    { id: 1249, question: "The number of cell layers in the junctional epithelium is typically:", options: ["One or two", "A few layers (5–15 cells thick)", "Over 50 layers", "Variable depending on enamel type"], correct: 1 },
    { id: 1250, question: "When the junctional epithelium is damaged or detached, the clinical result is:", options: ["Hyperkeratosis", "Periodontal pocket formation", "Bone deposition", "Cementum calcification"], correct: 1 },
    { id: 1251, question: "Gingival crevicular fluid (GCF) primarily functions to:", options: ["Deliver calcium to enamel", "Cleanse the sulcus and transport immune factors", "Harden the gingiva", "Resorb cementum"], correct: 1 },
    { id: 1252, question: "Which of the following is NOT a function of gingival crevicular fluid?", options: ["Antimicrobial defense", "Nutrient exchange", "Enamel formation", "Cleansing the sulcus"], correct: 2 },
    { id: 1253, question: "During inflammation, the amount of GCF:", options: ["Decreases", "Remains constant", "Increases significantly", "Stops completely"], correct: 2 },
    { id: 1254, question: "Rete pegs contribute to gingival stippling by:", options: ["Creating small projections of epithelium into connective tissue", "Depositing melanin granules", "Absorbing bacterial toxins", "Hardening the enamel"], correct: 0 },
    { id: 1255, question: "Stippling of the gingiva indicates:", options: ["Inflammation", "Healthy, resilient tissue supported by rete pegs", "Bone loss", "Hyperplasia"], correct: 1 },
    { id: 1256, question: "Loss of stippling usually suggests:", options: ["Excellent oral hygiene", "Current or previous gingival inflammation", "Increased keratinization", "Pigmentation"], correct: 1 },
    { id: 1257, question: "Which area of the oral cavity is the most keratinized?", options: ["Buccal mucosa", "Palatal gingiva", "Sulcular epithelium", "Inner lips"], correct: 1 },
    { id: 1258, question: "The least keratinized area of the mouth is the:", options: ["Cheek mucosa", "Palate", "Gingival margin", "Dorsal tongue"], correct: 0 },
    { id: 1259, question: "The free gingival groove separates:", options: ["Free and attached gingiva", "Alveolar mucosa and attached gingiva", "Cementum and enamel", "Sulcus and bone"], correct: 0 },
    { id: 1260, question: "In health, the sulcus depth typically measures:", options: ["0–1 mm", "1–3 mm", "3–5 mm", "5–7 mm"], correct: 1 },
    { id: 1261, question: "The lamina propria's papillary layer contains:", options: ["Collagen bundles only", "Vascular and neural elements with rete peg interdigitations", "Bone marrow", "Cementocytes"], correct: 1 },
    { id: 1262, question: "The reticular layer of the lamina propria lies:", options: ["Directly beneath the basal layer", "Closer to the periosteum and alveolar bone", "Within the sulcular epithelium", "Between enamel and dentin"], correct: 1 },
    { id: 1263, question: "The connective tissue of gingiva is composed of approximately:", options: ["80% collagen", "60% collagen fibers, 40% cellular and vascular components", "50% calcium salts", "30% fibroblasts"], correct: 1 },
    { id: 1264, question: "Fibroblasts are responsible for:", options: ["Phagocytosis of bacteria", "Collagen synthesis and tissue maintenance", "Bone resorption", "Antibody production"], correct: 1 },
    { id: 1265, question: "Parakeratinization following trauma occurs because:", options: ["Fibroblasts fail to produce collagen", "The tissue thickens as a protective response", "Blood supply is lost", "Enamel is damaged"], correct: 1 },
    { id: 1266, question: "Melanin pigmentation in gingiva:", options: ["Is always pathologic", "Is a normal physiologic variation providing UV protection", "Indicates necrosis", "Requires immediate treatment"], correct: 1 },
    { id: 1267, question: "Physiologic pigmentation can sometimes be misinterpreted as:", options: ["Caries", "Gingival disease or inflammation", "Keratinization", "Fibrosis"], correct: 1 },
    { id: 1268, question: "The alveolar bone proper is also known as:", options: ["Lamina dura or bundle bone", "Cortical plate", "Cancellous bone", "Trabecular matrix"], correct: 0 },
    { id: 1269, question: "The cortical plate refers to:", options: ["The outer compact bone of the alveolar process", "The inner porous bone surrounding the marrow", "The root surface of cementum", "The periodontal ligament"], correct: 0 },
    { id: 1270, question: "Fenestration refers to:", options: ["Bone loss exposing the root surface with an intact marginal bone", "Bone loss extending to the marginal crest", "Overgrowth of bone at the apex", "Thickening of cementum"], correct: 0 },
    { id: 1271, question: "When alveolar bone loss extends to the marginal bone, the defect is called:", options: ["Fenestration", "Dehiscence", "Hypercementosis", "Ankylosis"], correct: 1 },
    { id: 1272, question: "The periodontal ligament is innervated primarily by branches of the:", options: ["Facial nerve (VII)", "Trigeminal nerve (V)", "Glossopharyngeal nerve (IX)", "Hypoglossal nerve (XII)"], correct: 1 },
    { id: 1273, question: "Sensory nerve endings in the periodontal ligament detect:", options: ["Taste", "Pressure and proprioception", "Temperature", "Pain only"], correct: 1 },
    { id: 1274, question: "The main blood supply to the gingiva originates from:", options: ["Maxillary and inferior alveolar arteries", "Facial veins", "Lymphatic ducts", "Carotid sinus"], correct: 0 },
    { id: 1275, question: "Lymph from the gingiva drains primarily into:", options: ["Cervical spinal nodes", "Submandibular and submental lymph nodes", "Thoracic duct", "Internal jugular vein"], correct: 1 },
    { id: 1276, question: "Acellular cementum is typically found:", options: ["Near the root apex", "Covering the cervical third of the root", "In areas of repair", "On enamel surfaces"], correct: 1 },
    { id: 1277, question: "Cellular cementum contains:", options: ["No cementocytes", "Cementocytes trapped in lacunae", "Only Sharpey's fibers", "Only inorganic salts"], correct: 1 },
    { id: 1278, question: "During orthodontic tooth movement, bone resorption occurs on the:", options: ["Tension side", "Pressure side", "Apical area only", "Free gingival margin"], correct: 1 },
    { id: 1279, question: "Masticatory mucosa differs from lining mucosa because it:", options: ["Is nonkeratinized and loosely attached", "Is keratinized and firmly bound to bone", "Covers the lips and cheeks only", "Contains taste buds"], correct: 1 },
    { id: 1280, question: "The primary defense cells in the acute phase of periodontal inflammation are:", options: ["Macrophages", "Lymphocytes", "Polymorphonuclear leukocytes (PMNs)", "Plasma cells"], correct: 2 },
    { id: 1281, question: "PMNs migrate to sites of infection in response to chemical signals through a process called:", options: ["Phagocytosis", "Chemotaxis", "Blastogenesis", "Lysis"], correct: 1 },
    { id: 1282, question: "The function of PMNs in the periodontal lesion is to:", options: ["Produce antibodies", "Phagocytize bacteria and debris", "Secrete collagen", "Form new bone"], correct: 1 },
    { id: 1283, question: "The cell type primarily responsible for antigen presentation is the:", options: ["Neutrophil", "Macrophage", "Plasma cell", "Mast cell"], correct: 1 },
    { id: 1284, question: "Lymphocytes divide and increase their numbers in a process known as:", options: ["Chemotaxis", "Blastogenesis", "Phagocytosis", "Endocytosis"], correct: 1 },
    { id: 1285, question: "Plasma cells function mainly to:", options: ["Produce antibodies (immunoglobulins)", "Destroy bone through osteoclastic activity", "Secrete histamine", "Release cytokines"], correct: 0 },
    { id: 1286, question: "The antigen–antibody reaction results in:", options: ["Neutralization or destruction of the antigen", "Bone deposition", "Blood clot formation", "Cementum repair"], correct: 0 },
    { id: 1287, question: "The process of cell disintegration caused by enzymes or immune attack is called:", options: ["Lysis", "Apoptosis", "Diffusion", "Chemotaxis"], correct: 0 },
    { id: 1288, question: "Macrophages act as scavengers because they:", options: ["Stimulate fibroblast activity", "Engulf and digest damaged cells and bacteria", "Release antibodies", "Cause bone resorption"], correct: 1 },
    { id: 1289, question: "The cytokines released by macrophages primarily:", options: ["Inhibit inflammation", "Stimulate immune and inflammatory responses", "Promote keratinization", "Reduce vascular permeability"], correct: 1 },
    { id: 1290, question: "Which immune cell releases histamine and heparin during allergic or inflammatory reactions?", options: ["Plasma cell", "Mast cell", "Basophil", "Eosinophil"], correct: 1 },
    { id: 1291, question: "Cytokines, prostaglandins, and matrix metalloproteinases (MMPs) can:", options: ["Stimulate bone formation", "Cause destruction of alveolar bone and connective tissue", "Neutralize bacterial toxins", "Regenerate gingival fibers"], correct: 1 },
    { id: 1292, question: "Osteoclastic activity during periodontal inflammation is primarily induced by:", options: ["Cytokines and prostaglandins", "Antibodies", "Fibroblasts", "Sharpey's fibers"], correct: 0 },
    { id: 1293, question: "The overall host response to microbial biofilm aims to:", options: ["Promote bacterial colonization", "Protect tissues, but can cause collateral damage", "Inhibit all immune function", "Strengthen bone attachment"], correct: 1 },
    { id: 1294, question: "Basophils and eosinophils play a role in:", options: ["Antibody production", "Allergic and parasitic reactions", "Bone mineralization", "Collagen fiber synthesis"], correct: 1 },
    { id: 1295, question: "Gingival crevicular fluid (GCF) is primarily found in:", options: ["The alveolar bone", "The gingival sulcus", "The junctional epithelium", "The attached gingiva"], correct: 1 },
    { id: 1296, question: "Which of the following statements about GCF is true?", options: ["GCF flow decreases during inflammation", "GCF flow increases during inflammation", "GCF is unrelated to periodontal health", "GCF is produced only during trauma"], correct: 1 },
    { id: 1297, question: "GCF plays all the following roles except:", options: ["Flushing bacteria from the sulcus", "Providing antimicrobial action", "Enhancing epithelial attachment", "Stimulating bone resorption directly"], correct: 3 },
    { id: 1298, question: "The major components of GCF include:", options: ["Water, keratin, and calcium", "Serum, enzymes, and immune cells", "Cementoblasts and fibroblasts", "Mucous, saliva, and bacteria"], correct: 1 },
    { id: 1299, question: "Clinically, GCF measurement is useful because:", options: ["It indicates the color of the gingiva", "It reflects inflammatory activity within the sulcus", "It determines tooth vitality", "It identifies cementum thickness"], correct: 1 },
    { id: 1300, question: "The junctional epithelium attaches to the tooth surface by:", options: ["Desmosomes", "Hemidesmosomes and internal basal lamina", "Gap junctions", "Tight junctions"], correct: 1 },
    { id: 1301, question: "The junctional epithelium differs from other oral epithelia because it:", options: ["Has many cell layers and rete pegs", "Is keratinized", "Has fewer cell layers and is non-keratinized", "Contains no basal lamina"], correct: 2 },
    { id: 1302, question: "The rapid turnover rate of the junctional epithelium helps to:", options: ["Maintain a bacterial barrier through renewal", "Increase collagen thickness", "Form rete pegs", "Strengthen cementum"], correct: 0 },
    { id: 1303, question: "Which part of the junctional epithelium faces the connective tissue?", options: ["Internal basal lamina", "External basal lamina", "Sulcular wall", "Apical cell layer"], correct: 1 },
    { id: 1304, question: "The principal cell type found in the periodontal ligament is the:", options: ["Osteocyte", "Fibroblast", "Keratinocyte", "Odontoblast"], correct: 1 },
    { id: 1305, question: "The periodontal ligament receives its blood supply mainly from the:", options: ["Pulpal vessels and alveolar bone vessels", "Cementum capillaries", "Buccal mucosal arteries only", "Gingival venous plexus"], correct: 0 },
    { id: 1306, question: "Sensory nerve endings in the PDL are responsible for:", options: ["Blood flow control only", "Pain and pressure perception", "Cementum formation", "Bone resorption"], correct: 1 },
    { id: 1307, question: "The fibroblasts within the PDL primarily:", options: ["Resorb enamel", "Synthesize and remodel collagen fibers", "Produce keratin", "Regulate tooth eruption"], correct: 1 },
    { id: 1308, question: "The periodontal ligament's nutritional function is supported by:", options: ["Gingival crevicular fluid", "Rich vascular and lymphatic network", "Enamel organ remnants", "Alveolar mucosa"], correct: 1 },
    { id: 1309, question: "Bone remodeling in the alveolar process is primarily controlled by:", options: ["Osteoblasts and osteoclasts", "Fibroblasts and odontoblasts", "Cementocytes and ameloblasts", "Chondrocytes and fibrocytes"], correct: 0 },
    { id: 1310, question: "With aging, the alveolar bone generally becomes:", options: ["More vascular and dense", "Less cellular and more brittle", "Thicker and more flexible", "Resistant to resorption"], correct: 1 },
    { id: 1311, question: "Which of the following can accelerate alveolar bone loss?", options: ["Optimal occlusal loading", "Occlusal trauma or tooth loss", "Increased collagen production", "Reduced osteoclastic activity"], correct: 1 },
    { id: 1312, question: "Gingival crevicular fluid (GCF) primarily functions to:", options: ["Deliver calcium to enamel", "Cleanse the sulcus and transport immune factors", "Harden the gingiva", "Resorb cementum"], correct: 1 },
    { id: 1313, question: "Which of the following is NOT a function of gingival crevicular fluid?", options: ["Antimicrobial defense", "Nutrient exchange", "Enamel formation", "Cleansing the sulcus"], correct: 2 },
    { id: 1314, question: "During inflammation, the amount of GCF:", options: ["Decreases", "Remains constant", "Increases significantly", "Stops completely"], correct: 2 },
    { id: 1315, question: "Rete pegs contribute to gingival stippling by:", options: ["Creating small projections of epithelium into connective tissue", "Depositing melanin granules", "Absorbing bacterial toxins", "Hardening the enamel"], correct: 0 },
    { id: 1316, question: "Stippling of the gingiva indicates:", options: ["Inflammation", "Healthy, resilient tissue supported by rete pegs", "Bone loss", "Hyperplasia"], correct: 1 },
    { id: 1317, question: "Loss of stippling usually suggests:", options: ["Excellent oral hygiene", "Current or previous gingival inflammation", "Increased keratinization", "Pigmentation"], correct: 1 },
    { id: 1318, question: "Which area of the oral cavity is the most keratinized?", options: ["Buccal mucosa", "Palatal gingiva", "Sulcular epithelium", "Inner lips"], correct: 1 },
    { id: 1319, question: "The least keratinized area of the mouth is the:", options: ["Cheek mucosa", "Palate", "Gingival margin", "Dorsal tongue"], correct: 0 },
    { id: 1320, question: "The free gingival groove separates:", options: ["Free and attached gingiva", "Alveolar mucosa and attached gingiva", "Cementum and enamel", "Sulcus and bone"], correct: 0 },
    { id: 1321, question: "In health, the sulcus depth typically measures:", options: ["0–1 mm", "1–3 mm", "3–5 mm", "5–7 mm"], correct: 1 },
    { id: 1322, question: "The lamina propria's papillary layer contains:", options: ["Collagen bundles only", "Vascular and neural elements with rete peg interdigitations", "Bone marrow", "Cementocytes"], correct: 1 },
    { id: 1323, question: "The reticular layer of the lamina propria lies:", options: ["Directly beneath the basal layer", "Closer to the periosteum and alveolar bone", "Within the sulcular epithelium", "Between enamel and dentin"], correct: 1 },
    { id: 1324, question: "The connective tissue of gingiva is composed of approximately:", options: ["80% collagen", "60% collagen fibers, 40% cellular and vascular components", "50% calcium salts", "30% fibroblasts"], correct: 1 },
    { id: 1325, question: "Fibroblasts are responsible for:", options: ["Phagocytosis of bacteria", "Collagen synthesis and tissue maintenance", "Bone resorption", "Antibody production"], correct: 1 },
    { id: 1326, question: "Parakeratinization following trauma occurs because:", options: ["Fibroblasts fail to produce collagen", "The tissue thickens as a protective response", "Blood supply is lost", "Enamel is damaged"], correct: 1 },
    { id: 1327, question: "Melanin pigmentation in gingiva:", options: ["Is always pathologic", "Is a normal physiologic variation providing UV protection", "Indicates necrosis", "Requires immediate treatment"], correct: 1 },
    { id: 1328, question: "Physiologic pigmentation can sometimes be misinterpreted as:", options: ["Caries", "Gingival disease or inflammation", "Keratinization", "Fibrosis"], correct: 1 },
    { id: 1329, question: "The alveolar bone proper is also known as:", options: ["Lamina dura or bundle bone", "Cortical plate", "Cancellous bone", "Trabecular matrix"], correct: 0 },
    { id: 1330, question: "The cortical plate refers to:", options: ["The outer compact bone of the alveolar process", "The inner porous bone surrounding the marrow", "The root surface of cementum", "The periodontal ligament"], correct: 0 },
    { id: 1331, question: "Fenestration refers to:", options: ["Bone loss exposing the root surface with an intact marginal bone", "Bone loss extending to the marginal crest", "Overgrowth of bone at the apex", "Thickening of cementum"], correct: 0 },
    { id: 1332, question: "When alveolar bone loss extends to the marginal bone, the defect is called:", options: ["Fenestration", "Dehiscence", "Hypercementosis", "Ankylosis"], correct: 1 },
    { id: 1333, question: "The periodontal ligament is innervated primarily by branches of the:", options: ["Facial nerve (VII)", "Trigeminal nerve (V)", "Glossopharyngeal nerve (IX)", "Hypoglossal nerve (XII)"], correct: 1 },
    { id: 1334, question: "Sensory nerve endings in the periodontal ligament detect:", options: ["Taste", "Pressure and proprioception", "Temperature", "Pain only"], correct: 1 }
  ],
  "2. The microbiology of periodontal diseases": [
    { id: 1335, question: "The oral epithelium of the gingiva is primarily:", options: ["Nonkeratinized", "Keratinized or parakeratinized", "Transitional", "Cuboidal"], correct: 1 },
    { id: 1336, question: "The sulcular epithelium extends from the outer epithelium into:", options: ["The gingival sulcus", "The periodontal ligament", "The lamina propria", "The alveolar crest"], correct: 0 },
    { id: 1337, question: "Which statement about sulcular epithelium is TRUE?", options: ["It is keratinized with rete pegs", "It is nonkeratinized and smooth in health", "It is attached to the tooth by hemidesmosomes", "It contains melanocytes and Merkel cells"], correct: 1 },
    { id: 1338, question: "Gingival crevicular fluid passes through which tissue into the sulcus?", options: ["Oral epithelium", "Sulcular epithelium", "Junctional epithelium", "Alveolar mucosa"], correct: 2 },
    { id: 1339, question: "The healthy sulcus epithelium has:", options: ["Deep rete pegs", "A rough surface", "No rete pegs", "Multiple cell layers with keratin"], correct: 2 },
    { id: 1340, question: "The sulcular epithelium forms:", options: ["The tooth attachment zone", "The gingival wall of the sulcus", "The alveolar crest fibers", "The lamina dura"], correct: 1 },
    { id: 1341, question: "Junctional epithelium is attached to the tooth surface by:", options: ["Desmosomes", "Hemidesmosomes and internal basal lamina", "Collagen fibers only", "Sharpey's fibers"], correct: 1 },
    { id: 1342, question: "The coronal portion of the junctional epithelium is approximately:", options: ["0.25 to 1.35 mm in length", "2 to 3 mm in length", "5 mm thick", "Variable with no average"], correct: 0 },
    { id: 1343, question: "The dentogingival unit consists of:", options: ["Sulcular and oral epithelium", "Junctional epithelium and connective tissue fibers", "Cementum and alveolar bone", "PDL and gingiva"], correct: 1 },
    { id: 1344, question: "The connective tissue beneath the gingiva is called the:", options: ["Lamina dura", "Lamina propria", "Cribriform plate", "Alveolar mucosa"], correct: 1 },
    { id: 1345, question: "The lamina propria consists mainly of:", options: ["Elastic fibers", "Collagen fibrils forming fiber bundles", "Cartilage cells", "Adipose tissue"], correct: 1 },
    { id: 1346, question: "The gingival ligament provides:", options: ["The apical attachment", "The coronal connective tissue attachment of the tooth", "The alveolar bone crest formation", "None of the above"], correct: 1 },
    { id: 1347, question: "The five principal fiber groups of the gingival ligament include all EXCEPT:", options: ["Circular", "Dentogingival", "Alveologingival", "Intergingival"], correct: 3 },
    { id: 1348, question: "The dentogingival fibers extend:", options: ["From cementum into free and attached gingiva", "From alveolar crest into cementum", "Around the entire tooth", "Between adjacent teeth"], correct: 0 },
    { id: 1349, question: "The transseptal fibers:", options: ["Run from bone to gingiva", "Span the interdental space, connecting cementum to cementum", "Encircle the tooth", "Extend from periosteum into gingiva"], correct: 1 },
    { id: 1350, question: "The alveologingival fibers:", options: ["Radiate from the periosteum into the attached gingiva", "Extend apically to the root apex", "Attach tooth to lamina dura", "Form part of the circular group"], correct: 0 },
    { id: 1351, question: "The secondary gingival fiber groups are composed mainly of:", options: ["Thick elastic bundles", "Small collagen fibers running in all directions", "Non-collagen fibers", "Mineralized fibers"], correct: 1 },
    { id: 1352, question: "Sharpey's fibers are:", options: ["The embedded ends of collagen bundles in bone and cementum", "The fibers in the junctional epithelium", "Elastic fibers in the gingival ligament", "Neural fibers in the PDL"], correct: 0 },
    { id: 1353, question: "The gingival fibers function primarily to:", options: ["Maintain the tooth in its socket", "Provide the most coronal connective tissue attachment", "Deposit cementum", "Transport nutrients"], correct: 1 },
    { id: 1354, question: "The gingival connective tissue contains which cell types?", options: ["Fibroblasts, mast cells, macrophages", "Osteocytes and odontoblasts", "Epithelial and Merkel cells", "Ameloblasts only"], correct: 0 },
    { id: 1355, question: "The healthy gingival sulcus depth is approximately:", options: ["0.5–1 mm", "1–3 mm", "3–5 mm", "5–7 mm"], correct: 1 },
    { id: 1356, question: "The gingival margin typically lies how far coronal to the cementoenamel junction (CEJ)?", options: ["0.1–0.5 mm", "0.5–2 mm", "2–3 mm", "3–5 mm"], correct: 1 },
    { id: 1357, question: "The alveolar crest is located approximately:", options: ["1–2 mm apical to the CEJ", "2–3 mm coronal to the CEJ", "0.5–1 mm apical to the CEJ", "3–4 mm apical to the CEJ"], correct: 0 },
    { id: 1358, question: "The alveolar crest is also about how far apical to the epithelial attachment in health?", options: ["0.1–0.5 mm", "0.5–1.5 mm", "1.5–2 mm", "2–3 mm"], correct: 1 },
    { id: 1359, question: "Approximately what percentage of cementum is inorganic material?", options: ["20%", "40%", "50%", "70%"], correct: 2 },
    { id: 1360, question: "About what percentage of the lamina propria is made up of connective tissue fibers (mainly collagen)?", options: ["30%", "40%", "60%", "80%"], correct: 2 },
    { id: 1361, question: "The free gingiva extends coronally from the gingival groove approximately:", options: ["0.5 mm", "1.5 mm", "2 mm", "3 mm"], correct: 1 },
    { id: 1362, question: "The periodontal ligament space in health averages:", options: ["0.05–0.15 mm", "0.25–0.35 mm", "0.5–1.0 mm", "1.0–1.5 mm"], correct: 1 },
    { id: 1363, question: "The sulcular epithelium extends from the crest of the gingiva to the junctional epithelium, lining a sulcus depth of:", options: ["1–3 mm", "2–4 mm", "3–5 mm", "0.5–1 mm"], correct: 0 },
    { id: 1364, question: "The junctional epithelium typically has a thickness of about:", options: ["One cell layer", "5–15 cell layers", "20–30 cell layers", "Over 50 cell layers"], correct: 1 },
    { id: 1365, question: "The attached gingiva width varies but is usually widest in the incisor region and narrowest in the:", options: ["Premolar region", "Molar region", "Canine region", "Anterior region"], correct: 0 },
    { id: 1366, question: "The gingival connective tissue (lamina propria) consists of roughly what percentage of fibroblasts, vessels, and other cells?", options: ["40%", "60%", "80%", "20%"], correct: 0 },
    { id: 1367, question: "The crest of alveolar bone normally lies how far from the CEJ on radiographs?", options: ["1–2 mm", "0–0.5 mm", "2–3 mm", "3–5 mm"], correct: 0 },
    { id: 1368, question: "Gingival fluid (GCF) flow increases significantly when inflammation is present — sometimes more than:", options: ["10 times the normal rate", "2 times the normal rate", "50% of baseline", "Equal to baseline"], correct: 0 },
    { id: 1369, question: "The percentage of collagen in the gingival connective tissue is about:", options: ["30%", "60%", "80%", "90%"], correct: 1 },
    { id: 1370, question: "Physiologic mesial migration is a slow, normal tooth movement over:", options: ["The lifetime", "Several months only", "Childhood only", "Post-extraction phase"], correct: 0 },
    { id: 1371, question: "The junctional epithelium attaches to the tooth surface via hemidesmosomes and basal lamina, forming a seal about:", options: ["0.25–1.35 mm thick", "2–3 mm thick", "0.1 mm thick", "Variable up to 5 mm"], correct: 0 },
    { id: 1372, question: "The alveolar bone is composed of approximately:", options: ["65% inorganic, 25% organic, and 10% water", "90% inorganic, 10% organic", "50% inorganic, 50% organic", "70% collagen only"], correct: 0 },
    { id: 1373, question: "The interdental gingiva (papilla) fills the space between teeth up to the contact point, typically measuring:", options: ["1–2 mm below the contact area", "3–4 mm above CEJ", "2–3 mm apical to alveolar crest", "0.5 mm below bone"], correct: 0 },
    { id: 1374, question: "The alveolar crest fibers of the PDL run from:", options: ["Cementum just below CEJ to the alveolar crest", "Apex to alveolar crest", "Dentin to pulp", "CEJ to enamel"], correct: 0 },
    { id: 1375, question: "The gingival epithelium renews itself approximately every:", options: ["2–3 days", "10–12 days", "20–30 days", "40 days"], correct: 1 },
    { id: 1376, question: "The junctional epithelium renews at a faster rate—approximately every:", options: ["4–6 days", "10–12 days", "15–20 days", "30 days"], correct: 0 },
    { id: 1377, question: "The alveolar bone receives about what percentage of total blood flow to the periodontium?", options: ["10%", "30%", "50%", "70%"], correct: 1 },
    { id: 1378, question: "The lamina propria is divided into two layers — papillary and reticular. The papillary layer comprises roughly:", options: ["10%", "20–25%", "40%", "60% of total thickness"], correct: 1 },
    { id: 1379, question: "Blood capillary loops from the supraperiosteal vessels extend within approximately:", options: ["0.1 mm of the epithelial surface", "0.2–0.3 mm", "0.5 mm", "1 mm"], correct: 1 },
    { id: 1380, question: "Gingival crevicular fluid (GCF) flow in health is approximately:", options: ["1 µL per tooth per day", "0.25–0.5 µL per tooth per day", "5 µL per tooth per day", "10 µL per tooth per day"], correct: 1 },
    { id: 1381, question: "During inflammation, the GCF flow can increase by as much as:", options: ["20–40 times", "5–10 times", "2–4 times", "Remains constant"], correct: 0 },
    { id: 1382, question: "The percentage of inorganic material in alveolar bone is approximately:", options: ["65%", "50%", "75%", "85%"], correct: 0 },
    { id: 1383, question: "The periodontal ligament contains approximately what percentage of water?", options: ["10%", "70%", "50%", "90%"], correct: 1 },
    { id: 1384, question: "The average width of the PDL in a healthy adult is:", options: ["0.05–0.15 mm", "0.25–0.35 mm", "0.5–1.0 mm", "1.5 mm"], correct: 1 },
    { id: 1385, question: "Osteoblasts and osteoclasts occupy about what proportion of the bone surface in a remodeling area?", options: ["1–2%", "5–10%", "20–30%"], correct: 1 },
    { id: 1386, question: "The proportion of collagen fibers in the PDL by dry weight is approximately:", options: ["30%", "50–60%", "70%", "80%"], correct: 1 },
    { id: 1387, question: "The cementum thickness near the cervical portion of the tooth is typically:", options: ["0.5 mm", "20–50 µm", "100 µm", "200 µm"], correct: 1 },
    { id: 1388, question: "At the apical region of the root, cementum thickness increases to:", options: ["20–50 µm", "100 µm", "150–200 µm", "500 µm"], correct: 2 },
    { id: 1389, question: "The epithelial attachment (junctional epithelium) covers the tooth surface for about:", options: ["0.1 mm", "0.25–1.35 mm", "2–3 mm", "3–4 mm"], correct: 1 },
    { id: 1390, question: "The ratio of organic to inorganic material in cementum is roughly:", options: ["70:30", "50:50", "30:70", "25:75"], correct: 1 },
    { id: 1391, question: "About what percentage of Sharpey's fibers in cementum remain unmineralized?", options: ["10%", "50%", "70%", "90%"], correct: 1 },
    { id: 1392, question: "The bone loss rate in untreated periodontitis may average:", options: ["0.01 mm/year", "0.1–0.3 mm/year", "0.5–1 mm/year", ">1 mm/year"], correct: 1 },
    { id: 1393, question: "The normal width of attached gingiva (excluding the sulcus) in anterior regions is about:", options: ["0.5–1 mm", "3.5–4.5 mm", "5–6 mm", "2–3 mm"], correct: 1 },
    { id: 1394, question: "The attached gingiva is narrowest in premolar areas—typically:", options: ["1 mm", "1.8 mm", "2.5 mm", "3.5 mm"], correct: 1 },
    { id: 1395, question: "The percentage of inorganic content in enamel compared with cementum is roughly:", options: ["95% vs. 50%", "70% vs. 50%", "85% vs. 60%", "50% vs. 30%"], correct: 0 },
    { id: 1396, question: "The alveolar crest normally follows the CEJ contour within:", options: ["1–2 mm", "3–5 mm", "0.5 mm", "4–6 mm"], correct: 0 },
    { id: 1397, question: "Physiologic mesial migration occurs at an average rate of approximately:", options: ["0.1 mm/month", "0.05 mm/year", "1 mm/year", "Variable every few months"], correct: 1 },
    { id: 1398, question: "Gingival stippling occurs in approximately what percentage of adults?", options: ["10–20%", "40–50%", "60–70%", "80–90%"], correct: 1 },
    { id: 1399, question: "The blood supply to the gingiva is provided by branches of the supraperiosteal vessels that lie within about:", options: ["0.1 mm of bone", "0.2–0.3 mm of bone surface", "1 mm depth", "2 mm below CEJ"], correct: 1 },
    { id: 1400, question: "The col area between teeth lies approximately how far apical to the contact point?", options: ["0.5 mm", "1–2 mm", "3 mm", "4 mm"], correct: 1 },
    { id: 1401, question: "The junctional epithelium thickness at the coronal end is about:", options: ["10–15 cells", "25–30 cells", "50 cells", "2–3 cells"], correct: 0 },
    { id: 1402, question: "At the apical termination of the junctional epithelium, the thickness reduces to:", options: ["1–3 cells", "10–15 cells", "20 cells", "50 cells"], correct: 0 },
    { id: 1403, question: "The gingival blood flow rate per unit volume is approximately how many times higher than that of skin?", options: ["20–30 times", "5–10 times", "Equal", "Half"], correct: 0 },
    { id: 1404, question: "In the periodontal ligament, nerve endings are most concentrated near:", options: ["The root apex and cervical region", "The middle third only", "Enamel rods", "Alveolar crest exclusively"], correct: 0 },
    { id: 1405, question: "Neutrophils (PMNs) make up approximately what percentage of circulating white blood cells?", options: ["10–20%", "60–70%", "30–40%", "80–90%"], correct: 1 },
    { id: 1406, question: "In early gingival inflammation, PMNs can increase in the gingival crevice by approximately:", options: ["10×", "100×", "1000×", "Unchanged"], correct: 1 },
    { id: 1407, question: "The lifespan of a neutrophil in tissue before it undergoes lysis is approximately:", options: ["1–2 days", "5–7 days", "10–12 days", "2 weeks"], correct: 0 },
    { id: 1408, question: "Macrophages account for approximately what percentage of total white blood cells in circulation?", options: ["1–2%", "3–8%", "10–20%", "25%"], correct: 1 },
    { id: 1409, question: "Lymphocytes make up approximately what percentage of circulating leukocytes?", options: ["10%", "20–40%", "60–70%", "80–90%"], correct: 1 },
    { id: 1410, question: "Plasma cells typically dominate the immune infiltrate in chronic gingival inflammation, comprising about:", options: ["10–20% of infiltrating cells", "50–60% of infiltrating cells", "70–80%", "90%"], correct: 1 },
    { id: 1411, question: "Basophils and mast cells together make up less than what percentage of circulating leukocytes?", options: ["1%", "5%", "10%", "15%"], correct: 0 },
    { id: 1412, question: "During acute inflammation, the increase in gingival crevicular fluid (GCF) volume can be as high as:", options: ["20–40 times baseline", "5–10 times", "2–3 times", "Remains constant"], correct: 0 },
    { id: 1413, question: "The complement cascade involves approximately how many interacting proteins?", options: ["5", "20+", "10", "50"], correct: 1 },
    { id: 1414, question: "The chemotactic migration rate of PMNs toward a site of infection occurs within:", options: ["Minutes to a few hours", "1–2 days", "3–5 days", "A week"], correct: 0 },
    { id: 1415, question: "Cytokines such as IL-1 and TNF-α can trigger bone resorption within:", options: ["24–48 hours of inflammatory activation", "5–7 days", "2 weeks", "1 month"], correct: 0 },
    { id: 1416, question: "Interleukin-1 (IL-1) concentration in GCF can increase up to how many times during active periodontitis?", options: ["10–100× normal", "2×", "5×", "1000×"], correct: 0 },
    { id: 1417, question: "The number of cell layers in the junctional epithelium typically ranges from:", options: ["2–4 layers", "5–15 layers", "20–30 layers", "50 layers"], correct: 1 },
    { id: 1418, question: "The typical time for the acute inflammatory phase to shift to the early lesion (lymphocyte-dominant) phase is approximately:", options: ["6 hours", "2–4 days", "7–10 days", "2 weeks"], correct: 1 },
    { id: 1419, question: "Chronic inflammatory lesions (plasma cell dominated) appear after approximately:", options: ["1–2 days", "3–5 days", "2–3 weeks", "1 month"], correct: 2 },
    { id: 1420, question: "The average flow rate of GCF during health is approximately:", options: ["0.25–0.5 µL per tooth per day", "1 µL per tooth per day", "5 µL", "10 µL"], correct: 0 },
    { id: 1421, question: "In disease, GCF flow may reach:", options: ["2–3 µL per tooth per day", "0.25 µL", "0.1 µL", "10 µL"], correct: 0 },
    { id: 1422, question: "The inflammatory cell infiltration zone in gingival connective tissue may extend up to:", options: ["1 mm from the sulcular epithelium", "0.1 mm", "2 mm", "3 mm"], correct: 0 },
    { id: 1423, question: "The oxygen consumption rate of PMNs during the \"respiratory burst\" is approximately:", options: ["50 times normal resting rate", "5×", "10×", "100×"], correct: 0 },
    { id: 1424, question: "The percentage of organic content in bone matrix is approximately:", options: ["35%", "50%", "60%", "70%"], correct: 0 },
    { id: 1425, question: "The percentage of inorganic mineral in enamel, dentin, and cementum respectively is approximately:", options: ["95%, 70%, 50%", "80%, 60%, 40%", "90%, 80%, 60%", "70%, 50%, 30%"], correct: 0 },
    { id: 1426, question: "The host immune response can destroy up to what percentage of alveolar bone in advanced periodontitis?", options: ["30–50%", "10%", "70%", "90%"], correct: 0 },
    { id: 1427, question: "Osteoclastic resorption can occur as close as:", options: ["0.25 mm from bacterial plaque", "1 mm", "2 mm", "3 mm"], correct: 0 },
    { id: 1428, question: "The gingival connective tissue zone between the JE and alveolar crest bone in health measures approximately:", options: ["1–2 mm", "0.5 mm", "3 mm", "5 mm"], correct: 0 },
    { id: 1429, question: "The biological width — the combined height of the junctional epithelium and connective tissue attachment — is approximately:", options: ["2.04 mm", "1 mm", "3 mm", "0.5 mm"], correct: 0 },
    { id: 1430, question: "The free gingiva is separated from the attached gingiva by:", options: ["The mucogingival junction", "The free gingival groove", "The col", "The alveolar crest"], correct: 1 },
    { id: 1431, question: "The free gingival margin in health is described as:", options: ["Knife-edged and firm", "Rounded and bulbous", "Rolled and flaccid", "Soft and shiny"], correct: 0 },
    { id: 1432, question: "The interdental gingiva fills the space between teeth called:", options: ["The embrasure", "The foramen", "The sulcus", "The crypt"], correct: 0 },
    { id: 1433, question: "The non-keratinized depression between the facial and lingual papillae is called the:", options: ["Col", "Groove", "Fossa", "Crevice"], correct: 0 },
    { id: 1434, question: "The col is found:", options: ["On the outer gingival surface", "On the palate only", "Between posterior teeth beneath the contact area", "Between anterior roots only"], correct: 2 },
    { id: 1435, question: "The col area is especially vulnerable to disease because:", options: ["It is thin and non-keratinized", "It is highly keratinized", "It lacks connective tissue", "It has no blood supply"], correct: 0 },
    { id: 1436, question: "The gingival epithelium attaches to connective tissue via:", options: ["The basal lamina and hemidesmosomes", "Rete pegs and Sharpey's fibers", "Desmosomes only", "Alveolar fibers"], correct: 0 },
    { id: 1437, question: "The rete pegs serve to:", options: ["Strengthen attachment between epithelium and connective tissue", "Form junctional epithelium", "Secrete gingival crevicular fluid", "Absorb calcium"], correct: 0 },
    { id: 1438, question: "Visible stippling on gingiva corresponds microscopically to:", options: ["Rete pegs and connective tissue ridges", "Collagen loss", "Blood vessel dilation", "Bone remodeling"], correct: 0 },
    { id: 1439, question: "In health, stippling is found only on:", options: ["Attached gingiva", "Free gingiva", "Alveolar mucosa", "Sulcular epithelium"], correct: 0 },
    { id: 1440, question: "When inflammation occurs, stippling is lost because:", options: ["Swelling flattens rete pegs", "Blood supply is cut off", "Keratinization increases", "Epithelium thickens"], correct: 0 },
    { id: 1441, question: "The function of the gingival ligament is to:", options: ["Provide tooth–gingiva attachment and support", "Attach cementum to bone", "Produce cementoblasts", "Supply blood to the tooth"], correct: 0 },
    { id: 1442, question: "The circular fibers:", options: ["Encircle the tooth, maintaining gingival contour", "Run from cementum to alveolar crest", "Extend into bone", "Connect adjacent teeth"], correct: 0 },
    { id: 1443, question: "The dentogingival fibers extend from:", options: ["Cementum near CEJ into free gingiva", "Bone to bone", "Cementum to alveolar crest", "Dentin to pulp"], correct: 0 },
    { id: 1444, question: "The dentoperiosteal fibers:", options: ["Extend from cementum, over the crest, into periosteum", "Run horizontally from cementum to bone", "Connect adjacent teeth", "Encircle the tooth"], correct: 0 },
    { id: 1445, question: "The alveologingival fibers:", options: ["Extend from alveolar crest to free gingiva", "Extend from cementum to dentin", "Run apically into bone", "Form the col"], correct: 0 },
    { id: 1446, question: "The transseptal fibers connect:", options: ["Cementum of one tooth to cementum of adjacent tooth", "Bone to periosteum", "Gingiva to alveolar mucosa", "PDL to cementum"], correct: 0 },
    { id: 1447, question: "The oblique fibers of the periodontal ligament:", options: ["Resist vertical masticatory forces", "Resist horizontal forces", "Support attached gingiva", "Form Sharpey's fibers"], correct: 0 },
    { id: 1448, question: "The horizontal fibers of the PDL:", options: ["Resist lateral tooth movement", "Resist vertical compression", "Attach tooth to gingiva", "Are found only in multirooted teeth"], correct: 0 },
    { id: 1449, question: "The alveolar crest fibers:", options: ["Run from cervical cementum to alveolar crest", "Run obliquely toward apex", "Connect roots of multirooted teeth", "Encircle the tooth"], correct: 0 },
    { id: 1450, question: "The interradicular fibers are found:", options: ["Between the roots of multirooted teeth", "Between adjacent teeth", "At the CEJ", "In single-rooted teeth only"], correct: 0 },
    { id: 1451, question: "The apical fibers function to:", options: ["Prevent tooth from being pushed deeper into socket", "Resist lateral pressure", "Support free gingiva", "Promote eruption"], correct: 0 },
    { id: 1452, question: "Cementum's primary inorganic component is:", options: ["Hydroxyapatite (≈50%)", "Collagen (90%)", "Calcium phosphate (10%)", "Fluoride (5%)"], correct: 0 },
    { id: 1453, question: "The alveolar bone proper that lines the socket is also called:", options: ["Lamina dura (cribriform plate)", "Compact bone", "Spongy bone", "Trabecular plate"], correct: 0 },
    { id: 1454, question: "Physiologic mesial migration (drift) allows the dentition to:", options: ["Compensate for wear and maintain contact", "Develop diastemas", "Rotate posteriorly", "Loosen with age"], correct: 0 },
    { id: 1455, question: "The gingiva is distinguished from oral mucosa at the:", options: ["CEJ", "Free gingival groove", "Col", "Mucogingival junction (MGJ)"], correct: 3 },
    { id: 1456, question: "In health, attached gingiva most often appears:", options: ["Shiny red", "Coral pink (with possible physiologic pigmentation)", "Bluish", "Whitish"], correct: 1 },
    { id: 1457, question: "Physiologic pigmentation of gingiva is due to:", options: ["Langerhans cells", "Merkel cells", "Melanocytes", "Keratinocytes"], correct: 2 },
    { id: 1458, question: "The MGJ separates:", options: ["Free and attached gingiva", "Alveolar mucosa and attached gingiva", "Cementum and enamel", "Sulcular and outer epithelium"], correct: 1 },
    { id: 1459, question: "The attached gingiva is:", options: ["Movable and flexible", "Firmly bound to bone", "Non-keratinized by definition", "Always stippled in every person"], correct: 1 },
    { id: 1460, question: "The palatal mucosa:", options: ["Is least keratinized in the mouth", "Is highly keratinized and tough", "Is non-keratinized by default", "Is alveolar mucosa"], correct: 1 },
    { id: 1461, question: "The free gingival margin typically lies about:", options: ["0.1–0.3 mm coronal to CEJ", "0.5–2.0 mm coronal to CEJ", "2–3 mm apical to CEJ", "Level with CEJ"], correct: 1 },
    { id: 1462, question: "Loss of the \"knife-edged\" margin typically indicates:", options: ["Health", "Bulbous/rolled tissues and inflammation", "Increased keratinization", "Less sulcus depth"], correct: 1 },
    { id: 1463, question: "Stippling correlates with:", options: ["Rete pegs interdigitating with connective tissue", "Loss of collagen", "Bone resorption", "Apical migration of JE"], correct: 0 },
    { id: 1464, question: "Stippling is normally visible on:", options: ["Free gingiva", "Attached gingiva", "Alveolar mucosa", "Sulcular epithelium"], correct: 1 },
    { id: 1465, question: "Stippling visibility improves after:", options: ["Wetting with saliva", "Drying the tissue", "Coloring agent", "Vasoconstrictor"], correct: 1 },
    { id: 1466, question: "Absence of stippling may suggest:", options: ["Certain health variants or past inflammation", "Necessarily acute disease", "Non-keratinized surface", "Bone fracture"], correct: 0 },
    { id: 1467, question: "A high labial frenum may predispose to:", options: ["Increased keratinization", "Gingival recession/diastema", "Increased stippling", "Thicker attached gingiva"], correct: 1 },
    { id: 1468, question: "The interdental gingiva fills the:", options: ["Foramen", "Embrasure", "Fossa", "Crypt"], correct: 1 },
    { id: 1469, question: "The non-keratinized depression between facial and lingual papillae is the:", options: ["Groove", "Col", "Fossa", "Sulcus"], correct: 1 },
    { id: 1470, question: "The col is more common and pronounced in:", options: ["Anterior contacts", "Posterior contacts beneath tight contacts", "Edentulous areas", "Areas of recession only"], correct: 1 },
    { id: 1471, question: "Why is the col susceptible to disease?", options: ["Thick keratin", "Thin, non-keratinized tissue", "Vascular absence", "Enamel rods"], correct: 1 },
    { id: 1472, question: "During probing interproximally, to avoid false readings you should:", options: ["Aim directly into the contact point", "Angle to follow the saddle of the col", "Press hard apically", "Avoid mesial/distal probing"], correct: 1 },
    { id: 1473, question: "Oral (outer) gingival epithelium is generally:", options: ["Non-keratinized", "Parakeratinized/keratinized", "Lacking rete pegs", "Lined by JE"], correct: 1 },
    { id: 1474, question: "Sulcular epithelium is normally:", options: ["Keratinized", "Parakeratinized", "Non-keratinized", "Pigmented only"], correct: 2 },
    { id: 1475, question: "The sulcular epithelium lines the:", options: ["Outer surface of gingiva", "Gingival sulcus (tooth-facing side)", "Alveolar mucosa", "Palate"], correct: 1 },
    { id: 1476, question: "With chronic trauma/inflammation, sulcular epithelium may become:", options: ["More non-keratinized", "Parakeratinized as defense", "Enamelized", "Detached completely in health"], correct: 1 },
    { id: 1477, question: "Junctional epithelium (JE) is typically:", options: ["Thick, heavily keratinized", "Thin, few cell layers, non-keratinized, permeable", "Pigmented and stippled", "Palatal only"], correct: 1 },
    { id: 1478, question: "The JE attaches to tooth via:", options: ["Desmosomes to enamel rods only", "Hemidesmosomes + internal basal lamina", "Sharpey's fibers", "Rete pegs"], correct: 1 },
    { id: 1479, question: "The JE's permeability allows passage of:", options: ["GCF and immune components", "Dentin tubules", "Enamel rods", "Osteocytes"], correct: 0 },
    { id: 1480, question: "The external basal lamina of JE faces:", options: ["Tooth", "Connective tissue", "Sulcus", "Alveolar bone"], correct: 1 },
    { id: 1481, question: "The internal basal lamina of JE faces:", options: ["Connective tissue", "Tooth surface", "Alveolar mucosa", "Palate"], correct: 1 },
    { id: 1482, question: "Healthy probing depth (sulcus) typically is:", options: ["0–1 mm", "1–3 mm", "4–6 mm", ">6 mm"], correct: 1 },
    { id: 1483, question: "GCF (gingival crevicular fluid) functions include all EXCEPT:", options: ["Sulcus cleansing", "Antimicrobial/immune roles", "Enhancing epithelial adhesion", "Demineralizing enamel in health"], correct: 3 },
    { id: 1484, question: "Increased GCF volume/composition change is associated with:", options: ["Inflammation", "Thicker enamel", "Less blood flow", "Reduced permeability"], correct: 0 },
    { id: 1485, question: "Rete pegs are most prominent in:", options: ["Oral epithelium", "Sulcular epithelium", "Junctional epithelium", "PDL"], correct: 0 },
    { id: 1486, question: "In health, the alveolar crest lies approximately:", options: ["1–2 mm apical to the CEJ", "1–2 mm coronal to the CEJ", "Level with CEJ", "3–5 mm apical to CEJ"], correct: 0 },
    { id: 1487, question: "In periodontal health the crest is also about:", options: ["0.5–1.5 mm coronal to epithelial attachment", "0.5–1.5 mm apical to epithelial attachment", "2–3 mm apical to epithelial attachment", "Level with JE always"], correct: 1 },
    { id: 1488, question: "The alveolar bone proper lining the socket is also called:", options: ["Trabecular bone", "Lamina dura / cribriform plate", "Cortical plate only", "Haversian bone"], correct: 1 },
    { id: 1489, question: "The lamina dura appears radiographically as:", options: ["Radiolucent line around roots", "Radiopaque line around sockets", "Diffuse mixed density", "No appearance"], correct: 1 },
    { id: 1490, question: "The lamina propria (gingival CT) has layers:", options: ["Papillary and reticular layers", "Internal and external enamel", "Dentin and pulp", "Osteoid and osteon"], correct: 0 },
    { id: 1491, question: "Approximately what % of lamina propria is CT fibers (predominantly collagen)?", options: ["20%", "40%", "60%", "80%"], correct: 2 },
    { id: 1492, question: "The remaining ~40% of lamina propria includes:", options: ["Only vessels", "Fibroblasts, macrophages, vessels, nerves, matrix cells", "Only lymphocytes", "Only ground substance"], correct: 1 },
    { id: 1493, question: "Gingival ligament fibers are located in:", options: ["Bone", "Gingival connective tissue", "Dentin", "Pulp"], correct: 1 },
    { id: 1494, question: "A principal role of gingival fibers is to:", options: ["Anchor gingiva to tooth and maintain contour/seal", "Attach cementum to bone", "Form enamel matrix", "Create dentinal tubules"], correct: 0 },
    { id: 1495, question: "Circular fibers:", options: ["Connect adjacent teeth", "Encircle tooth to maintain contour", "Run horizontally from cementum to bone", "Resist vertical forces"], correct: 1 },
    { id: 1496, question: "Dentogingival fibers run from:", options: ["Alveolar crest to free gingiva", "Cementum near CEJ into free gingiva", "Bone to bone", "Dentin to pulp"], correct: 1 },
    { id: 1497, question: "Dentoperiosteal fibers:", options: ["Cementum → over crest → periosteum", "Bone → bone", "Cementum → bone horizontally", "CEJ → enamel rods"], correct: 0 },
    { id: 1498, question: "Alveologingival fibers:", options: ["Cementum → free gingiva", "Alveolar crest → free gingiva", "Bone → bone", "Dentin → pulp"], correct: 1 },
    { id: 1499, question: "Transseptal fibers connect:", options: ["Bone to periosteum", "Cementum of adjacent teeth", "Gingiva to mucosa", "JE to tooth"], correct: 1 },
    { id: 1500, question: "PDL average width in health is about:", options: ["0.1 mm", "0.2 mm", "0.3–0.4 mm", "1.0 mm"], correct: 2 },
    { id: 1501, question: "PDL oblique fibers primarily resist:", options: ["Lateral forces", "Vertical masticatory forces", "Rotational forces", "Thermal changes"], correct: 1 },
    { id: 1502, question: "Horizontal PDL fibers primarily resist:", options: ["Lateral movement", "Vertical compression", "Extrusion", "Torsion only"], correct: 0 },
    { id: 1503, question: "Alveolar crest PDL fibers run from:", options: ["Apical area → bone", "Cervical cementum → alveolar crest", "Dentin → pulp", "Bone → mucosa"], correct: 1 },
    { id: 1504, question: "Interradicular fibers are found:", options: ["Single-rooted teeth only", "Between roots of multirooted teeth", "Only in anterior teeth", "In enamel"], correct: 1 },
    { id: 1505, question: "Apical PDL fibers function mainly to:", options: ["Prevent tooth from being pushed deeper into socket", "Resist lateral forces", "Maintain gingival contour", "Close the embrasure"], correct: 0 },
    { id: 1506, question: "Cementum's inorganic content is approx.:", options: ["20%", "50% hydroxyapatite", "70% hydroxyapatite", "95% hydroxyapatite"], correct: 1 },
    { id: 1507, question: "Cementum functions include all EXCEPT:", options: ["Anchoring Sharpey's fibers", "Maintaining occlusal relationships", "Sealing dentinal tubules", "Nourishing the pulp directly"], correct: 3 },
    { id: 1508, question: "Cementum covers:", options: ["Enamel", "Dentin of the root", "Dentin and enamel equally", "Pulp"], correct: 1 },
    { id: 1509, question: "Physiologic mesial drift allows:", options: ["Loss of contacts", "Compensation for wear and maintenance of contact", "Posterior rotation", "Mobility increase only"], correct: 1 },
    { id: 1510, question: "With aging, alveolar bone generally becomes:", options: ["More cellular and elastic", "Less cellular and more brittle", "Hypervascular", "Non-resorptive"], correct: 1 },
    { id: 1511, question: "Vascular branches extend through central alveolar bone over periosteum to terminate in:", options: ["Enamel rods", "PDL", "Dentin", "Col only"], correct: 1 },
    { id: 1512, question: "Other branches lie along alveolar bone surface and terminate as:", options: ["Venous sinusoids in JE", "Capillary loops in gingival CT next to epithelium", "Lymph sacs in PDL", "Arterioles in enamel"], correct: 1 },
    { id: 1513, question: "Primary lymph drainage of gingiva is to:", options: ["Submandibular nodes", "Popliteal nodes", "Mediastinal nodes", "Pineal gland"], correct: 0 },
    { id: 1514, question: "PDL innervation is primarily from branches of the:", options: ["Facial nerve", "Trigeminal nerve", "Glossopharyngeal", "Hypoglossal"], correct: 1 },
    { id: 1515, question: "Oral epithelium main function:", options: ["Secretion of dentin", "Protection against mechanical/microbial insult", "Enamel deposition", "Bone remodeling"], correct: 1 },
    { id: 1516, question: "Sulcular epithelium in health is:", options: ["Keratinized and thick", "Non-keratinized and sensitive", "Pigmented only", "Absent interproximally"], correct: 1 },
    { id: 1517, question: "JE cell layers are typically:", options: ["1–2 only", "Few layers (about 5–15 cells thick)", "Over 50 layers", "Variable by enamel type"], correct: 1 },
    { id: 1518, question: "Increased JE permeability clinically implies:", options: ["Better enamel hardness", "Potential early pathway for bacterial products and GCF", "Reduced GCF flow", "Apatite deposition"], correct: 1 },
    { id: 1519, question: "Knife-edged margin implies:", options: ["Health (with congruent color/bleeding findings)", "Chronic edema", "Ulceration", "Recession only"], correct: 0 },
    { id: 1520, question: "Red, bulbous margin with open embrasures suggests:", options: ["Health", "Inflammation/deposits", "Hyperkeratosis", "Reduced plaque"], correct: 1 },
    { id: 1521, question: "The MGJ on palate is:", options: ["Easily visible", "Not distinct (palatal tissue is attached)", "Bright white line", "Alveolar mucosa border"], correct: 1 },
    { id: 1522, question: "Narrow attached gingiva is common at:", options: ["Maxillary molars only", "Premolar areas and curved arch regions", "Incisal edges", "Palatal vault"], correct: 1 },
    { id: 1523, question: "A strong midline maxillary frenum may cause:", options: ["Diastema", "Fusion", "Ankylosis", "Hypercementosis"], correct: 0 },
    { id: 1524, question: "In the vasculature near gingiva, capillary loops are located:", options: ["In epithelium", "In gingival CT adjacent to epithelium", "Inside enamel", "Inside cementum"], correct: 1 },
    { id: 1525, question: "Rete pegs do not characterize which epithelium in health?", options: ["Oral (outer) epithelium", "Sulcular epithelium", "Junctional epithelium", "Both B and C"], correct: 3 },
    { id: 1526, question: "Gingival crevicular fluid increases in:", options: ["Health", "Inflammation", "Dehydration only", "Enamelogenesis"], correct: 1 },
    { id: 1527, question: "Probing accuracy depends LEAST on:", options: ["Proper angulation", "Controlled pressure", "Intact probe tip", "Patient age alone"], correct: 3 },
    { id: 1528, question: "Knife-edge + pale pink + no BOP most likely indicates:", options: ["Health", "Acute disease", "Ulceration", "Recession only"], correct: 0 },
    { id: 1529, question: "Parakeratinization in sulcular epithelium most likely reflects:", options: ["Physiologic normal everywhere", "Defense change due to disease/trauma", "Enamel deposition", "Loss of basal lamina"], correct: 1 },
    { id: 1530, question: "The free gingival groove:", options: ["Always prominent on lingual", "Subtle line separating free vs attached gingiva", "Same as MGJ", "Only in anterior teeth"], correct: 1 },
    { id: 1531, question: "\"Pigmentation stops at MGJ\" describes:", options: ["Pathology", "Normal variant in many individuals", "Non-keratinization", "Bone loss"], correct: 1 },
    { id: 1532, question: "A frenectomy aims to:", options: ["Remove bone", "Release high frenum to reduce pull/recession", "Increase enamel thickness", "Block GCF"], correct: 1 },
    { id: 1533, question: "\"Bundle bone\" is another term for:", options: ["Trabecular bone", "Alveolar bone proper into which Sharpey's fibers insert", "Dentin", "Pulp chamber roof"], correct: 1 },
    { id: 1534, question: "Radiographic lamina dura correlates with:", options: ["Exact probing depth", "Socket lining bone (bundle bone)", "Enamel thickness", "JE length"], correct: 1 },
    { id: 1535, question: "Gingival fiber groups are how many principal groups?", options: ["3", "4", "5 (plus minor groups)", "7"], correct: 2 },
    { id: 1536, question: "Choose the correct gingival fiber set:", options: ["Circular, dentogingival, dentoperiosteal, alveologingival, transseptal", "Horizontal, oblique, apical, interradicular, alveolar crest", "Only transseptal and circular", "Only circular"], correct: 0 },
    { id: 1537, question: "Choose the PDL principal fiber set:", options: ["Alveolar crest, horizontal, oblique, apical, interradicular (± transseptal)", "Circular, dentogingival", "Alveologingival only", "Periosteal only"], correct: 0 },
    { id: 1538, question: "Transseptal fibers connect:", options: ["Bone to periosteum", "Adjacent teeth (cementum to cementum) above the crest", "Dentin to pulp", "Enamel to JE"], correct: 1 },
    { id: 1539, question: "Oblique fibers are the most numerous and:", options: ["Resist lateral movement", "Resist vertical occlusal forces", "Resist temperature", "Resist pigmentation"], correct: 1 },
    { id: 1540, question: "\"Less orderly insertion of collagen fibers\" best characterizes:", options: ["Healthy lamina dura", "Areas with reparative cementum", "Enamel rods", "JE internal lamina"], correct: 1 },
    { id: 1541, question: "Lymphatics of gingiva primarily drain to:", options: ["Submandibular nodes", "Submental exclusively", "Parotid only", "Deep cervical only"], correct: 0 },
    { id: 1542, question: "Trigeminal branches carry in the PDL:", options: ["Pure sympathetic", "Sensory and proprioceptive fibers", "Parasympathetic only", "Motor only"], correct: 1 },
    { id: 1543, question: "The crest of alveolar process generally follows the:", options: ["Dentin-enamel junction", "Cementoenamel junction", "CEJ only in anterior", "Pulp horns"], correct: 1 },
    { id: 1544, question: "\"It is 1–2 mm apical to CEJ and 0.5–1.5 mm apical to epithelial attachment in health\" refers to:", options: ["Free gingival margin", "Alveolar crest level", "MGJ", "PDL width"], correct: 1 },
    { id: 1545, question: "In health, JE length and position relative to CEJ are important for:", options: ["Establishing biologic width harmony", "Determining enamel rods", "Predicting caries", "Measuring pulp horns"], correct: 0 },
    { id: 1546, question: "\"Physiologic mesial migration is mediated by PDL cells via bone/cementum remodeling with pressure-resorption and tension-deposition.\" The resorbing cells are:", options: ["Osteoblasts", "Osteoclasts (pressure side)", "Odontoblasts", "Cementoblasts only"], correct: 1 },
    { id: 1547, question: "The tension side during drift has:", options: ["Bone resorption by osteoclasts", "Bone deposition by osteoblasts", "Cementum dissolution", "Enamel apposition"], correct: 1 },
    { id: 1548, question: "The JE is an early \"detection\" site because:", options: ["It has high permeability to bacteria/products", "It is enamel", "It is bone", "It has no basal lamina"], correct: 0 },
    { id: 1549, question: "The function MOST central to oral epithelium is:", options: ["Antibody secretion", "Physical/chemical/microbial protection", "Collagen crosslinking", "Hydroxyapatite formation"], correct: 1 },
    { id: 1550, question: "In healthy sulcus, patient's discomfort to probing reflects:", options: ["The sensitivity of non-keratinized sulcular epithelium", "Enamel sensitivity", "Pulpitis", "Lack of GCF"], correct: 0 },
    { id: 1551, question: "The papillary layer of lamina propria is:", options: ["Deep layer near periosteum", "Just beneath epithelium, interlocking with rete pegs", "Inside JE", "Inside PDL"], correct: 1 },
    { id: 1552, question: "The reticular layer of lamina propria:", options: ["Is superficial", "Extends deeper toward the periosteum", "Is enamel", "Contains JE cells only"], correct: 1 },
    { id: 1553, question: "Collagen bundles in gingival CT:", options: ["Are randomly floating", "Organized into fiber groups providing support/resilience", "Equal enamel rods", "Are absent in health"], correct: 1 },
    { id: 1554, question: "GCF also helps:", options: ["Enhance epithelial adhesion to tooth", "Demineralize cementum", "Reduce immune signaling", "Destroy PDL"], correct: 0 },
    { id: 1555, question: "Increased GCF in inflammation can be used as a:", options: ["Marker for periodontal disease activity", "Measure of enamel thickness", "Root length", "Pulp vitality only"], correct: 0 },
    { id: 1556, question: "In the lecture, pigmentation often stops at:", options: ["Free gingival groove", "MGJ", "CEJ", "Apex"], correct: 1 },
    { id: 1557, question: "The palate shows no obvious MGJ because:", options: ["Palatal tissue is attached/keratinized", "It is alveolar mucosa", "It is sulcular only", "It is JE"], correct: 0 },
    { id: 1558, question: "The most keratinized intraoral site discussed:", options: ["Cheek mucosa", "Palatal gingiva", "Alveolar mucosa", "Sulcular epithelium"], correct: 1 },
    { id: 1559, question: "The least keratinized among listed:", options: ["Palate", "Cheek mucosa", "Attached gingiva", "Oral epithelium generally"], correct: 1 },
    { id: 1560, question: "The dorsal tongue is:", options: ["Non-keratinized only", "Keratinized/adapted for movement and function", "Lined by JE", "Alveolar mucosa"], correct: 1 },
    { id: 1561, question: "A \"rolled\" gingival margin most closely indicates:", options: ["Knife-edge health", "Edema/inflammation", "Hypercementosis", "Increased enamel"], correct: 1 },
    { id: 1562, question: "\"Capillary loops adjacent to epithelium\" are found in:", options: ["Gingival connective tissue papillae", "Enamel", "Sulcular lumen", "Dentin"], correct: 0 },
    { id: 1563, question: "\"Columns that keep the roof stable\" refers to:", options: ["Sharpey's fibers in enamel", "Rete pegs interdigitating with CT", "Enamel prism heads", "Pulp horns"], correct: 1 },
    { id: 1564, question: "The \"tight seal\" at the margin is essential to:", options: ["Prevent bacterial ingress", "Increase enamel thickness", "Lengthen roots", "Reduce vascularity"], correct: 0 },
    { id: 1565, question: "The col is best described as:", options: ["Keratinized ridge", "Concave, non-keratinized depression beneath contact", "Free gingival groove", "MGJ line"], correct: 1 },
    { id: 1566, question: "\"Localized discoloration and swelling at a single tooth\" may suggest:", options: ["Generalized disease only", "Local calculus/trauma at that site", "Always pigmentation", "Always caries"], correct: 1 },
    { id: 1567, question: "\"Generalized stippling\" charting means:", options: ["Majority of teeth show stippling", "Only one tooth", "None shows", "Only palatal"], correct: 0 },
    { id: 1568, question: "\"Localized stippling to #12–13\" means:", options: ["Everywhere", "Only teeth 12–13 area", "Palate only", "Mandibular only"], correct: 1 },
    { id: 1569, question: "The gingival margin \"knife-edge\" must be documented alongside:", options: ["Color, BOP, edema (for consistency with health)", "Enamel thickness", "Pulp vitality", "Root curvature"], correct: 0 },
    { id: 1570, question: "\"Bone deposition along tension (pull) surfaces\" is by:", options: ["Osteoclasts", "Osteoblasts", "Odontoclasts", "Cementoclasts"], correct: 1 },
    { id: 1571, question: "The alveolar bone proper receives Sharpey's fibers from:", options: ["JE", "PDL collagen bundles", "Oral epithelium", "Dentin tubules"], correct: 1 },
    { id: 1572, question: "\"Less orderly collagen insertion\" is often seen in:", options: ["Cellular/reparative cementum areas", "Enamel rod ends", "Healthy bone crest", "MGJ"], correct: 0 },
    { id: 1573, question: "A major reason the sulcus is a key plaque niche:", options: ["Saliva cannot reach", "Anatomy protects bacterial retention near the sulcus/col", "It is constantly acid-etched", "It has no fluid"], correct: 1 },
    { id: 1574, question: "Early deviation from health in free gingiva often shows first as:", options: ["Deep caries", "Color/contour changes (redness, swelling, rolled margin)", "Enamel hypoplasia", "Pulp calcification"], correct: 1 }
  ],
  "1. Radiation History & Radiation Physics": [
    { id: 1620, question: "What is the main function of the vacuum inside the X-ray tube?", options: ["To accelerate the electrons faster", "To prevent electrons from colliding with air molecules", "To increase heat production", "To cool the anode"], correct: 1 },
    { id: 1621, question: "The vacuum in the X-ray tube also prevents:", options: ["Metal oxidation inside the tube", "X-ray scattering", "Photon filtration", "Oil leakage"], correct: 0 },
    { id: 1622, question: "The metal housing around the X-ray tube primarily serves to:", options: ["Increase radiation intensity", "Prevent electric shock and radiation leakage", "Produce characteristic radiation", "Hold the anode in place"], correct: 1 },
    { id: 1623, question: "The step-down transformer in an X-ray machine:", options: ["Converts low voltage to high voltage", "Has fewer turns in the primary coil", "Reduces voltage for the filament circuit", "Increases the number of electrons produced"], correct: 2 },
    { id: 1624, question: "In a step-up transformer, which coil has more turns?", options: ["Primary coil", "Secondary coil", "Both equal", "Depends on current flow"], correct: 1 },
    { id: 1625, question: "What does a step-up transformer do in an X-ray machine?", options: ["Increases voltage to accelerate electrons from cathode to anode", "Reduces current to the filament", "Controls mA setting", "Filters long-wavelength photons"], correct: 0 },
    { id: 1626, question: "Which part of the X-ray tube emits electrons when heated?", options: ["Anode", "Filament", "Focusing cup", "Target"], correct: 1 },
    { id: 1627, question: "The target of the anode is usually made of:", options: ["Copper", "Lead", "Tungsten", "Molybdenum"], correct: 2 },
    { id: 1628, question: "Why is tungsten used in the anode?", options: ["It is lightweight and cheap", "It has a high atomic number and high melting point", "It easily absorbs heat", "It emits visible light"], correct: 1 },
    { id: 1629, question: "The focusing cup in the X-ray tube:", options: ["Produces X-rays directly", "Focuses the electron beam toward the anode target", "Regulates voltage", "Serves as a filter"], correct: 1 },
    { id: 1630, question: "The electrons hit the tungsten target and convert energy mostly into:", options: ["X-rays", "Visible light", "Heat", "Gamma rays"], correct: 2 },
    { id: 1631, question: "Approximately what percentage of electron energy is converted into X-rays during exposure?", options: ["99%", "1%", "10%", "50%"], correct: 1 },
    { id: 1632, question: "The oil surrounding the X-ray tube primarily functions to:", options: ["Filter radiation", "Insulate and absorb heat", "Generate current", "Prevent anode rotation"], correct: 1 },
    { id: 1633, question: "The process of converting electrical energy into X-ray photons occurs at the:", options: ["Cathode", "Filament", "Target (focal spot)", "Glass envelope"], correct: 2 },
    { id: 1634, question: "Which of the following controls the number of electrons produced in the X-ray tube?", options: ["kVp", "mA (milliamperage)", "Exposure time", "Focal spot size"], correct: 1 },
    { id: 1635, question: "The kVp (kilovoltage peak) primarily controls:", options: ["Quantity of radiation", "Quality and penetrating power of the X-ray beam", "Filtration thickness", "Exposure time"], correct: 1 },
    { id: 1636, question: "Increasing the exposure time results in:", options: ["Higher energy photons", "More X-rays produced", "Shorter wavelength", "Reduced patient dose"], correct: 1 },
    { id: 1637, question: "The glass envelope of the X-ray tube allows the passage of:", options: ["Only high-energy visible light", "Heat and scattered radiation", "The useful X-ray beam", "Electrons from the cathode"], correct: 2 },
    { id: 1638, question: "What prevents X-rays from leaking in unwanted directions from the tube head?", options: ["Lead lining in the metal housing", "Aluminum filter", "Oil", "Glass window"], correct: 0 },
    { id: 1639, question: "Which of the following statements best defines the X-ray beam?", options: ["A group of visible light rays", "A collection of high-energy electromagnetic photons", "A stream of electrons", "A type of heat radiation"], correct: 1 },
    { id: 1640, question: "What is the purpose of filtration in an X-ray machine?", options: ["To increase the intensity of the X-ray beam", "To remove long-wavelength, low-energy X-rays", "To increase the number of X-ray photons", "To produce sharper images"], correct: 1 },
    { id: 1641, question: "Which type of filtration is provided by the parts of the X-ray tube itself?", options: ["Added filtration", "Total filtration", "Inherent filtration", "Soft filtration"], correct: 2 },
    { id: 1642, question: "Inherent filtration is mainly provided by:", options: ["The glass window, insulating oil, and tube head seal", "The aluminum filter disks", "The lead housing", "The collimator plate"], correct: 0 },
    { id: 1643, question: "The equivalent thickness of inherent filtration is approximately:", options: ["0.1–0.2 mm Al", "0.5–1.0 mm Al", "2.5–3.0 mm Al", "4.0 mm Al"], correct: 1 },
    { id: 1644, question: "When aluminum disks are added between the X-ray tube and the patient, it is called:", options: ["Inherent filtration", "Added filtration", "Beam limitation", "Scatter control"], correct: 1 },
    { id: 1645, question: "The purpose of added filtration is to:", options: ["Increase exposure to the patient", "Eliminate high-energy X-rays", "Remove low-energy photons that do not penetrate", "Increase contrast"], correct: 2 },
    { id: 1646, question: "The total filtration is equal to:", options: ["Added + inherent filtration", "Inherent – added filtration", "Added × inherent filtration", "Added + scattered filtration"], correct: 0 },
    { id: 1647, question: "What is the minimum total filtration required for X-ray machines operating below 70 kVp?", options: ["0.5 mm Al", "1.0 mm Al", "1.5 mm Al", "2.5 mm Al"], correct: 2 },
    { id: 1648, question: "What is the minimum total filtration required for X-ray machines operating above 70 kVp?", options: ["1.5 mm Al", "2.5 mm Al", "3.5 mm Al", "4.0 mm Al"], correct: 1 },
    { id: 1649, question: "The component that restricts the size and shape of the X-ray beam is called the:", options: ["Filter", "Collimator", "PID", "Lead apron"], correct: 1 },
    { id: 1650, question: "The collimator is made of:", options: ["Copper", "Aluminum", "Lead", "Tungsten"], correct: 2 },
    { id: 1651, question: "The opening in the collimator can be:", options: ["Circular or rectangular", "Triangular or oval", "Flat or concave", "None of the above"], correct: 0 },
    { id: 1652, question: "Which collimator shape provides the least radiation exposure to the patient?", options: ["Circular", "Rectangular", "Oval", "Cone-shaped"], correct: 1 },
    { id: 1653, question: "The diameter of the X-ray beam at the patient's skin should not exceed:", options: ["1.5 inches", "2.0 inches", "2.75 inches", "3.0 inches"], correct: 2 },
    { id: 1654, question: "The position indicating device (PID) is used to:", options: ["Focus the X-ray beam", "Indicate the direction of the beam and reduce scatter", "Measure exposure time", "Control voltage"], correct: 1 },
    { id: 1655, question: "Which type of PID causes the most beam divergence?", options: ["Long cylindrical PID", "Short cylindrical PID", "Rectangular PID", "Lead-lined PID"], correct: 1 },
    { id: 1656, question: "What is the typical length of a short PID?", options: ["4 inches", "8 inches", "12 inches", "16 inches"], correct: 1 },
    { id: 1657, question: "What is the typical length of a long PID?", options: ["8 inches", "10 inches", "12 inches", "16 inches"], correct: 3 },
    { id: 1658, question: "Which PID produces the least patient exposure?", options: ["Short, round PID", "Long, round PID", "Long, rectangular PID", "Conical PID"], correct: 2 },
    { id: 1659, question: "The conical PID is no longer used because:", options: ["It increases image sharpness", "It increases beam divergence and scatter", "It requires higher kVp", "It causes underexposure"], correct: 1 },
    { id: 1660, question: "What component in the X-ray tube prevents electrons from striking unwanted areas of the anode?", options: ["Glass window", "Tungsten target", "Focusing cup", "Copper stem"], correct: 2 },
    { id: 1661, question: "What is the function of the step-down transformer in dental radiography?", options: ["Increases voltage for anode acceleration", "Reduces voltage for the filament heating circuit", "Converts AC to DC current", "Stabilizes line current"], correct: 1 },
    { id: 1662, question: "Which of the following primarily affects the quality (penetrating power) of the X-ray beam?", options: ["mA", "Time", "kVp", "Distance"], correct: 2 },
    { id: 1663, question: "In dental radiography, most of the energy converted at the anode is transformed into:", options: ["X-rays", "Light", "Heat", "Scatter radiation"], correct: 2 },
    { id: 1664, question: "The function of the aluminum filter is to:", options: ["Increase beam intensity", "Absorb long-wavelength radiation", "Focus the X-ray beam", "Prevent backscatter radiation"], correct: 1 },
    { id: 1665, question: "Collimation of the X-ray beam is used to:", options: ["Reduce film fog", "Limit the size and shape of the beam", "Increase film contrast", "Decrease exposure time"], correct: 1 },
    { id: 1666, question: "What is the recommended maximum diameter of the beam at the patient's face?", options: ["2.0 inches", "2.25 inches", "2.75 inches", "3.0 inches"], correct: 2 },
    { id: 1667, question: "According to ALARA, dental radiographers must:", options: ["Use the lowest possible exposure to achieve diagnostic results", "Use the highest kVp for faster exposure", "Always double exposure for safety", "Use radiation every 6 months for comparison"], correct: 0 },
    { id: 1668, question: "The operator should stand at least how far from the primary beam during exposure?", options: ["1 meter (3 feet)", "1.5 meters (5 feet)", "2 meters (6 feet)", "0.5 meters (1.5 feet)"], correct: 2 },
    { id: 1669, question: "Which personal monitoring device measures accumulated radiation exposure over time?", options: ["Thermoluminescent dosimeter (TLD)", "Lead apron", "Aluminum filter", "PID"], correct: 0 },
    { id: 1670, question: "What should be done with a film badge when not in use?", options: ["Worn outside at all times", "Stored in the X-ray room", "Kept in a radiation-free area", "Shared with coworkers"], correct: 2 },
    { id: 1671, question: "A lead apron with thyroid collar should always be used:", options: ["For extraoral films only", "For all intraoral exposures", "Only for panoramic exposures", "Only for pregnant patients"], correct: 1 },
    { id: 1672, question: "Which PID type provides the lowest patient dose?", options: ["Short, round", "Short, rectangular", "Long, rectangular", "Long, round"], correct: 2 },
    { id: 1673, question: "The intensity of the X-ray beam decreases as the distance from the source increases. This is explained by:", options: ["Photoelectric effect", "Inverse square law", "Scatter law", "Bremsstrahlung principle"], correct: 1 },
    { id: 1674, question: "Which of the following tissues is most sensitive to radiation?", options: ["Nerve tissue", "Muscle tissue", "Bone marrow", "Enamel"], correct: 2 },
    { id: 1675, question: "The maximum permissible dose (MPD) for occupationally exposed dental workers in Canada is approximately:", options: ["10 mSv/year", "20 mSv/year", "50 mSv/year", "100 mSv/year"], correct: 2 },
    { id: 1676, question: "Which of the following statements about scatter radiation is TRUE?", options: ["It travels in a straight line like the primary beam", "It has no biological effect", "It is the main source of operator exposure", "It is absorbed entirely by the filter"], correct: 2 },
    { id: 1677, question: "The operator's protective barrier should contain:", options: ["Lead or equivalent shielding", "Plastic or rubber", "Tungsten glass", "Aluminum mesh"], correct: 0 },
    { id: 1678, question: "What happens if the operator holds the PID during exposure?", options: ["Image quality improves", "Patient dose decreases", "Operator receives unnecessary radiation", "Exposure time shortens"], correct: 2 },
    { id: 1679, question: "The best method to minimize patient radiation exposure is to:", options: ["Increase exposure time", "Use fast-speed (F or digital) receptors", "Use slow-speed film", "Repeat exposures when unsure"], correct: 1 },
    { id: 1680, question: "Which component inside a film packet absorbs scattered radiation?", options: ["Lead foil backing", "Black paper wrapping", "Film base", "Gelatin emulsion"], correct: 0 },
    { id: 1681, question: "The purpose of the identification dot on a dental film is to:", options: ["Indicate film speed", "Distinguish the patient's right and left sides", "Protect against backscatter", "Reduce processing time"], correct: 1 },
    { id: 1682, question: "The film base is made of:", options: ["Cellulose acetate", "Silver halide", "Gelatin", "Polyester"], correct: 3 },
    { id: 1683, question: "The part of the film that holds the silver halide crystals in place is the:", options: ["Protective coating", "Adhesive layer", "Gelatin emulsion", "Lead foil backing"], correct: 2 },
    { id: 1684, question: "Which chemical in the developer reduces exposed silver halide crystals to black metallic silver?", options: ["Sodium thiosulfate", "Hydroquinone", "Potassium bromide", "Acetic acid"], correct: 1 },
    { id: 1685, question: "The fixing agent that removes unexposed silver halide crystals is:", options: ["Hydroquinone", "Sodium carbonate", "Sodium thiosulfate", "Potassium alum"], correct: 2 },
    { id: 1686, question: "What is the main purpose of the rinsing step between developing and fixing?", options: ["To remove the protective coating", "To prevent contamination of the fixer", "To soften the emulsion", "To increase contrast"], correct: 1 },
    { id: 1687, question: "Which of the following is a result of underdeveloped film?", options: ["Dark image", "Light image", "Yellow-brown stains", "Fogged image"], correct: 1 },
    { id: 1688, question: "What could cause a film to appear completely clear after processing?", options: ["Overexposure", "Underexposure", "Omission of developer", "Omission of fixer"], correct: 2 },
    { id: 1689, question: "Yellow-brown stains on a processed film are caused by:", options: ["Insufficient fixing or washing", "Excessive exposure", "Excessive developing", "High film temperature"], correct: 0 },
    { id: 1690, question: "What is the ideal temperature for manual film developing?", options: ["10°C (50°F)", "20°C (68°F)", "25°C (77°F)", "32°C (90°F)"], correct: 1 },
    { id: 1691, question: "How long should the film remain in the developer at 20°C?", options: ["2 minutes", "4 minutes", "5 minutes", "8 minutes"], correct: 2 },
    { id: 1692, question: "In the paralleling technique, the central ray is directed:", options: ["Perpendicular to the film and long axis of the tooth", "At a 45° angle to the tooth", "Parallel to the film", "Tangential to the occlusal surface"], correct: 0 },
    { id: 1693, question: "What must be parallel in the paralleling technique?", options: ["Central ray and tooth", "Film and central ray", "Film and long axis of the tooth", "Beam and occlusal plane"], correct: 2 },
    { id: 1694, question: "The bisecting technique is based on:", options: ["The long-axis method", "The rule of isometry", "The inverse square law", "The ALARA principle"], correct: 1 },
    { id: 1695, question: "Which technique produces less image distortion?", options: ["Bisecting technique", "Paralleling technique", "Occlusal technique", "Bitewing technique"], correct: 1 },
    { id: 1696, question: "A cone-cut error results from:", options: ["Incorrect horizontal angulation", "PID not centered over the receptor", "Film placed backward", "Underdevelopment"], correct: 1 },
    { id: 1697, question: "Overlapping of teeth on a bitewing radiograph is due to:", options: ["Incorrect vertical angulation", "Incorrect horizontal angulation", "Excessive exposure time", "Using rectangular collimation"], correct: 1 },
    { id: 1698, question: "Elongation of the image occurs when:", options: ["Vertical angulation is excessive", "Vertical angulation is too steep", "Vertical angulation is insufficient", "Film is bent"], correct: 2 },
    { id: 1699, question: "Foreshortening of the image occurs when:", options: ["Vertical angulation is too steep", "Vertical angulation is too shallow", "Horizontal angulation is incorrect", "Film is underdeveloped"], correct: 0 },
    { id: 1700, question: "What type of radiation causes ionization of biological tissues?", options: ["Visible light", "Infrared radiation", "Ionizing radiation", "Microwave radiation"], correct: 2 },
    { id: 1701, question: "The direct theory of radiation injury suggests that:", options: ["X-rays pass through the cell without damage", "Radiation hits critical targets like DNA directly", "Radiation only affects the cytoplasm", "Only secondary radiation causes damage"], correct: 1 },
    { id: 1702, question: "The indirect theory of radiation injury involves:", options: ["Direct ionization of DNA", "Free radical formation from water molecules", "Heating of tissues", "Vibration of atomic nuclei"], correct: 1 },
    { id: 1703, question: "Free radicals are produced when:", options: ["X-rays pass through dry tissues", "Water molecules are ionized", "DNA absorbs photons", "Electrons are accelerated by the cathode"], correct: 1 },
    { id: 1704, question: "Which of the following tissues is most radiosensitive?", options: ["Nerve tissue", "Muscle tissue", "Bone marrow", "Mature bone"], correct: 2 },
    { id: 1705, question: "The law of Bergonié and Tribondeau states that cells are more radiosensitive when they:", options: ["Are mature and specialized", "Divide rapidly and are metabolically active", "Are inactive", "Have low mitotic rate"], correct: 1 },
    { id: 1706, question: "Which organ is considered a critical organ during dental radiography?", options: ["Heart", "Thyroid gland", "Liver", "Kidney"], correct: 1 },
    { id: 1707, question: "What is the unit used to measure absorbed dose of radiation?", options: ["Coulomb/kg", "Gray (Gy)", "Sievert (Sv)", "Radon (Rn)"], correct: 1 },
    { id: 1708, question: "The unit used to measure the biological effect of radiation is:", options: ["Gray (Gy)", "Sievert (Sv)", "Roentgen (R)", "Coulomb/kg"], correct: 1 },
    { id: 1709, question: "The amount of radiation exposure measured in air is expressed as:", options: ["Roentgen or Coulomb/kg", "Gray (Gy)", "Sievert (Sv)", "Dose equivalent"], correct: 0 },
    { id: 1710, question: "Which type of scatter radiation is most common in dental radiography?", options: ["Compton scatter", "Coherent scatter", "Photoelectric effect", "Thompson scatter"], correct: 0 },
    { id: 1711, question: "The Compton effect results in:", options: ["Complete absorption of X-ray energy", "Scattered photon of lower energy", "Conversion of X-rays to heat", "Ionization of the nucleus"], correct: 1 },
    { id: 1712, question: "The photoelectric effect is responsible for:", options: ["Image contrast", "Scatter radiation", "Blurring of image", "Reduced sharpness"], correct: 0 },
    { id: 1713, question: "The degree of darkness or blackness on a radiograph is called:", options: ["Contrast", "Density", "Sharpness", "Resolution"], correct: 1 },
    { id: 1714, question: "Higher kVp settings produce radiographs with:", options: ["High contrast (black and white)", "Low contrast (many shades of gray)", "Light images", "Increased sharpness"], correct: 1 },
    { id: 1715, question: "Increasing the mA or exposure time primarily affects:", options: ["Image density", "Image contrast", "Image sharpness", "Patient protection"], correct: 0 },
    { id: 1716, question: "The clarity or definition of a radiographic image is known as:", options: ["Contrast", "Sharpness", "Density", "Magnification"], correct: 1 },
    { id: 1717, question: "Image magnification can be minimized by:", options: ["Using a long PID and placing the film close to teeth", "Using a short PID and placing film far from teeth", "Increasing exposure time", "Using low kVp"], correct: 0 },
    { id: 1718, question: "A radiograph with overall gray appearance and low contrast is most likely caused by:", options: ["High kVp", "Low kVp", "Short exposure time", "Thin patient tissues"], correct: 0 },
    { id: 1719, question: "What is the most effective method to ensure consistent image quality and safety?", options: ["Daily film processing", "Quality assurance and control program", "Manual rinsing", "Using short PID"], correct: 1 },
    { id: 1720, question: "Digital imaging replaces film with a:", options: ["Screen plate", "Sensor or phosphor storage plate (PSP)", "Glass screen", "Lead foil backing"], correct: 1 },
    { id: 1721, question: "One advantage of digital radiography over film is:", options: ["Higher patient exposure", "Faster image acquisition", "Longer processing time", "Higher cost of each image"], correct: 1 },
    { id: 1722, question: "The main component that converts X-ray energy into electrical signals in digital sensors is the:", options: ["Photostimulable phosphor", "Silver halide crystal", "Lead screen", "Gelatin layer"], correct: 0 },
    { id: 1723, question: "Which of the following is NOT an advantage of digital imaging?", options: ["Reduced radiation exposure", "Immediate image display", "Lower equipment cost", "Ability to enhance images"], correct: 2 },
    { id: 1724, question: "The active area of a CCD or CMOS sensor is sensitive to:", options: ["Visible light only", "Heat", "X-ray photons", "Magnetic fields"], correct: 2 },
    { id: 1725, question: "In PSP systems, after exposure, the plate must be:", options: ["Processed in developer and fixer", "Scanned by a laser beam", "Exposed to light for several hours", "Discarded immediately"], correct: 1 },
    { id: 1726, question: "The image receptor that can be used repeatedly after erasing the stored image is:", options: ["Film", "PSP plate", "Screen-film cassette", "None of the above"], correct: 1 },
    { id: 1727, question: "What is the most common cause of image artifacts in PSP systems?", options: ["Low kVp", "Excessive scanning speed", "Scratches or bending of the plate", "Exposure to short PID"], correct: 2 },
    { id: 1728, question: "What is the main infection control concern with digital sensors?", options: ["Sensor breakage", "Cross-contamination between patients", "Radiation leakage", "Sensor overheating"], correct: 1 },
    { id: 1729, question: "To prevent cross-contamination, digital sensors must be:", options: ["Sterilized with steam", "Covered with a disposable barrier sheath", "Wiped with alcohol only", "Rinsed under water"], correct: 1 },
    { id: 1730, question: "Which of the following cannot be sterilized by heat?", options: ["Film holding devices", "PSP plates and digital sensors", "Metal XCP instruments", "Bite blocks"], correct: 1 },
    { id: 1731, question: "When handling exposed film or sensors, the operator must wear:", options: ["Lead apron", "Clean gloves", "Sterile gloves", "No gloves are required"], correct: 1 },
    { id: 1732, question: "What is the purpose of a lead apron with a thyroid collar?", options: ["Improve image contrast", "Reduce patient exposure to scatter radiation", "Prevent static electricity", "Stabilize patient positioning"], correct: 1 },
    { id: 1733, question: "According to lecture safety guidelines, the thyroid collar should be used for:", options: ["Extraoral exposures only", "Intraoral exposures only", "Panoramic exposures only", "Never"], correct: 1 },
    { id: 1734, question: "The operator should stand at least how far from the X-ray tubehead during exposure?", options: ["2 feet", "4 feet", "6 feet (1.83 meters)", "10 feet"], correct: 2 },
    { id: 1735, question: "When it's not possible to maintain a 6-foot distance, the operator should:", options: ["Leave the room", "Stand behind a protective barrier", "Hold the tubehead steady", "Ask the patient to move"], correct: 1 },
    { id: 1736, question: "The safest position for the operator during exposure is:", options: ["Directly in front of the beam", "Behind the patient", "Between 90° and 135° to the primary beam", "Beside the tubehead"], correct: 2 },
    { id: 1737, question: "Lead-lined walls in a dental operatory are:", options: ["Mandatory by law", "Recommended but not mandatory", "Prohibited in Canada", "Required only for pediatric offices"], correct: 1 },
    { id: 1738, question: "The radiation monitoring badge should be worn:", options: ["On the lead apron", "At waist or chest level", "On the wrist", "On the head"], correct: 1 },
    { id: 1739, question: "If the radiation badge shows exposure above the normal limit, the operator should:", options: ["Ignore it", "Take fewer X-rays", "Report and review safety protocols immediately", "Reuse the badge to confirm"], correct: 2 },
    { id: 1740, question: "The ALARA principle stands for:", options: ["As Low As Reasonably Achievable", "All Levels Are Radiographically Acceptable", "Always Limit Any Radiation Amount", "Allowable Levels Are Reasonable Always"], correct: 0 },
    { id: 1741, question: "The ALARA concept focuses on minimizing:", options: ["Processing time", "Patient discomfort", "Radiation exposure", "Film fogging"], correct: 2 },
    { id: 1742, question: "Using film-holding devices instead of the patient's finger helps:", options: ["Reduce movement and improve image quality", "Increase magnification", "Allow shorter exposure time", "Prevent overexposure to the operator"], correct: 0 },
    { id: 1743, question: "What is the function of the lead foil in a film packet?", options: ["Absorb scattered radiation and reduce patient dose", "Protect film from saliva", "Prevent film fog from light", "Speed up image development"], correct: 0 },
    { id: 1744, question: "The embossed dot on the film is used to:", options: ["Measure film speed", "Determine the orientation of the radiograph", "Indicate exposure time", "Reduce backscatter"], correct: 1 },
    { id: 1745, question: "The coin test is used to evaluate:", options: ["Film density", "Safe light effectiveness in the darkroom", "Developer strength", "Fixer quality"], correct: 1 },
    { id: 1746, question: "During the coin test, if the outline of a coin appears on the processed film, it indicates:", options: ["The film was underdeveloped", "The safe light is not safe", "The fixer is too strong", "The developer is too cold"], correct: 1 },
    { id: 1747, question: "In manual film processing, the correct sequence of steps is:", options: ["Develop → Fix → Rinse → Dry", "Develop → Rinse → Fix → Wash → Dry", "Fix → Develop → Rinse → Dry", "Rinse → Develop → Fix → Dry"], correct: 1 },
    { id: 1748, question: "The recommended development time at 20°C (68°F) is approximately:", options: ["1 minute", "2 minutes", "5 minutes", "10 minutes"], correct: 2 },
    { id: 1749, question: "The purpose of rinsing between developer and fixer is to:", options: ["Prevent contamination of the fixer", "Improve density", "Remove silver halide crystals", "Dry the film"], correct: 0 },
    { id: 1750, question: "If the developer temperature is too high, the radiograph will appear:", options: ["Lighter than normal", "Darker than normal", "Fogged and underexposed", "Clear and thin"], correct: 1 },
    { id: 1751, question: "If a radiograph appears very light, it may be due to:", options: ["Underexposure or weak developer", "Overexposure", "Overdeveloping", "Double exposure"], correct: 0 },
    { id: 1752, question: "A radiograph with yellow-brown stains indicates:", options: ["Overexposure", "Insufficient fixing or washing", "Fogged film", "Contaminated developer"], correct: 1 },
    { id: 1753, question: "Film fog may result from:", options: ["Using outdated film", "Improper safelight", "Light leaks in the darkroom", "All of the above"], correct: 3 },
    { id: 1754, question: "What is the purpose of the quality assurance program?", options: ["Maintain consistent image quality and minimize exposure", "Increase the number of retakes", "Reduce processing time", "Eliminate need for maintenance"], correct: 0 },
    { id: 1755, question: "Routine maintenance of radiographic equipment should be performed by:", options: ["Dental assistant", "Licensed service technician", "Patient", "Hygienist only"], correct: 1 },
    { id: 1756, question: "The function of the insulating oil inside the tube head is to:", options: ["Insulate against heat and electrical shock", "Produce x-rays", "Absorb primary radiation", "Prevent oxidation of the anode"], correct: 0 },
    { id: 1757, question: "The main purpose of the metal housing of the X-ray tube is to:", options: ["Prevent X-ray leakage and protect internal components", "Increase beam intensity", "Filter low-energy rays", "Focus electrons"], correct: 0 },
    { id: 1758, question: "The oil in the X-ray tubehead assists in cooling because heat is mainly produced by:", options: ["The collision of electrons with the anode target", "Leakage current", "Thermionic emission", "The cathode filament"], correct: 0 },
    { id: 1759, question: "What are the three main methods of cooling the X-ray tube according to lecture?", options: ["Radiation, evaporation, conduction", "Conduction, convection, and radiation", "Reflection, filtration, and diffusion", "Conduction, vibration, and filtration"], correct: 1 },
    { id: 1760, question: "In dental radiography, which law or principle ensures that radiation exposure is minimized for both patient and operator?", options: ["Bergonié–Tribondeau Law", "ALARA principle", "Inverse square law", "Radiographic density law"], correct: 1 },
    { id: 1761, question: "Retaking an X-ray violates the ALARA principle because:", options: ["It increases the processing time", "It increases the patient's radiation exposure unnecessarily", "It causes distortion of the image", "It requires additional developer solution"], correct: 1 },
    { id: 1762, question: "What is the first step to avoid unnecessary retakes?", options: ["Use high kVp settings", "Ensure proper positioning and exposure technique", "Increase exposure time", "Reuse old films"], correct: 1 },
    { id: 1763, question: "In automatic film processing, rinsing between the developer and fixer is not required because:", options: ["The developer is non-reactive", "The roller system removes excess solution mechanically", "Fixer neutralizes developer automatically", "The temperature is higher"], correct: 1 },
    { id: 1764, question: "The major difference between manual and automatic processing is:", options: ["Automatic processing uses only fixer", "Automatic uses rollers to move film and control time/temperature", "Manual processing does not require a darkroom", "Manual uses only light-sensitive film"], correct: 1 },
    { id: 1765, question: "The safe light test (coin test) checks for:", options: ["Developer temperature", "Darkroom light leaks", "Safe light wavelength safety", "Proper film alignment"], correct: 2 },
    { id: 1766, question: "A properly functioning automatic processor requires:", options: ["Daily replenishment and cleaning of rollers", "Constant cooling of the fixer", "Developer changed once per year", "No maintenance"], correct: 0 },
    { id: 1767, question: "Which of the following is NOT part of a quality assurance (QA) program?", options: ["Routine equipment maintenance", "Radiation monitoring badge evaluation", "Ignoring minor image artifacts", "Standardizing film processing time"], correct: 2 },
    { id: 1768, question: "How often should radiographic equipment be inspected for leakage or calibration?", options: ["Once a week", "Monthly", "Annually or per manufacturer's recommendation", "Only when issues occur"], correct: 2 },
    { id: 1769, question: "The step wedge test is used to monitor:", options: ["X-ray beam alignment", "Developer strength and image density consistency", "Safe light quality", "Collimator alignment"], correct: 1 },
    { id: 1770, question: "If the density of the step wedge test radiograph becomes lighter than normal, it indicates:", options: ["The developer is weak or cold", "Excessive kVp", "Overfixing", "Fogged film"], correct: 0 },
    { id: 1771, question: "Film handling infection control includes all EXCEPT:", options: ["Wearing gloves during exposure", "Disinfecting contaminated film packets", "Rinsing film packets before darkroom entry", "Opening film packets with bare hands"], correct: 3 },
    { id: 1772, question: "According to radiation safety guidelines in Canada, lead-lined walls in dental operatories are:", options: ["Required by law in all provinces", "Optional but recommended for high-use operatories", "Not permitted in medical buildings", "Only used for panoramic X-rays"], correct: 1 },
    { id: 1773, question: "The thyroid collar should NOT be used for:", options: ["Intraoral exposures", "Extraoral exposures (e.g., panoramic)", "Periapical radiographs", "Bitewings"], correct: 1 },
    { id: 1774, question: "The monitoring badge (TLD or film badge) should be:", options: ["Worn during the patient's exposure", "Worn only outside the clinic", "Worn while taking X-rays but stored away from radiation when not in use", "Kept in the operator's locker permanently"], correct: 2 },
    { id: 1775, question: "Who discovered X-rays in 1895?", options: ["Wilhelm Roentgen", "Marie Curie", "Thomas Edison", "Henri Becquerel"], correct: 0 },
    { id: 1776, question: "What was the first X-ray image taken of?", options: ["Roentgen's wife's hand", "A human skull", "A tooth", "A dog's leg"], correct: 0 },
    { id: 1777, question: "X-rays are a form of what type of radiation?", options: ["Electromagnetic radiation", "Sound waves", "Infrared energy", "Particle emission"], correct: 0 },
    { id: 1778, question: "Which of the following best describes X-rays?", options: ["Invisible, high-energy electromagnetic waves", "Visible blue light", "Heat waves", "Sound vibrations"], correct: 0 },
    { id: 1779, question: "What charge do X-rays carry?", options: ["No charge (neutral)", "Positive", "Negative", "Alternating charge"], correct: 0 },
    { id: 1780, question: "What is the speed of X-rays compared to visible light?", options: ["Equal to the speed of light", "Slower than light", "Faster than light", "Depends on wavelength"], correct: 0 },
    { id: 1781, question: "Which statement is TRUE about X-rays?", options: ["They can penetrate opaque substances", "They can be seen by the naked eye", "They travel in curves", "They carry sound energy"], correct: 0 },
    { id: 1782, question: "X-rays can be absorbed or scattered depending on what factor?", options: ["The density of the material", "The color of the object", "The humidity of the air", "The wavelength of visible light"], correct: 0 },
    { id: 1783, question: "X-rays can cause ionization, which means:", options: ["Atoms lose or gain electrons", "Atoms melt", "Molecules vibrate", "Cells expand"], correct: 0 },
    { id: 1784, question: "Which property allows X-rays to expose photographic film?", options: ["Their ability to ionize silver halide crystals", "Their heat production", "Their electrical charge", "Their reflection from surfaces"], correct: 0 },
    { id: 1785, question: "What is the source of electrons in the X-ray tube?", options: ["The filament of the cathode", "The tungsten target", "The anode disc", "The glass envelope"], correct: 0 },
    { id: 1786, question: "What material is the filament made of?", options: ["Tungsten", "Aluminum", "Copper", "Lead"], correct: 0 },
    { id: 1787, question: "What part of the tube focuses electrons into a narrow beam?", options: ["Focusing cup", "Lead housing", "Tube window", "Control panel"], correct: 0 },
    { id: 1788, question: "The anode is responsible for:", options: ["Converting electrons into X-rays", "Producing electrons", "Focusing the electron beam", "Filtering low-energy photons"], correct: 0 },
    { id: 1789, question: "What is the target of the anode made of?", options: ["Tungsten", "Lead", "Nickel", "Aluminum"], correct: 0 },
    { id: 1790, question: "Why is tungsten used in the target?", options: ["High melting point and good X-ray production", "Low melting point", "Cheap and light", "Non-metallic nature"], correct: 0 },
    { id: 1791, question: "The angle of the tungsten target helps to:", options: ["Direct X-rays toward the patient", "Slow down electrons", "Prevent scatter", "Increase heat"], correct: 0 },
    { id: 1792, question: "What surrounds the X-ray tube to absorb stray radiation?", options: ["Lead housing", "Aluminum filter", "Collimator", "Glass envelope"], correct: 0 },
    { id: 1793, question: "What prevents the oxidation of the filament inside the tube?", options: ["The vacuum inside the tube", "Oil cooling system", "Lead lining", "Aluminum filter"], correct: 0 },
    { id: 1794, question: "The vacuum inside the X-ray tube also helps to:", options: ["Prevent collision of electrons with air molecules", "Increase image contrast", "Slow the electrons", "Produce sound"], correct: 0 },
    { id: 1795, question: "What type of transformer reduces voltage to heat the filament?", options: ["Step-down transformer", "Step-up transformer", "Auto transformer", "Line compensator"], correct: 0 },
    { id: 1796, question: "In a step-down transformer, which coil has more turns?", options: ["Primary coil", "Secondary coil", "Both are equal", "None of the above"], correct: 0 },
    { id: 1797, question: "What type of transformer increases voltage to accelerate electrons?", options: ["Step-up transformer", "Step-down transformer", "High tension transformer", "Auto transformer"], correct: 0 },
    { id: 1798, question: "In a step-up transformer, which coil has more turns?", options: ["Secondary coil", "Primary coil", "Equal turns", "Core coil"], correct: 0 },
    { id: 1799, question: "What is the main function of an autotransformer?", options: ["Regulate voltage before it enters the step-up transformer", "Heat the filament", "Measure exposure", "Filter low-energy rays"], correct: 0 },
    { id: 1800, question: "The flow of electrons in one direction only is known as:", options: ["Direct current (DC)", "Alternating current (AC)", "Pulsating current", "Inverse current"], correct: 0 },
    { id: 1801, question: "What does the high-voltage circuit control?", options: ["Acceleration of electrons from cathode to anode", "Heating of the filament", "Exposure timer", "Beam filtration"], correct: 0 },
    { id: 1802, question: "What does the low-voltage circuit control?", options: ["The filament temperature", "The anode rotation", "The intensity of the X-rays", "The exposure timer"], correct: 0 },
    { id: 1803, question: "Which component prevents electrical shock and radiation leakage?", options: ["Metal housing (lead-lined)", "Tungsten target", "Filament", "PID cone"], correct: 0 },
    { id: 1804, question: "Why must all X-ray units be properly grounded?", options: ["To prevent electrical shock", "To increase radiation output", "To improve image contrast", "To reduce kVp"], correct: 0 },
    { id: 1805, question: "X-rays are produced when high-speed electrons:", options: ["Strike the tungsten target", "Hit the focusing cup", "Collide with the glass window", "Touch the filament directly"], correct: 0 },
    { id: 1806, question: "The energy of the X-ray beam depends mainly on:", options: ["The kilovoltage (kVp)", "The milliamperage (mA)", "The exposure time", "The focal spot size"], correct: 0 },
    { id: 1807, question: "The quantity of X-rays produced depends on:", options: ["The milliamperage (mA) and exposure time", "The target angle", "The tube housing material", "The vacuum level"], correct: 0 },
    { id: 1808, question: "What type of radiation is produced when electrons hit the target and slow down?", options: ["Bremsstrahlung (braking) radiation", "Characteristic radiation", "Coherent scatter", "Ionizing radiation"], correct: 0 },
    { id: 1809, question: "What type of radiation occurs when an inner shell electron is removed from a tungsten atom?", options: ["Characteristic radiation", "Scatter radiation", "Secondary radiation", "Gamma radiation"], correct: 0 },
    { id: 1810, question: "Which type of radiation makes up the majority of the X-ray beam?", options: ["Bremsstrahlung radiation", "Characteristic radiation", "Secondary radiation", "Gamma rays"], correct: 0 },
    { id: 1811, question: "What percent of energy in the X-ray tube is converted to heat?", options: ["99%", "75%", "50%", "1%"], correct: 0 },
    { id: 1812, question: "What percent of energy becomes useful X-rays?", options: ["1%", "10%", "25%", "99%"], correct: 0 },
    { id: 1813, question: "What removes low-energy, long-wavelength X-rays from the beam?", options: ["Aluminum filter", "Collimator", "Lead apron", "PID"], correct: 0 },
    { id: 1814, question: "What limits the size of the X-ray beam to reduce patient exposure?", options: ["Collimator", "Filter", "Cone", "Timer"], correct: 0 },
    { id: 1815, question: "Increasing kVp results in:", options: ["Higher energy, more penetrating X-rays", "Lower energy, less penetrating X-rays", "Softer beam", "Reduced contrast"], correct: 0 },
    { id: 1816, question: "Increasing mA affects:", options: ["The number of X-rays produced", "The speed of electrons", "The wavelength", "The beam direction"], correct: 0 },
    { id: 1817, question: "Increasing exposure time has the same effect as:", options: ["Increasing mA", "Increasing kVp", "Increasing filtration", "Decreasing distance"], correct: 0 },
    { id: 1818, question: "What happens to image density if exposure time is doubled?", options: ["It becomes darker", "It becomes lighter", "No change", "Blurry"], correct: 0 },
    { id: 1819, question: "The total exposure in mAs is equal to:", options: ["mA × seconds", "kVp × seconds", "kVp × distance", "mA ÷ seconds"], correct: 0 },
    { id: 1820, question: "What happens to beam intensity when the distance from the source is doubled?", options: ["It becomes one-fourth as intense", "It doubles", "It becomes half", "No change"], correct: 0 },
    { id: 1821, question: "What law explains the relationship between distance and beam intensity?", options: ["Inverse square law", "Photoelectric effect", "Law of absorption", "Density law"], correct: 0 },
    { id: 1822, question: "Shorter wavelength X-rays have:", options: ["Higher energy and greater penetration", "Lower energy and less penetration", "No energy", "Visible color"], correct: 0 },
    { id: 1823, question: "What term describes the overall blackness of a radiographic image?", options: ["Density", "Contrast", "Sharpness", "Resolution"], correct: 0 },
    { id: 1824, question: "What controls the contrast of a radiograph?", options: ["Kilovoltage (kVp)", "Milliamperage", "Exposure time", "Focal spot"], correct: 0 },
    { id: 1825, question: "High contrast radiographs have:", options: ["Black and white areas with few gray tones", "Many shades of gray", "Uniform density", "Blurred outlines"], correct: 0 },
    { id: 1826, question: "Low contrast radiographs are best for detecting:", options: ["Periodontal bone loss", "Caries", "Fractures", "Restorations"], correct: 0 },
    { id: 1827, question: "What determines sharpness in an image?", options: ["Focal spot size", "kVp setting", "Exposure time", "Filter thickness"], correct: 0 },
    { id: 1828, question: "What causes magnification of an image?", options: ["Long object-film distance", "Short target-film distance", "Small focal spot", "Close film placement"], correct: 0 },
    { id: 1829, question: "How can magnification be minimized?", options: ["Use a long PID and place film close to the tooth", "Short PID, film far from tooth", "Increase exposure time", "Use lower mA"], correct: 0 },
    { id: 1830, question: "What causes penumbra (blurred edges)?", options: ["Large focal spot size", "Small focal spot size", "Increased distance", "Proper alignment"], correct: 0 },
    { id: 1831, question: "What causes image distortion?", options: ["Improper vertical or horizontal angulation", "Low kVp", "Long PID", "Film sensitivity"], correct: 0 },
    { id: 1832, question: "What is the invisible image formed on the film before processing?", options: ["Latent image", "Visible image", "Ghost image", "Scatter image"], correct: 0 },
    { id: 1833, question: "What chemical in the film emulsion reacts to X-rays?", options: ["Silver halide crystals", "Sodium chloride", "Calcium phosphate", "Ferric oxide"], correct: 0 },
    { id: 1834, question: "The developer converts exposed silver halide crystals into:", options: ["Black metallic silver", "White salts", "Unexposed crystals", "Gelatin"], correct: 0 },
    { id: 1835, question: "What does \"Roentgen\" measure?", options: ["Exposure in air", "Absorbed dose", "Dose equivalent", "Biological effect"], correct: 0 },
    { id: 1836, question: "What does \"RAD\" stand for?", options: ["Radiation Absorbed Dose", "Radioactive Dose", "Radiation Average Density", "Random Atomic Decay"], correct: 0 },
    { id: 1837, question: "What does \"REM\" measure?", options: ["Biological effect of radiation", "Beam intensity", "Ion pairs", "Film density"], correct: 0 },
    { id: 1838, question: "The SI unit for absorbed dose is:", options: ["Gray (Gy)", "Sievert (Sv)", "Roentgen", "Curie"], correct: 0 },
    { id: 1839, question: "The SI unit for dose equivalent is:", options: ["Sievert (Sv)", "Gray (Gy)", "Roentgen", "Becquerel"], correct: 0 },
    { id: 1840, question: "Which tissues are most radiosensitive?", options: ["Bone marrow and reproductive cells", "Nerves and muscle", "Enamel and cementum", "Cartilage"], correct: 0 },
    { id: 1841, question: "What is the least radiosensitive tissue?", options: ["Nerve tissue", "Bone marrow", "Lymphocytes", "Epithelial cells"], correct: 0 },
    { id: 1842, question: "What is stochastic radiation effect?", options: ["Probability increases with dose, no threshold", "Occurs only above threshold", "Immediate tissue injury", "Temporary effect"], correct: 0 },
    { id: 1843, question: "What is deterministic effect?", options: ["Has threshold; severity increases with dose", "No threshold; random effect", "Always reversible", "Non-biological"], correct: 0 },
    { id: 1844, question: "What are examples of stochastic effects?", options: ["Cancer and genetic mutations", "Skin burns", "Cataracts", "Erythema"], correct: 0 },
    { id: 1845, question: "What principle minimizes radiation exposure?", options: ["ALARA (As Low As Reasonably Achievable)", "ALARM", "ALATA", "ALERT"], correct: 0 },
    { id: 1846, question: "What are the three basic methods of radiation protection?", options: ["Time, distance, shielding", "Heat, sound, color", "Energy, mass, light", "Filter, PID, housing"], correct: 0 },
    { id: 1847, question: "What is the safest operator position during exposure?", options: ["6 feet away, 90–135° to primary beam", "Directly behind the patient", "In front of the beam", "Beside the tube head"], correct: 0 },
    { id: 1848, question: "What device restricts the beam to reduce scatter?", options: ["Collimator", "Filter", "Housing", "PID"], correct: 0 },
    { id: 1849, question: "What is the function of aluminum filters?", options: ["Remove low-energy, long-wavelength X-rays", "Increase contrast", "Decrease penetration", "Block high-energy rays"], correct: 0 },
    { id: 1850, question: "What is the minimum total filtration required above 70 kVp?", options: ["2.5 mm aluminum equivalent", "1.0 mm", "3.0 mm", "5.0 mm"], correct: 0 },
    { id: 1851, question: "What is the purpose of collimation?", options: ["Reduces patient dose and scatter radiation", "Increases field size", "Increases magnification", "Enhances contrast"], correct: 0 },
    { id: 1852, question: "What shape of collimator reduces exposure the most?", options: ["Rectangular", "Round", "Cone", "Open cylinder"], correct: 0 },
    { id: 1853, question: "What is used to protect the patient's thyroid gland?", options: ["Lead collar", "Aluminum shield", "Paper bib", "Plastic guard"], correct: 0 },
    { id: 1854, question: "What is used to protect reproductive and torso organs?", options: ["Lead apron", "Collimator", "Filter", "PID"], correct: 0 },
    { id: 1855, question: "What should be worn by operators to measure radiation exposure?", options: ["Dosimeter badge", "Lead gloves", "Film apron", "Stopwatch"], correct: 0 },
    { id: 1856, question: "When should the dosimeter badge be worn?", options: ["Only during exposure", "At all times in the clinic", "Only during lab", "Once a week"], correct: 0 },
    { id: 1857, question: "Where should the badge be worn?", options: ["On the collar, outside the apron", "On the wrist", "Inside the apron", "On the chair"], correct: 0 },
    { id: 1858, question: "How often are dosimeter readings typically evaluated?", options: ["Every 3 months", "Every week", "Once a year", "Every 6 months"], correct: 0 },
    { id: 1859, question: "What should be done if the badge is lost?", options: ["Report and replace immediately", "Borrow someone else's", "Ignore it", "Estimate exposure"], correct: 0 },
    { id: 1860, question: "What device indicates exposure settings on the control panel?", options: ["Timer display", "Filament light", "Beam indicator", "Focus chart"], correct: 0 },
    { id: 1861, question: "What is the function of the PID?", options: ["Directs and shapes the X-ray beam", "Filters low-energy rays", "Measures distance", "Blocks scatter"], correct: 0 },
    { id: 1862, question: "What should be checked regularly for safety compliance?", options: ["Equipment calibration and leakage", "Film density", "Patient chart", "Control box color"], correct: 0 },
    { id: 1863, question: "When radiation leakage is suspected, what is the protocol?", options: ["Stop using and call technician", "Tape the crack", "Continue using", "Increase filtration"], correct: 0 },
    { id: 1864, question: "What government body regulates dental radiation standards in Canada?", options: ["Health Canada (Safety Code 30)", "FDA", "OSHA", "CDC"], correct: 0 },
    { id: 1865, question: "Increasing exposure time increases:", options: ["Image density", "Image contrast", "Scatter", "Distortion"], correct: 0 },
    { id: 1866, question: "Decreasing kVp will result in:", options: ["High contrast, light image", "Low contrast, dark image", "High density", "No change"], correct: 0 },
    { id: 1867, question: "Increasing mA will:", options: ["Darken the image", "Lighten the image", "Increase contrast", "Decrease sharpness"], correct: 0 },
    { id: 1868, question: "What happens if the distance between PID and film is too short?", options: ["Image will be darker (increased intensity)", "Image will be lighter", "Blurred edges", "Elongation"], correct: 0 },
    { id: 1869, question: "What can cause underexposure?", options: ["Low mA or short time", "High kVp", "Long PID", "Large collimation"], correct: 0 },
    { id: 1870, question: "What is the most effective way to protect the operator?", options: ["Leave the room or stand behind barrier", "Wear gloves", "Reduce mA", "Shorten exposure time only"], correct: 0 },
    { id: 1871, question: "Which patient protection technique reduces retakes?", options: ["Proper film placement and angulation", "Using more exposure", "Holding the film by hand", "Skipping thyroid collar"], correct: 0 },
    { id: 1872, question: "Radiation safety is based on which concept?", options: ["Cumulative exposure", "Single dose only", "Instant absorption", "Reversible injury"], correct: 0 },
    { id: 1873, question: "Why must students never hold the tube or film?", options: ["It causes unnecessary exposure", "It affects contrast", "It blurs image", "It delays processing"], correct: 0 },
    { id: 1874, question: "The ultimate goal of radiation protection is to:", options: ["Minimize exposure while producing diagnostic-quality images", "Eliminate radiation completely", "Speed up workflow", "Reduce cost"], correct: 0 },
    { id: 1875, question: "Which component of the X-ray tube is responsible for thermionic emission?", options: ["Tungsten target", "Copper stem", "Tungsten filament", "Aluminum filter"], correct: 2 },
    { id: 1876, question: "What is the primary function of the insulating oil in the tubehead?", options: ["Produce electrons", "Reduce scatter radiation", "Prevent overheating and provide electrical insulation", "Support the PID"], correct: 2 },
    { id: 1877, question: "What does a step-down transformer do in the dental X-ray machine?", options: ["Converts AC to DC", "Reduces voltage to 3–5 volts for the filament", "Increases voltage for the anode", "Filters low-energy photons"], correct: 1 },
    { id: 1878, question: "Which parameter controls the speed and penetrability of the X-ray beam?", options: ["mA", "Exposure time", "kVp", "Filtration"], correct: 2 },
    { id: 1879, question: "Less than 1% of the energy produced at the anode becomes X-rays. The remaining energy becomes:", options: ["Radiation leakage", "Heat", "Scatter radiation", "Filtration loss"], correct: 1 },
    { id: 1880, question: "What is the function of the aluminum filter?", options: ["Shape the X-ray beam", "Remove long-wavelength, low-energy photons", "Increase density", "Reduce anode heat"], correct: 1 },
    { id: 1881, question: "Which part of the tube restricts the size of the X-ray beam?", options: ["Copper stem", "Glass window", "Collimator", "Step-up transformer"], correct: 2 },
    { id: 1882, question: "What happens if the safelight fails the coin test?", options: ["The darkroom is too cold", "The safelight is unsafe and causes film fog", "The developer is too strong", "The fixer needs replacement"], correct: 1 },
    { id: 1883, question: "What is the recommended safe exposure time under the safelight?", options: ["10–20 seconds", "30–60 seconds", "2–3 minutes", "More than 4 minutes"], correct: 2 },
    { id: 1884, question: "What does labial mounting mean?", options: ["Viewing radiographs from the patient's tongue side", "Viewing the radiograph as if facing the patient", "Viewing from behind the patient", "Viewing with embossed dot down"], correct: 1 },
    { id: 1885, question: "Which film processing error results in a brownish image?", options: ["Over-fixing", "Inadequate washing", "Developer too hot", "Film reversed"], correct: 1 },
    { id: 1886, question: "The ideal temperature of the developer in manual processing is:", options: ["15°C (59°F)", "20°C (68°F)", "30°C (86°F)", "40°C (104°F)"], correct: 1 },
    { id: 1887, question: "Which exposure error causes overlapped contacts?", options: ["Incorrect vertical angulation", "Excessive kVp", "Incorrect horizontal angulation", "Film bending"], correct: 2 },
    { id: 1888, question: "What is the function of the copper stem in the anode?", options: ["Create electrons", "Dissipate heat", "Produce scatter photons", "Hold the collimator"], correct: 1 },
    { id: 1889, question: "Increasing mA results in:", options: ["Higher beam quality only", "More electrons and increased density", "Increased contrast", "Lower patient dose"], correct: 1 },
    { id: 1890, question: "What does the PID do?", options: ["Converts AC to DC", "Reduces X-ray energy", "Directs the X-ray beam toward the patient", "Removes low-energy photons"], correct: 2 },
    { id: 1891, question: "Which object should be parallel to the receptor to avoid distortion?", options: ["PID", "X-ray beam", "Object/tooth", "Operator's hand"], correct: 2 },
    { id: 1892, question: "A light radiograph may be caused by:", options: ["Excessive kVp", "Overexposure", "Old or depleted developer", "Excessive developing time"], correct: 2 },
    { id: 1893, question: "What does the embossed identification dot determine?", options: ["Film expiration", "Film orientation for mounting", "Exposure intensity", "Film speed"], correct: 1 },
    { id: 1894, question: "What is the purpose of the step-up transformer?", options: ["Reduce voltage", "Stabilize voltage fluctuations", "Increase voltage to accelerate electrons", "Prevent film fog"], correct: 2 }
  ],
  "2. Dental X-ray Equipment, Film Processing": [
    // Questions to be added for this topic
  ],
  "3. Dental Radiography Theory": [
    // Questions to be added for this topic
  ],
  "4. Dental Radiography Theory": [
    // Questions to be added for this topic
  ],
  "5. Dental Radiography Theory": [
    // Questions to be added for this topic
  ],
  "6. Dental Radiography Theory": [
    // Questions to be added for this topic
  ],
  "7. Dental Radiography Theory": [
    // Questions to be added for this topic
  ],
  "8. Dental Radiography Theory": [
    // Questions to be added for this topic
  ]
};

// Google AdSense Component
const GoogleAd = ({ slot, format = "auto", className = "" }) => {
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && slot) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`my-4 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5701429538019796"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default function ImprovedTestBankApp() {
  const [screen, setScreen] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [totalTestTime, setTotalTestTime] = useState(0);
  const [testHistory, setTestHistory] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionLimit, setQuestionLimit] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [parentSubject, setParentSubject] = useState(null);
  const [lastTestQuestions, setLastTestQuestions] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('testHistory');
      if (savedHistory) {
        setTestHistory(JSON.parse(savedHistory));
      }
      
      const savedFlags = localStorage.getItem('flaggedQuestions');
      if (savedFlags) {
        setFlaggedQuestions(JSON.parse(savedFlags));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save test history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('testHistory', JSON.stringify(testHistory));
    } catch (error) {
      console.error('Error saving test history:', error);
    }
  }, [testHistory]);

  // Save flagged questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions));
    } catch (error) {
      console.error('Error saving flagged questions:', error);
    }
  }, [flaggedQuestions]);

  // Timer logic - FIXED to only run during active test and when not paused
  useEffect(() => {
    if (testStarted && !studyMode && !isPaused && timeLeft > 0 && screen === 'test') {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!studyMode && timeLeft === 0 && testStarted && screen === 'test') {
      finishTest();
    }
  }, [testStarted, timeLeft, screen, studyMode, isPaused]);

  // Memoized statistics calculation
  const detailedStats = useMemo(() => {
    if (testHistory.length === 0) return null;

    const totalTests = testHistory.length;
    const averageScore = Math.round(
      testHistory.reduce((sum, t) => sum + t.score, 0) / totalTests
    );
    const totalQuestions = testHistory.reduce((sum, t) => sum + t.total, 0);
    const totalCorrect = testHistory.reduce((sum, t) => sum + t.correct, 0);
    const bestScore = Math.max(...testHistory.map(t => t.score));
    const worstScore = Math.min(...testHistory.map(t => t.score));
    
    // Calculate recent trend (last 5 tests vs previous 5 tests)
    let trend = 'stable';
    if (totalTests >= 10) {
      const recent5 = testHistory.slice(0, 5).reduce((sum, t) => sum + t.score, 0) / 5;
      const previous5 = testHistory.slice(5, 10).reduce((sum, t) => sum + t.score, 0) / 5;
      if (recent5 > previous5 + 5) trend = 'improving';
      else if (recent5 < previous5 - 5) trend = 'declining';
    }

    return {
      totalTests,
      averageScore,
      totalQuestions,
      totalCorrect,
      bestScore,
      worstScore,
      accuracy: Math.round((totalCorrect / totalQuestions) * 100),
      trend
    };
  }, [testHistory]);

  // Memoized subject statistics
  const subjectStats = useMemo(() => {
    const stats = {};
    testHistory.forEach(test => {
      const key = test.subtopic || test.subject;
      if (!stats[key]) {
        stats[key] = { total: 0, scores: [], questions: 0, correct: 0 };
      }
      stats[key].total++;
      stats[key].scores.push(test.score);
      stats[key].questions += test.total;
      stats[key].correct += test.correct;
    });
    return stats;
  }, [testHistory]);

  const selectSubject = (subject) => {
    if (subjectsWithSubtopics[subject]) {
      setSelectedSubject(subject);
      setQuestionLimit({});
      setScreen('subtopics');
    } else {
      setSelectedSubject(subject);
      setScreen('questionInput');
    }
  };

  const handleQuestionLimitChange = (key, value) => {
    setQuestionLimit(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startTest = (subject, subtopic = null, isRetake = false) => {
    try {
      // Store parent for back navigation
      if (subtopic) {
        setParentSubject(subject);
      } else {
        setParentSubject(null);
      }
      
      setSelectedSubject(subject);
      setSelectedSubtopic(subtopic);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setReviewAnswers([]);
      setIsAnswerSubmitted(false);
      setIsPaused(false);
      
      const questionKey = subtopic || subject;
      const allQuestions = questionBank[questionKey] || [];
      
      if (allQuestions.length === 0) {
        alert('No questions available for this topic yet.');
        return;
      }
      
      let questionsToUse;
      
      if (isRetake) {
        // Retake: use the exact same questions from last test
        questionsToUse = lastTestQuestions.length > 0 ? lastTestQuestions : shuffleArray(allQuestions).slice(0, 20);
      } else {
        // New test: filter out used questions
        const availableQuestions = allQuestions.filter(q => !usedQuestionIds.has(q.id));
        
        if (availableQuestions.length === 0) {
          // All questions used, reset
          setUsedQuestionIds(new Set());
          alert('You\'ve completed all available questions! Starting fresh with new questions.');
          questionsToUse = shuffleArray(allQuestions);
        } else {
          questionsToUse = shuffleArray(availableQuestions);
        }
        
        // Apply question limit if set
        const limit = questionLimit[questionKey];
        if (limit && !isNaN(limit) && limit > 0 && limit < questionsToUse.length) {
          questionsToUse = questionsToUse.slice(0, parseInt(limit));
        }
        
        // Save these questions for potential retake
        setLastTestQuestions(questionsToUse);
        
        // Mark these questions as used
        const newUsedIds = new Set(usedQuestionIds);
        questionsToUse.forEach(q => newUsedIds.add(q.id));
        setUsedQuestionIds(newUsedIds);
      }
      
      setSelectedQuestions(questionsToUse);
      
      const totalTime = studyMode ? 0 : questionsToUse.length * 90;
      setTimeLeft(totalTime);
      setTotalTestTime(totalTime);
      
      setTestStarted(true);
      setScreen('test');
    } catch (error) {
      console.error('Error starting test:', error);
      alert('An error occurred while starting the test. Please try again.');
    }
  };

  const startFlaggedTest = (subject, subtopic = null) => {
    try {
      // Store parent for back navigation
      if (subtopic) {
        setParentSubject(subject);
      } else {
        setParentSubject(null);
      }
      
      setSelectedSubject(subject);
      setSelectedSubtopic(subtopic);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setReviewAnswers([]);
      setIsAnswerSubmitted(false);
      setIsPaused(false);
      
      const questionKey = subtopic || subject;
      const flaggedQs = getFlaggedQuestionsForTopic(questionKey);
      
      if (flaggedQs.length === 0) {
        alert('No flagged questions for this topic yet. Flag questions during practice to review them later!');
        return;
      }
      
      setSelectedQuestions(flaggedQs);
      
      const totalTime = studyMode ? 0 : flaggedQs.length * 90;
      setTimeLeft(totalTime);
      setTotalTestTime(totalTime);
      
      setTestStarted(true);
      setScreen('test');
    } catch (error) {
      console.error('Error starting flagged test:', error);
      alert('An error occurred while starting the test. Please try again.');
    }
  };

  const selectAnswer = (index) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
  };

  const toggleFlag = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const questionId = currentQuestion.id;
    
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const nextQuestion = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    
    // Use selectedAnswer directly (no shuffling)
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Store for review
    const reviewData = {
      question: currentQuestion,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect: selectedAnswer === currentQuestion.correct
    };
    setReviewAnswers([...reviewAnswers, reviewData]);
    
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = (finalAnswers = answers) => {
    setTestStarted(false);
    let correct = 0;
    
    finalAnswers.forEach((answer, idx) => {
      if (answer === selectedQuestions[idx].correct) correct++;
    });
    
    const score = selectedQuestions.length > 0 ? Math.round((correct / selectedQuestions.length) * 100) : 0;
    const timeTaken = studyMode ? 0 : totalTestTime - timeLeft;
    
    const result = {
      subject: selectedSubject,
      subtopic: selectedSubtopic,
      score,
      correct,
      total: selectedQuestions.length,
      timeTaken,
      date: new Date().toLocaleString(),
      studyMode
    };
    
    setTestHistory([result, ...testHistory]);
    setShowReview(false);
    setScreen('results');
  };

  const exportResults = () => {
    try {
      const csv = testHistory.map(t => 
        `${t.date},${t.subject},"${t.subtopic || ''}",${t.score}%,${t.correct}/${t.total},${formatTime(t.timeTaken)},${t.studyMode ? 'Study' : 'Timed'}`
      ).join('\n');
      
      const csvContent = `Date,Subject,Topic,Score,Correct/Total,Time,Mode\n${csv}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-history-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting results:', error);
      alert('Failed to export results. Please try again.');
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history? This cannot be undone.')) {
      setTestHistory([]);
      localStorage.removeItem('testHistory');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFlaggedQuestionsForTopic = (topicKey) => {
    const allQuestions = questionBank[topicKey] || [];
    return allQuestions.filter(q => flaggedQuestions.includes(q.id));
  };

  // Home Screen
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Home Screen Top Banner */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-blue-600 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C10.5 2 9 2.5 8 3.5C7 4.5 6.5 6 6.5 8C6.5 10 6 12 5 14C4 16 3 18 3 20C3 21.1 3.9 22 5 22C6.1 22 7 21.1 7 20C7 19 7.5 17.5 8 16C8.5 14.5 9 13 9 12C9 11 9.5 10.5 10 10.5C10.5 10.5 11 11 11 12L11 20C11 21.1 11.9 22 13 22C14.1 22 15 21.1 15 20L15 12C15 11 15.5 10.5 16 10.5C16.5 10.5 17 11 17 12C17 13 17.5 14.5 18 16C18.5 17.5 19 19 19 20C19 21.1 19.9 22 21 22C22.1 22 23 21.1 23 20C23 18 22 16 21 14C20 12 19.5 10 19.5 8C19.5 6 19 4.5 18 3.5C17 2.5 15.5 2 14 2C13 2 12.5 2 12 2Z"/>
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">Dental Hygiene Test Bank</h1>
            </div>
            
            {detailedStats && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Your Progress</span>
                  {detailedStats.trend === 'improving' && <TrendingUp className="w-4 h-4 text-green-600" />}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{detailedStats.averageScore}%</div>
                    <div className="text-xs text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{detailedStats.totalTests}</div>
                    <div className="text-xs text-gray-600">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{detailedStats.accuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-gray-600 text-center mb-4">
              Select a lecture to view subjects
            </p>

            <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
              {Object.keys(subjectsByLesson).map((lesson, index) => {
                const subjectCount = subjectsByLesson[lesson].length;
                
                return (
                  <button
                    key={index}
                    onClick={() => selectSubject(lesson)}
                    className="w-full text-left py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-800"
                  >
                    <span className="text-sm font-bold">{lesson}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-blue-600 mr-2">{subjectCount} subjects</span>
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setScreen('progress')}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Progress</p>
            </button>
            <button
              onClick={() => setScreen('history')}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">History</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Input Screen
  if (screen === 'questionInput') {
    const totalQuestions = questionBank[selectedSubject]?.length || 0;
    const currentLimit = questionLimit[selectedSubject] || '';
    const flaggedCount = getFlaggedQuestionsForTopic(selectedSubject).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Subject Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => {
                  // Check if this subject has a parent (came from a Lesson)
                  const cameFromLesson = Object.entries(subjectsByLesson).find(([lecture, subjects]) => 
                    subjects.includes(selectedSubject)
                  );
                  
                  if (cameFromLesson) {
                    // Go back to the lecture's subject list
                    setSelectedSubject(cameFromLesson[0]);
                    setScreen('subtopics');
                  } else {
                    // Go back to home
                    setScreen('home');
                  }
                }}
                className="mr-3 text-blue-600 hover:text-blue-700"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedSubject}</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Total available questions: <span className="font-bold text-blue-600">{totalQuestions}</span>
                {flaggedCount > 0 && (
                  <span className="ml-2 text-yellow-600 font-semibold">
                    • {flaggedCount} flagged
                  </span>
                )}
              </p>
              
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many questions do you want to practice?
              </label>
              <input
                type="number"
                min="1"
                max={totalQuestions}
                value={currentLimit}
                onChange={(e) => handleQuestionLimitChange(selectedSubject, e.target.value)}
                placeholder={`Enter 1-${totalQuestions}`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                aria-label="Number of questions"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to practice all {totalQuestions} questions
              </p>
            </div>

            <div className="mb-6">
              <label className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl cursor-pointer hover:from-green-100 hover:to-blue-100 transition-all">
                <input
                  type="checkbox"
                  checked={studyMode}
                  onChange={(e) => setStudyMode(e.target.checked)}
                  className="mr-3 w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">Study Mode</div>
                  <div className="text-xs text-gray-600">No timer, instant feedback on each question</div>
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => startTest(selectedSubject, null)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start {studyMode ? 'Study Session' : 'Test'}
              </button>

              {flaggedCount > 0 && (
                <button
                  onClick={() => startFlaggedTest(selectedSubject, null)}
                  className="w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 py-4 rounded-xl font-semibold hover:bg-yellow-100 transition-all flex items-center justify-center"
                >
                  <Flag className="w-5 h-5 mr-2" fill="currentColor" />
                  Practice {flaggedCount} Flagged Question{flaggedCount !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subtopics Screen
  if (screen === 'subtopics') {
    const subtopics = subjectsWithSubtopics[selectedSubject];
    const isLesson = selectedSubject.startsWith('Lesson');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Topic Selection Screen */}
          <GoogleAd slot="5701429538019796" format="horizontal" className="mb-4" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setScreen('home')}
                className="mr-3 text-blue-600 hover:text-blue-700"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedSubject}</h2>
            </div>

            <div className="mb-6">
              <label className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl cursor-pointer hover:from-green-100 hover:to-blue-100 transition-all">
                <input
                  type="checkbox"
                  checked={studyMode}
                  onChange={(e) => setStudyMode(e.target.checked)}
                  className="mr-3 w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">Study Mode</div>
                  <div className="text-xs text-gray-600">No timer, instant feedback</div>
                </div>
              </label>
            </div>

            <p className="text-gray-600 mb-6">
              {isLesson ? 'Select a subject to start your test' : 'Select a topic to start your test'}
            </p>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {subtopics.map((subtopic, index) => {
                const hasQuestions = questionBank[subtopic]?.length > 0;
                const questionCount = questionBank[subtopic]?.length || 0;
                const currentLimit = questionLimit[subtopic] || '';
                const flaggedCount = getFlaggedQuestionsForTopic(subtopic).length;
                
                // Check if this subtopic has its own subtopics (like Pathophysiology)
                const hasSubSubtopics = subjectsWithSubtopics[subtopic];
                
                return (
                  <div key={index} className="space-y-2">
                    <div className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                      hasQuestions || hasSubSubtopics
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50'
                        : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${hasQuestions || hasSubSubtopics ? 'text-gray-800' : 'text-gray-400'}`}>{subtopic}</span>
                        <div className="flex items-center gap-2">
                          {hasSubSubtopics ? (
                            <button
                              onClick={() => selectSubject(subtopic)}
                              className="flex items-center text-xs text-blue-600 hover:text-blue-700"
                            >
                              <span className="mr-1">{subjectsWithSubtopics[subtopic].length} topics</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : hasQuestions ? (
                            <>
                              <span className="text-xs text-blue-600">{questionCount} Q</span>
                              {flaggedCount > 0 && (
                                <span className="text-xs text-yellow-600 flex items-center">
                                  <Flag className="w-3 h-3 mr-1" fill="currentColor" />
                                  {flaggedCount}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Coming soon</span>
                          )}
                        </div>
                      </div>
                      
                      {hasQuestions && !hasSubSubtopics && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="1"
                              max={questionCount}
                              value={currentLimit}
                              onChange={(e) => handleQuestionLimitChange(subtopic, e.target.value)}
                              placeholder={`Max ${questionCount}`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Number of questions for ${subtopic}`}
                            />
                            <button
                              onClick={() => startTest(selectedSubject, subtopic)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center"
                              aria-label={`Start test for ${subtopic}`}
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                          {flaggedCount > 0 && (
                            <button
                              onClick={() => startFlaggedTest(selectedSubject, subtopic)}
                              className="w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all flex items-center justify-center text-sm font-semibold"
                              aria-label={`Practice ${flaggedCount} flagged questions`}
                            >
                              <Flag className="w-4 h-4 mr-2" fill="currentColor" />
                              Practice {flaggedCount} Flagged Question{flaggedCount !== 1 ? 's' : ''}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test Screen
  if (screen === 'test') {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const showAdBetweenQuestions = currentQuestionIndex > 0 && !isAnswerSubmitted;
    
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md">
            <p className="text-gray-700 text-center">No questions available for this subject yet.</p>
            <button
              onClick={() => setScreen('home')}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const isFlagged = flaggedQuestions.includes(currentQuestion.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          
          {/* Google Ad - Show every 5 questions */}
          {showAdBetweenQuestions && (
            <GoogleAd slot="5701429538019796" format="rectangle" className="mb-4" />
          )}
          
          <div className="bg-white rounded-t-3xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="w-6"></div> {/* Spacer to maintain layout */}
              {!studyMode && (
                <div className="flex items-center">
                  <Clock className={`w-5 h-5 mr-2 ${timeLeft < 60 ? 'text-red-600' : isPaused ? 'text-gray-400' : 'text-blue-600'}`} />
                  <span className={`font-bold ${timeLeft < 60 && !isPaused ? 'text-red-600' : isPaused ? 'text-gray-400' : 'text-gray-700'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {studyMode && <div className="text-sm font-semibold text-green-600">Study Mode</div>}
              <div className="text-sm font-semibold text-gray-600">
                {currentQuestionIndex + 1}/{selectedQuestions.length}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>{selectedSubject}{selectedSubtopic ? ` • ${selectedSubtopic}` : ''}</span>
              <div className="flex items-center gap-2">
                {!studyMode && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`flex items-center ${isPaused ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 transition-colors`}
                    aria-label={isPaused ? 'Resume test' : 'Pause test'}
                  >
                    <Pause className="w-4 h-4 mr-1" fill={isPaused ? 'currentColor' : 'none'} />
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                )}
                <button
                  onClick={toggleFlag}
                  className={`flex items-center ${isFlagged ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600 transition-colors`}
                  aria-label={isFlagged ? 'Unflag question' : 'Flag question'}
                >
                  <Flag className="w-4 h-4 mr-1" fill={isFlagged ? 'currentColor' : 'none'} />
                  {isFlagged ? 'Flagged' : 'Flag'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-3xl shadow-2xl p-6 mb-4 relative">
            {/* Blur overlay when paused */}
            {isPaused && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-b-3xl z-10 flex items-center justify-center">
                <div className="text-center px-6">
                  <Pause className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Test Paused</h3>
                  <p className="text-gray-600 mb-6">Timer is stopped</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsPaused(false)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Resume Test
                    </button>
                    <button
                      onClick={() => {
                        setTestStarted(false);
                        setIsPaused(false);
                        
                        // Navigate back to appropriate screen
                        if (selectedSubtopic && parentSubject) {
                          setSelectedSubject(parentSubject);
                          setScreen('subtopics');
                        } 
                        else if (subjectsWithSubtopics[selectedSubject]) {
                          setScreen('subtopics');
                        } 
                        else {
                          setScreen('home');
                        }
                      }}
                      className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Topics
                    </button>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isThisCorrect = index === currentQuestion.correct;
                const isSelected = selectedAnswer === index;
                
                let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                
                if (isAnswerSubmitted) {
                  if (isThisCorrect) {
                    buttonClass = 'bg-green-500 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-500 text-white';
                  } else {
                    buttonClass = 'bg-gray-100 text-gray-400';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-blue-600 text-white shadow-lg scale-105';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    onKeyPress={(e) => e.key === 'Enter' && selectAnswer(index)}
                    disabled={isAnswerSubmitted || isPaused}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Answer ${String.fromCharCode(65 + index)}: ${option}`}
                    tabIndex={0}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonClass} ${isAnswerSubmitted || isPaused ? 'cursor-default' : ''}`}
                  >
                    <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && !isCorrect && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-800 font-semibold mb-2">Incorrect Answer</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Correct answer: </span>
                  {currentQuestion.options[currentQuestion.correct]}
                </p>
              </div>
            )}

            {isAnswerSubmitted && isCorrect && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Correct!
                </p>
              </div>
            )}

            {/* Study Mode: Show Previous and Back to Topics buttons */}
            {studyMode && (
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                      setSelectedAnswer(null);
                      setIsAnswerSubmitted(false);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                  className={`py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${
                    currentQuestionIndex > 0
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={() => {
                    setTestStarted(false);
                    setIsPaused(false);
                    
                    // Navigate back to appropriate screen
                    if (selectedSubtopic && parentSubject) {
                      setSelectedSubject(parentSubject);
                      setScreen('subtopics');
                    } 
                    else if (subjectsWithSubtopics[selectedSubject]) {
                      setScreen('subtopics');
                    } 
                    else {
                      setScreen('home');
                    }
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Topics
                </button>
              </div>
            )}

            {/* Normal Submit/Next button (Test Mode and Study Mode after answer submitted) */}
            <button
              onClick={isAnswerSubmitted ? nextQuestion : submitAnswer}
              disabled={selectedAnswer === null || isPaused}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer !== null && !isPaused
                  ? isAnswerSubmitted 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnswerSubmitted 
                ? (currentQuestionIndex === selectedQuestions.length - 1 ? 'Finish Test' : 'Next Question')
                : 'Submit Answer'
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review Screen
  if (screen === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Answer Review</h2>
              <button 
                onClick={() => setScreen('results')}
                className="text-blue-600 hover:text-blue-700"
                aria-label="Back to results"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {reviewAnswers.map((review, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border-2 ${
                    review.isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1">
                      Question {index + 1}: {review.question.question}
                    </h3>
                    {review.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    {review.question.options.map((option, optIndex) => {
                      const isCorrect = optIndex === review.correctAnswer;
                      const wasSelected = optIndex === review.selectedAnswer;
                      
                      return (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg ${
                            isCorrect
                              ? 'bg-green-100 border-2 border-green-300'
                              : wasSelected && !isCorrect
                              ? 'bg-red-100 border-2 border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{option}</span>
                            {isCorrect && <span className="ml-auto text-green-600 font-semibold">✓ Correct</span>}
                            {wasSelected && !isCorrect && <span className="ml-auto text-red-600 font-semibold">Your answer</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen('results')}
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const lastResult = testHistory[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="text-center mb-6">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {lastResult.studyMode ? 'Study Session Complete!' : 'Test Complete!'}
              </h2>
              <p className="text-gray-600">{lastResult.subject}</p>
              {lastResult.subtopic && <p className="text-sm text-gray-500">{lastResult.subtopic}</p>}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {lastResult.score}%
                </div>
                <p className="text-gray-600">Your Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{lastResult.correct}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{lastResult.total - lastResult.correct}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
              </div>

              {!lastResult.studyMode && (
                <div className="mt-4 text-center text-gray-600">
                  <Clock className="w-5 h-5 inline mr-2" />
                  Time: {formatTime(lastResult.timeTaken)}
                </div>
              )}
            </div>

            {/* Google Ad - Results Screen */}
            <GoogleAd slot="5701429538019796" format="rectangle" className="my-6" />

            <div className="space-y-3">
              {reviewAnswers.length > 0 && (
                <button
                  onClick={() => setScreen('review')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Review Answers
                </button>
              )}
              <button
                onClick={() => startTest(selectedSubject, selectedSubtopic, true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Retake Test (Same Questions)
              </button>
              <button
                onClick={() => startTest(selectedSubject, selectedSubtopic, false)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Next Test (New Questions)
              </button>
              {selectedSubtopic && (
                <button
                  onClick={() => setScreen('subtopics')}
                  className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Back to Topics
                </button>
              )}
              <button
                onClick={() => setScreen('home')}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Progress Screen
  if (screen === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Progress Analytics</h2>
              <button onClick={() => setScreen('home')} className="text-blue-600" aria-label="Back to home">
                <Home className="w-6 h-6" />
              </button>
            </div>

            {detailedStats && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Overall Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{detailedStats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{detailedStats.totalTests}</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{detailedStats.bestScore}%</div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">{detailedStats.accuracy}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
                
                {detailedStats.trend !== 'stable' && (
                  <div className={`mt-4 p-3 rounded-xl flex items-center justify-center ${
                    detailedStats.trend === 'improving' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className={`w-5 h-5 mr-2 ${detailedStats.trend === 'declining' ? 'rotate-180' : ''}`} />
                    <span className="font-semibold">
                      Your scores are {detailedStats.trend}!
                    </span>
                  </div>
                )}
              </div>
            )}

            {Object.keys(subjectStats).length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No test data yet. Take a test to see your progress!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-450px)] overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-3">Subject Breakdown</h3>
                {Object.entries(subjectStats).map(([subject, stats]) => {
                  const avgScore = Math.round(stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length);
                  const accuracy = Math.round((stats.correct / stats.questions) * 100);
                  
                  return (
                    <div key={subject} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                      <h3 className="font-bold text-gray-800 mb-3">{subject}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average Score</span>
                        <span className="text-2xl font-bold text-blue-600">{avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                          style={{ width: `${avgScore}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-gray-600">Tests</div>
                          <div className="font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Questions</div>
                          <div className="font-bold text-gray-800">{stats.questions}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Accuracy</div>
                          <div className="font-bold text-gray-800">{accuracy}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // History Screen
  if (screen === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Test History</h2>
              <button onClick={() => setScreen('home')} className="text-blue-600" aria-label="Back to home">
                <Home className="w-6 h-6" />
              </button>
            </div>

            {testHistory.length > 0 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={exportResults}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
                <button
                  onClick={clearHistory}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Clear All
                </button>
              </div>
            )}

            {testHistory.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No test history yet. Start taking tests!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                {testHistory.map((test, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800">{test.subject}</h3>
                          {test.studyMode && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Study
                            </span>
                          )}
                        </div>
                        {test.subtopic && <p className="text-sm text-gray-600">{test.subtopic}</p>}
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                      <div className={`text-2xl font-bold ${test.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                        {test.score}%
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{test.correct}/{test.total} correct</span>
                      {!test.studyMode && <span>{formatTime(test.timeTaken)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
