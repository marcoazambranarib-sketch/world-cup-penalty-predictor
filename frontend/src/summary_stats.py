import pandas as pd

# Load the merged dataset
df = pd.read_csv('master_shootouts_merged.csv')

# Generate descriptive statistics for numerical columns (like Kick Number, Goal Probability if available)
print("--- Numerical Summary ---")
print(df.describe().round(2))

# Generate statistics for categorical columns (Shooter Foot, Keeper Dive, etc.)
print("\n--- Categorical Summary ---")
print(df.describe(include=['object', 'category']))

# Specific breakdown of the target variable (Conversion Rate)
print("\n--- Overall Conversion Rate ---")
print(df['Is_Goal'].value_counts(normalize=True).round(3) * 100)