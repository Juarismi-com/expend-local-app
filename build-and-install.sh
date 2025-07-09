#!/bin/bash

# Abortar si ocurre un error
set -e

echo "📦 1. Construyendo frontend Ionic..."
ionic build

echo "🔄 2. Copiando archivos al proyecto Android (Capacitor)..."
npx cap copy android

echo "📂 3. Entrando al proyecto Android..."
cd android

echo "🧹 4. Limpiando build anterior..."
./gradlew clean

echo "⚙️ 5. Compilando APK debug..."
./gradlew assembleDebug

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"

if [ -f "$APK_PATH" ]; then
  echo "📲 6. Instalando APK en el dispositivo (usando adb)..."
  adb install -r "$APK_PATH"
  echo "✅ Instalación completada: $APK_PATH"
else
  echo "❌ No se encontró la APK: $APK_PATH"
  exit 1
fi

