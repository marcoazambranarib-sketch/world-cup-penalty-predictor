from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import joblib

app = Flask(__name__)
CORS(app) # Allows the React dashboard to talk to this Python server

print("Loading encoders and model...")

# 1. Load the Encoders (translates player names to math)
try:
    encoders = joblib.load('label_encoders.pkl')
except Exception as e:
    print(f"Error loading encoders: {e}")

# 2. Rebuild the Model Architecture (must match your training script)
class PenaltyPredictor(nn.Module):
    def __init__(self, input_dim):
        super(PenaltyPredictor, self).__init__()
        self.layer1 = nn.Linear(input_dim, 16)
        self.layer2 = nn.Linear(16, 8)
        self.output_layer = nn.Linear(8, 1)
        self.relu = nn.ReLU()
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.sigmoid(self.output_layer(x))
        return x

# 3. Load the Trained AI Weights
input_dim = 4 # Shooter_Name, Team, Shooter_Foot, Keeper_Dive
model = PenaltyPredictor(input_dim)
model.load_state_dict(torch.load('penalty_model.pth', weights_only=True))
model.eval() 
print("API is ready to receive requests!")

def safe_transform(encoder_name, value):
    """Safely translates text to numbers. Defaults to 0 if player is unknown."""
    encoder = encoders[encoder_name]
    if value in encoder.classes_:
        return encoder.transform([value])[0]
    else:
        return 0

@app.route('/predict', methods=['POST'])
def predict():
    # Receive the scenario from the web dashboard
    data = request.json
    
    shooter = data.get('shooter', 'Unknown Shooter')
    team = data.get('team', 'Unknown')
    foot = data.get('foot', 'R')
    keeper_dive = data.get('keeper_dive', 'C')

    # Translate text to numbers
    encoded_shooter = safe_transform('Shooter_Name', shooter)
    encoded_team = safe_transform('Team', team)
    encoded_foot = safe_transform('Shooter_Foot', foot)
    encoded_dive = safe_transform('Keeper_Dive', keeper_dive)

    # Prepare for PyTorch
    input_features = [[encoded_shooter, encoded_team, encoded_foot, encoded_dive]]
    input_tensor = torch.FloatTensor(input_features)

    # Ask the AI for a prediction
    with torch.no_grad():
        probability = model(input_tensor).item()

    # Send the probability back to the dashboard
    return jsonify({
        'goal_probability': round(probability * 100, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)