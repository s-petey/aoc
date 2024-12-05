#!/bin/bash

# Prompt for day number and directory
read -p "Enter the day number: " day
read -p "Enter the folder name: " directory

# Check if directory exists and create it if not
if [ ! -d "$directory" ]; then
  mkdir "$directory"
fi

# Read template file contents
day_template=$(cat ./src/day.ts)
day_test_template=$(cat ./src/day.test.ts)

# Echo template content into the new file
echo "$day_template" > "src/$directory/day$day.ts"
echo "$day_test_template" > "src/$directory/day$day.test.ts"

# Within the day.ts file, replace the placeholder with the day number
sed -i '' "s/dayNUM/day$day/g" "src/$directory/day$day.ts"
sed -i '' "s/#/$day/g" "src/$directory/day$day.test.ts"

# Make directory if it doesn't exist
if [ ! -d "src/$directory" ]; then
  mkdir "src/$directory"
fi
touch "src/$directory/day$day.example.data.txt"
touch "src/$directory/day$day.data.txt"

echo "✅ -- File $directory/day$day(.ts,.test.ts,example.data.txt,data.txt) created successfully"