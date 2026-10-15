# Create top-level files
New-Item README.md -ItemType File
New-Item LICENSE -ItemType File
New-Item .gitignore -ItemType File
New-Item package.json -ItemType File
New-Item requirements.txt -ItemType File
New-Item docker-compose.yml -ItemType File
New-Item .env.example -ItemType File

# Docs
New-Item -Path docs -ItemType Directory
"architecture.md","user_journey.md","donor_pitch.md","payment_flow.md","gps_court_finder.md","api_reference.md" | ForEach-Object { New-Item "docs\$_" -ItemType File }

# Backend
New-Item -Path backend\src\routes -ItemType Directory
"auth.js","laws.js","documents.js","qna.js","payments.js","courts.js" | ForEach-Object { New-Item "backend\src\routes\$_" -ItemType File }

New-Item -Path backend\src\controllers -ItemType Directory
"authController.js","lawController.js","documentController.js","qnaController.js","paymentController.js","courtController.js" | ForEach-Object { New-Item "backend\src\controllers\$_" -ItemType File }

New-Item -Path backend\src\models -ItemType Directory
"User.js","Document.js","Case.js","Payment.js","Court.js" | ForEach-Object { New-Item "backend\src\models\$_" -ItemType File }

New-Item -Path backend\src\services -ItemType Directory
"mpesaService.js","translationService.js","notificationService.js","gpsService.js","courtFinderService.js","feeCalculatorService.js" | ForEach-Object { New-Item "backend\src\services\$_" -ItemType File }

New-Item -Path backend\src\utils -ItemType Directory
"logger.js","validator.js","costCalculator.js","languageDetector.js" | ForEach-Object { New-Item "backend\src\utils\$_" -ItemType File }

New-Item backend\src\app.js -ItemType File
New-Item -Path backend\tests\unit -ItemType Directory
New-Item -Path backend\tests\integration -ItemType Directory

# AI Services
New-Item -Path ai-services\reasoning -ItemType Directory
"main.py","nlp_pipeline.py","compliance.py","document_ai.py","requirements.txt" | ForEach-Object { New-Item "ai-services\reasoning\$_" -ItemType File }

New-Item -Path ai-services\voice -ItemType Directory
"speech_to_text.py","text_to_speech.py","requirements.txt" | ForEach-Object { New-Item "ai-services\voice\$_" -ItemType File }

New-Item -Path ai-services\security -ItemType Directory
"privacy_guard.py","encryption.py" | ForEach-Object { New-Item "ai-services\security\$_" -ItemType File }

New-Item -Path ai-services\tests\unit -ItemType Directory
New-Item -Path ai-services\tests\integration -ItemType Directory

# Frontend
New-Item -Path frontend\public\assets\icons -ItemType Directory
New-Item -Path frontend\public\assets\images -ItemType Directory
New-Item frontend\public\index.html -ItemType File

New-Item -Path frontend\src\components -ItemType Directory
"ChatBox.jsx","VoiceChat.jsx","PaymentPrompt.jsx","DocumentGenerator.jsx","RightsLibrary.jsx","CourtFinder.jsx","FeeBreakdown.jsx" | ForEach-Object { New-Item "frontend\src\components\$_" -ItemType File }

New-Item -Path frontend\src\pages -ItemType Directory
"Home.jsx","AskQuestion.jsx","GenerateDocument.jsx","KnowYourRights.jsx","Payment.jsx","CourtSelection.jsx" | ForEach-Object { New-Item "frontend\src\pages\$_" -ItemType File }

New-Item -Path frontend\src\styles -ItemType Directory
"main.css","responsive.css" | ForEach-Object { New-Item "frontend\src\styles\$_" -ItemType File }

New-Item -Path frontend\src\utils -ItemType Directory
New-Item frontend\src\utils\apiClient.js -ItemType File
New-Item frontend\src\App.jsx -ItemType File

New-Item -Path frontend\tests\unit -ItemType Directory
New-Item -Path frontend\tests\e2e -ItemType Directory

# Mobile
New-Item -Path mobile\screens -ItemType Directory
"HomeScreen.js","ChatScreen.js","PaymentScreen.js","DocumentScreen.js","CourtScreen.js","FeeScreen.js" | ForEach-Object { New-Item "mobile\screens\$_" -ItemType File }
New-Item mobile\App.js -ItemType File
New-Item -Path mobile\assets\icons -ItemType Directory
New-Item -Path mobile\assets\images -ItemType Directory

# Data
"laws","templates","courts","fees" | ForEach-Object { New-Item "data\$_" -ItemType Directory }

# Scripts
"deploy.sh","seedData.js","backup.sh" | ForEach-Object { New-Item "scripts\$_" -ItemType File }

# Metrics
New-Item metrics\dashboard.js -ItemType File
New-Item metrics\analytics.json -ItemType File
New-Item -Path metrics\reports -ItemType Directory
"monthly_report.md","yearly_report.md" | ForEach-Object { New-Item "metrics\reports\$_" -ItemType File }
