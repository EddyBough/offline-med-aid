# Dépendances
install:
	pnpm install

# Lancer l'app
start:
	pnpm start

# Lancer sur Android (via Expo Go)
android:
	pnpm run android

#  Nettoyer
clean:
	rm -rf .expo .expo-shared node_modules

# Build APK 
build:
	eas build -p android --profile preview

# 🐙 Git : commit et push
push:
	git add .
	git commit -m "$$m"
	git push

# 🐙 Git : commit uniquement
commit:
	git add .
	git commit -m "$$m"

# ✍️ Usage : make g "mon message de commit"
g:
	make push m="$(m)"

# 🧼 Réinstall propre
reinstall:
	rm -rf node_modules && pnpm install
