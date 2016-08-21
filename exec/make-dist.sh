rm -rf ./dist/* 
cp -rf ./_sass/lib/* ./dist/ 
sed -i '' 's/\/lib//' ./dist/margo.scss
scss --sourcemap=none ./dist/margo.scss ./dist/margo.css