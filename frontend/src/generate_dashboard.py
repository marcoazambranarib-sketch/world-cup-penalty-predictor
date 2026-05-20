import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("Loading data for visualization...")
df = pd.read_csv('master_shootouts_merged.csv')

# Set the visual style for a professional, report-ready look
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('World Cup Penalty Shootouts: Descriptive Analysis (1982 - 2022)', fontsize=22, fontweight='bold')

# --- Panel 1: Overall Conversion Rate ---
sns.countplot(data=df, x='Is_Goal', palette='viridis', ax=axes[0, 0])
axes[0, 0].set_title('Overall Penalty Outcomes', fontsize=16, fontweight='bold')
axes[0, 0].set_xticklabels(['Miss / Save (0)', 'Goal (1)'])
axes[0, 0].set_ylabel('Number of Kicks', fontsize=12)
axes[0, 0].set_xlabel('')

# --- Panel 2: Conversion Rate by Foot ---
# Filtering out 'Unknown' to get a clean Left vs Right comparison
foot_df = df[df['Shooter_Foot'].isin(['R', 'L'])]
sns.barplot(data=foot_df, x='Shooter_Foot', y='Is_Goal', palette='muted', ax=axes[0, 1], errorbar=None)
axes[0, 1].set_title('Average Conversion by Dominant Foot', fontsize=16, fontweight='bold')
axes[0, 1].set_ylabel('Probability of Goal', fontsize=12)
axes[0, 1].set_xlabel('Shooter Foot', fontsize=12)
axes[0, 1].set_ylim(0, 1) # Set Y-axis from 0 to 100%

# --- Panel 3: Keeper Dive Tendencies ---
dive_df = df[df['Keeper_Dive'].isin(['L', 'C', 'R'])]
sns.countplot(data=dive_df, x='Keeper_Dive', order=['L', 'C', 'R'], palette='pastel', ax=axes[1, 0])
axes[1, 0].set_title('Goalkeeper Dive Direction Frequency', fontsize=16, fontweight='bold')
axes[1, 0].set_ylabel('Number of Dives', fontsize=12)
axes[1, 0].set_xlabel('Dive Direction (From Keeper Perspective)', fontsize=12)

# --- Panel 4: The Pressure Factor (Kick Number) ---
# Filtering to standard 1-10 kicks to avoid extreme sudden-death outliers skewing the graph
pressure_df = df[df['Kick_Number'] <= 10]
sns.lineplot(data=pressure_df, x='Kick_Number', y='Is_Goal', marker='o', color='crimson', linewidth=2.5, markersize=8, ax=axes[1, 1])
axes[1, 1].set_title('Shootout Pressure: Conversion by Kick Order', fontsize=16, fontweight='bold')
axes[1, 1].set_ylabel('Conversion Rate', fontsize=12)
axes[1, 1].set_xlabel('Kick Number in Shootout', fontsize=12)
axes[1, 1].set_xticks(range(1, 11))
axes[1, 1].set_ylim(0.4, 1.0) # Zoom in on the variance

# Adjust spacing so titles don't overlap
plt.tight_layout(rect=[0, 0.03, 1, 0.95])

# Save the dashboard as a high-res image
output_file = 'Data_Story_Dashboard.png'
plt.savefig(output_file, dpi=300)
print(f"Success! Dashboard exported as high-resolution image: {output_file}")