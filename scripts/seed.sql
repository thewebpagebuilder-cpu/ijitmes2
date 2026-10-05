-- IJITMES seed data — idempotent
-- Published papers across four issues + one demo submission for the Track page.

INSERT INTO published_papers
  (published_id, title, authors, abstract, keywords, area, volume, issue, issue_period, pages, doi, citations, downloads, published_at)
VALUES
  -- ── Volume 2 · Issue 2 — February 2026 (current) ─────────────────────────
  ('IJITMES-2602-001',
   'Fault-Tolerant Control of Grid-Connected Photovoltaic Inverters Under Weak-Grid Conditions',
   'Rohan S. Kulkarni, Meera V. Joshi, Amit P. Deshpande',
   'Weak-grid integration of photovoltaic inverters introduces resonance and instability challenges during grid faults. This paper proposes a fault-tolerant control strategy combining virtual-impedance reshaping with an adaptive current limiter. Hardware-in-the-loop results demonstrate stable operation down to a short-circuit ratio of 1.2 with a 34% reduction in DC-link overvoltage.',
   'photovoltaic inverter, weak grid, fault-tolerant control, virtual impedance, low-voltage ride-through',
   'Electrical Engineering', 2, 2, 'February 2026', '01–09',
   '10.52494/ijitmes.2026.26020001', 4, 318, '2026-02-10T06:30:00Z'),

  ('IJITMES-2602-002',
   'Compressive Strength Prediction of Fly-Ash–Based Geopolymer Concrete Using Ensemble Learning',
   'Sneha R. Patil, Vikram T. More, Kunal D. Bhosale, Asha N. Ghorpade',
   'Accurate prediction of geopolymer concrete strength reduces the need for destructive testing. An ensemble of gradient-boosted trees is trained on 412 laboratory mixes spanning six fly-ash sources. The model achieves an R² of 0.97 on held-out data, and feature attribution reveals alkaline-liquid-to-binder ratio and curing temperature as dominant predictors.',
   'geopolymer concrete, fly ash, ensemble learning, compressive strength, gradient boosting',
   'Civil Engineering', 2, 2, 'February 2026', '10–17',
   '10.52494/ijitmes.2026.26020002', 6, 427, '2026-02-11T09:10:00Z'),

  ('IJITMES-2602-003',
   'Explainable Transformer Models for Early-Stage Diabetic Retinopathy Screening',
   'Ananya S. Iyer, Prakash R. Nair, Divya K. Menon',
   'Early detection of diabetic retinopathy prevents irreversible vision loss, yet deep models often lack clinical transparency. We present a compact vision transformer with integrated gradient-based saliency that highlights lesion regions consistent with ophthalmologist annotations. On a public fundus benchmark the model attains 94.8% accuracy while remaining deployable on modest clinical workstations.',
   'diabetic retinopathy, vision transformer, explainable AI, medical imaging, fundus screening',
   'Artificial Intelligence', 2, 2, 'February 2026', '18–26',
   '10.52494/ijitmes.2026.26020003', 9, 612, '2026-02-12T11:45:00Z'),

  ('IJITMES-2602-004',
   'Energy-Aware Task Offloading in 6G-Enabled Vehicular Edge Computing Networks',
   'Harish G. Verma, Tanvi M. Kulkarni, Nishant A. Rao',
   'Vehicular edge computing must balance latency against battery and network energy budgets. This work formulates task offloading as a constrained Markov decision process and solves it with a dueling-DQN architecture. Simulation over a realistic urban mobility trace shows a 22% energy saving and 31% latency reduction against greedy baselines.',
   'vehicular edge computing, 6G, task offloading, deep reinforcement learning, energy efficiency',
   'Information Technology', 2, 2, 'February 2026', '27–35',
   '10.52494/ijitmes.2026.26020004', 3, 289, '2026-02-13T07:25:00Z'),

  -- ── Volume 2 · Issue 1 — January 2026 ────────────────────────────────────
  ('IJITMES-2601-001',
   'A Lightweight Convolutional Neural Network for Real-Time Pothole Detection on Edge Devices',
   'Ishita P. Chavan, Sanket R. Mahajan, Gauri N. Wagh, Omkar S. Pawar',
   'Road-surface anomalies remain a leading cause of vehicle damage in developing regions. We introduce PotholeNet-Tiny, a 1.9-M-parameter CNN designed for deployment on in-vehicle edge hardware. On a newly curated 8,400-image Indian road dataset, the model reaches 92.3% F1 at 41 FPS on a Raspberry Pi 5.',
   'pothole detection, edge computing, lightweight CNN, road safety, embedded vision',
   'Computer Engineering', 2, 1, 'January 2026', '01–08',
   '10.52494/ijitmes.2026.26010001', 11, 764, '2026-01-08T06:00:00Z'),

  ('IJITMES-2601-002',
   'Adsorption Kinetics of Methylene Blue onto Activated Carbon Derived from Coconut Shell Waste',
   'Pooja D. Kale, Sunil M. Jadhav',
   'Agricultural-waste-derived activated carbon offers a low-cost route to dye removal from textile effluent. Coconut-shell carbon prepared at 700 °C exhibits a monolayer adsorption capacity of 142 mg/g for methylene blue. Kinetic modelling favours a pseudo-second-order mechanism, and the adsorbent retains 88% capacity after five regeneration cycles.',
   'activated carbon, methylene blue, adsorption kinetics, water treatment, coconut shell',
   'Science & Applied Sciences', 2, 1, 'January 2026', '09–15',
   NULL, 5, 203, '2026-01-09T08:30:00Z'),

  ('IJITMES-2601-003',
   'Spectrum Sensing in Cognitive Radio Using Hybrid Deep Learning Architectures',
   'Farhan A. Shaikh, Rupali B. Deshmukh, Kaveri S. Sonawane',
   'Reliable spectrum sensing is central to cognitive radio. A hybrid CNN-LSTM network is proposed that jointly learns spectral and temporal occupancy patterns from raw I/Q samples. At -12 dB SNR the architecture improves detection probability by 17 percentage points over conventional energy detection, with inference latency suitable for real-time deployment.',
   'cognitive radio, spectrum sensing, CNN-LSTM, deep learning, signal detection',
   'Electronics & Telecommunication', 2, 1, 'January 2026', '16–23',
   '10.52494/ijitmes.2026.26010003', 7, 441, '2026-01-10T10:15:00Z'),

  -- ── Volume 1 · Issue 12 — December 2025 ──────────────────────────────────
  ('IJITMES-2512-001',
   'Design and Fabrication of a Solar-Powered Multi-Effect Water Distillation Unit',
   'Nikhil R. Pawar, Akshay S. Gaikwad, Sagar B. Chaudhari, Pravin H. Nikam',
   'Addressing potable-water scarcity in arid regions, a three-effect solar distillation unit was designed, fabricated and tested. Coupling a flat-plate collector with stacked evaporation trays improved daily yield to 4.6 L/m² — a 58% gain over a single-basin still — at a production cost below 0.8 INR per litre.',
   'solar distillation, multi-effect, desalination, thermal design, clean water',
   'Mechanical Engineering', 1, 12, 'December 2025', '01–07',
   '10.52494/ijitmes.2025.25120001', 14, 980, '2025-12-06T05:45:00Z'),

  ('IJITMES-2512-002',
   'An Ensemble-Based Network Intrusion Detection System for IoT-Enabled Smart Campuses',
   'Shruti V. Bhagwat, Mandar K. Joshi, Alisha F. Syed',
   'Resource-constrained IoT nodes demand lightweight yet accurate intrusion detection. We evaluate a stacking ensemble combining random forests and a distilled neural network trained on flow-level features. The detector achieves 98.1% accuracy on a campus testbed trace while fitting within a 256 KB memory footprint.',
   'intrusion detection, IoT security, ensemble learning, smart campus, network flows',
   'Computer Engineering', 1, 12, 'December 2025', '08–15',
   '10.52494/ijitmes.2025.25120002', 18, 1203, '2025-12-07T07:30:00Z'),

  ('IJITMES-2512-003',
   'Seismic Retrofitting of RC Frame Buildings Using Buckling-Restrained Braces: A Parametric Study',
   'Varsha M. Shinde, Rahul D. Kadam',
   'Buckling-restrained braces (BRBs) are a proven retrofit for soft-storey reinforced-concrete frames. Nonlinear time-history analyses on 6- and 9-storey frames under seven spectrum-compatible ground motions quantify brace-layout sensitivity. Chevron-configured BRBs reduced peak inter-storey drift by 47% and residual drift by 39% on average.',
   'seismic retrofit, buckling-restrained brace, RC frame, nonlinear analysis, inter-storey drift',
   'Civil Engineering', 1, 12, 'December 2025', '16–24',
   '10.52494/ijitmes.2025.25120003', 9, 655, '2025-12-08T09:00:00Z'),

  -- ── Volume 1 · Issue 11 — November 2025 ──────────────────────────────────
  ('IJITMES-2511-001',
   'Enhanced MPPT Control for Partially Shaded PV Arrays Using a Modified Grey Wolf Optimizer',
   'Tejaswini H. Pawar, Sandeep L. More, Vaibhav K. Shirsath',
   'Partial shading introduces multiple local maxima that defeat conventional MPPT algorithms. A modified grey wolf optimizer with adaptive exploration weights is proposed, tracking the global peak within 0.9 s under rapid irradiance transitions. Experimental validation on a 1.2 kW array shows 99.1% tracking efficiency, outperforming P&O and PSO methods.',
   'MPPT, photovoltaic array, partial shading, grey wolf optimizer, power electronics',
   'Electrical Engineering', 1, 11, 'November 2025', '01–08',
   '10.52494/ijitmes.2025.25110001', 21, 1542, '2025-11-05T06:15:00Z'),

  ('IJITMES-2511-002',
   'Vibration Analysis of Functionally Graded Beams Using a Refined Shear Deformation Theory',
   'Ganesh P. Bhosale, Lata S. Kulkarni, Mahesh R. Shinde',
   'A refined shear deformation theory with only four unknowns is developed for free-vibration analysis of functionally graded beams. Closed-form and finite-element solutions agree within 0.6%, and parametric studies quantify the influence of the power-law index and slenderness ratio on natural frequencies across classical boundary conditions.',
   'functionally graded beam, shear deformation theory, free vibration, finite element, power-law index',
   'Mechanical Engineering', 1, 11, 'November 2025', '09–16',
   NULL, 12, 731, '2025-11-06T08:00:00Z')
ON CONFLICT (published_id) DO NOTHING;

-- ── Demo submission for the Track page ──────────────────────────────────────
INSERT INTO submissions
  (paper_id, title, abstract, keywords, subject_area, doi_requested, hard_copy_requested,
   author_name, author_email, author_phone, author_affiliation, co_authors,
   address, city, state, country, postal_code,
   file_name, file_size, status, status_note, created_at, updated_at)
VALUES
  ('IJITMES-2026-0901',
   'Smart Energy Metering and Load Forecasting for Rural Microgrids Using Edge Analytics',
   'Rural microgrids require accurate, low-cost load visibility to balance intermittent renewable generation. This paper presents a smart metering architecture in which edge nodes perform on-device feature extraction and transmit compact telemetry to a microgrid controller. A seasonal load-forecasting model trained on two years of village-level consumption data achieves a mean absolute percentage error of 6.4%, enabling 19% diesel-generator runtime reduction during field trials.',
   'smart metering, rural microgrid, edge analytics, load forecasting, energy management',
   'Electrical Engineering', true, false,
   'Demo Author', 'demo@ijitmes.com', '+91 98220 00000', 'Department of Electrical Engineering, IJITMES Demo Institute, Nashik',
   '[{"name":"Priya N. Desai","affiliation":"IJITMES Demo Institute, Nashik"},{"name":"Arjun K. Patil","affiliation":"IJITMES Demo Institute, Nashik"}]'::jsonb,
   'Demo Institute Campus, Pimpalgoan Khamb', 'Nashik', 'Maharashtra', 'India', '422003',
   'IJITMES-2026-0901-manuscript.docx', 482133,
   'under_review',
   'Your manuscript has cleared plagiarism screening and is currently with subject reviewers. The acceptance decision will be emailed within the next few hours.',
   '2026-02-12T09:15:00Z', '2026-02-12T10:55:00Z')
ON CONFLICT (paper_id) DO NOTHING;
