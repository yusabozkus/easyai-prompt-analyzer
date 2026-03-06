<h1 align="center">EasyAI Prompt Analyzer 🧠💡</h1>

<p>Welcome to the <strong>EasyAI Prompt Analyzer</strong> repository! This project is designed to help users craft better, more effective prompts for Large Language Models (LLMs) while also raising awareness about the environmental and computational costs of AI generation.</p>

<hr>

<h2>1. How the Web App Works (The Simple Version)</h2>

<p>You can try the live version of the app here: <a href="https://easyai-prompt-analyzer.vercel.app/">EasyAI Prompt Analyzer</a></p>

<p>The web interface is designed to be incredibly simple and user-friendly:</p>
<ol>
    <li><strong>Input Your Prompt:</strong> You paste the prompt you intend to send to an AI (like ChatGPT, Claude, or Gemini) into the text box.</li>
    <li><strong>Instant Analysis:</strong> Once you hit submit, the app analyzes your text in milliseconds.</li>
    <li><strong>Get Your Score & Feedback:</strong> You receive a quality score (ranging from "Very Low" to "Excellent") along with actionable tips on how to improve it (e.g., "Add more context," "Specify formatting," or "Define a clear role").</li>
    <li><strong>See the Environmental Impact:</strong> The app also calculates the hidden costs of your prompt, showing you the estimated energy consumption (in Watt-hours), water usage (in Liters), and monetary cost to run that specific query.</li>
</ol>

<hr>

<h2>2. Under the Hood: How the Algorithms Work</h2>

<p>The backend relies on two main algorithms: a <strong>Prompt Quality Scorer</strong> and a <strong>Resource Estimator</strong>. Here is a breakdown of how they operate.</p>

<h3>A. The Prompt Quality Scorer (Machine Learning)</h3>
<p>This algorithm uses a custom-trained Machine Learning model (specifically, a Scikit-Learn regressor) that relies on <strong>Handcrafted Feature Extraction</strong>. Instead of throwing raw text at a massive neural network, we extract 27 specific "features" or characteristics from your prompt.</p>

<ul>
    <li><strong>Feature Extraction:</strong> When you submit a prompt, the algorithm dissects it using regular expressions (<code>re</code>) and basic math. It counts characters, words, and sentences to measure length and density.</li>
    <li><strong>Keyword Matching:</strong> It checks for specific structural elements that make a good prompt. Does it have an explicit task ("write", "analyze")? Does it include constraints ("must", "only")? Are there examples or formatting requirements (like asking for JSON or markdown)?</li>
    <li><strong>Scoring Logic:</strong> The pre-trained model (<code>prompt_quality_model.pkl</code>) takes these 27 features and predicts a raw score between 0.0 and 1.0.</li>
    <li><strong>Feedback Generation:</strong> Based on missing features (e.g., if the "has_examples" flag is 0), the script appends specific tips to help the user improve.</li>
</ul>

<h3>B. The Resource & Energy Estimator</h3>
<p>Generating AI responses requires server compute power, which consumes electricity and water (for server cooling). To estimate this, the algorithm follows a precise mathematical pipeline:</p>

<ol>
    <li><strong>Task Detection (<code>spaCy</code>):</strong> We use the <code>spaCy</code> NLP library to analyze the verbs and nouns in the prompt. By scoring the presence of certain words (e.g., "translate" vs. "code" vs. "summarize"), the algorithm categorizes the task.</li>
    <li><strong>Token Estimation (<code>tiktoken</code>):</strong> We count the exact number of input tokens. Based on the detected task, we apply a multiplier to estimate the number of output tokens.</li>
    <li><strong>The Mathematical Formulas:</strong></li>
</ol>

<p>Once we have the total tokens (Input + Estimated Output), we use the following formulas to calculate the environmental impact. Let <em>T<sub>total</sub></em> be the total number of tokens, <em>E<sub>token</sub></em> be the energy per token, and <em>C<sub>Q</sub></em> be the model's capacity constant.</p>


<hr>

<h2>3. Quickstart: Installation Guide</h2>

<p>Want to run this project on your local machine? Follow these simple steps to get the backend environment and the frontend interface ready in minutes.</p>

<p><strong>Prerequisites:</strong></p>
<ul>
    <li>Python 3.8+ installed on your system.</li>
    <li>Node.js and npm (Node Package Manager) installed.</li>
</ul>

<hr>

<h3>⚙️ Backend Setup (Python)</h3>

<p><strong>Step 1: Clone the repository</strong><br>
Download the code to your local machine using git.</p>
<pre><code class="language-bash">git clone https://github.com/yusabozkus/easyai-prompt-analyzer.git
cd easyai-prompt-analyzer</code></pre>

<p><strong>Step 2: Install dependencies</strong><br>
Install the required Python libraries (like <code>scikit-learn</code>, <code>spacy</code>, and <code>tiktoken</code>).</p>
<pre><code class="language-bash">pip install -r requirements.txt</code></pre>

<p><strong>Step 3: Download the language model</strong><br>
The resource estimator requires the English NLP model to detect task types properly.</p>
<pre><code class="language-bash">python -m spacy download en_core_web_sm</code></pre>
<p><em>That's it for the backend! Your Python environment is now fully equipped to run the scoring and resource estimation algorithms.</em></p>

<hr>

<h3>💻 Frontend Setup (Node.js)</h3>

<p>Now, let's get the user interface up and running.</p>

<p><strong>Step 1: Navigate to the frontend folder</strong><br>
<em>(Make sure you are in the correct directory where the <code>package.json</code> file is located)</em></p>
<pre><code class="language-bash">cd frontend # Change 'frontend' to your actual folder name if different</code></pre>

<p><strong>Step 2: Install dependencies</strong><br>
This will download all the necessary Node packages required for the web app.</p>
<pre><code class="language-bash">npm install</code></pre>

<p><strong>Step 3: Start the application</strong><br>
Launch the frontend locally to see it in your browser.</p>
<pre><code class="language-bash">npm run dev</code></pre>

<blockquote>
  <p><strong>Note:</strong> Open the local URL (usually <code>http://localhost:3000</code> or similar) provided in your terminal to see the app in action!</p>
</blockquote>
