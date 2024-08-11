# Menggunakan image resmi Node.js sebagai base image
FROM node:18

# Install dependensi yang dibutuhkan untuk React Native
RUN apt-get update && apt-get install -y \
  git \
  openjdk-11-jdk \
  curl \
  build-essential \
  && apt-get clean

# Install Android SDK
ENV ANDROID_SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip"
RUN mkdir -p /usr/local/android-sdk && \
    curl -o android-sdk.zip $ANDROID_SDK_URL && \
    unzip android-sdk.zip -d /usr/local/android-sdk && \
    rm android-sdk.zip

# Mengatur environment variables untuk Android SDK
ENV ANDROID_HOME=/usr/local/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/tools/bin:$ANDROID_HOME/platform-tools

# Install SDK tools yang dibutuhkan untuk pengembangan Android
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.2"

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json untuk menginstall dependensi
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Copy seluruh kode aplikasi ke dalam container
COPY . .

# Expose port untuk Metro Bundler
EXPOSE 8081

# Install react-native-cli secara global menggunakan Yarn
RUN yarn global add react-native-cli

# Jalankan perintah default untuk memulai aplikasi
CMD ["yarn", "start"]