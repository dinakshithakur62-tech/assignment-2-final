'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Check, Save } from 'lucide-react';
import { setCookie } from '@/lib/cookies';

export const dynamic = 'force-dynamic';

interface Tab {
  id: string;
  header: string;
  content: string;
}

export default function TabsPage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', header: 'Tab 1', content: '<p>Content for tab 1</p>' },
    { id: '2', header: 'Tab 2', content: '<p>Content for tab 2</p>' },
  ]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCookie('lastVisitedPage', '/tabs');

    // ✅ Load saved tabs from localStorage
    const savedTabs = localStorage.getItem('tabsData');
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
    }
  }, []);

  const addTab = () => {
    const newId = (Math.max(...tabs.map(t => parseInt(t.id))) + 1).toString();
    setTabs([...tabs, { id: newId, header: `Tab ${newId}`, content: '<p>New content</p>' }]);
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter(tab => tab.id !== id));
    }
  };

  const updateTabHeader = (id: string, header: string) => {
    setTabs(tabs.map(tab => tab.id === id ? { ...tab, header } : tab));
  };

  const updateTabContent = (id: string, content: string) => {
    setTabs(tabs.map(tab => tab.id === id ? { ...tab, content } : tab));
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Tabs</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .tabs-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .tab-headers {
      display: flex;
      background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
      padding: 0;
      margin: 0;
    }
    .tab-header {
      flex: 1;
      padding: 15px 20px;
      border: none;
      background: transparent;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      border-right: 1px solid rgba(255,255,255,0.2);
    }
    .tab-header:last-child {
      border-right: none;
    }
    .tab-header:hover {
      background: rgba(255,255,255,0.1);
    }
    .tab-header.active {
      background: white;
      color: #4facfe;
    }
    .tab-content {
      display: none;
      padding: 30px;
      animation: fadeIn 0.3s ease;
    }
    .tab-content.active {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="tabs-container">
    <div class="tab-headers">
${tabs.map((tab, index) => `      <button class="tab-header${index === 0 ? ' active' : ''}" onclick="openTab(event, 'tab${tab.id}')">${tab.header}</button>`).join('\n')}
    </div>
${tabs.map((tab, index) => `    <div id="tab${tab.id}" class="tab-content${index === 0 ? ' active' : ''}">
      ${tab.content}
    </div>`).join('\n')}
  </div>
  <script>
    function openTab(evt, tabId) {
      var i, tabcontent, tabheaders;
      tabcontent = document.getElementsByClassName("tab-content");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
      }
      tabheaders = document.getElementsByClassName("tab-header");
      for (i = 0; i < tabheaders.length; i++) {
        tabheaders[i].className = tabheaders[i].className.replace(" active", "");
      }
      document.getElementById(tabId).className += " active";
      evt.currentTarget.className += " active";
    }
  </script>
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const saveToDatabase = async () => {
    try {
      localStorage.setItem('tabsData', JSON.stringify(tabs));

      const response = await fetch('/api/outputs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outputType: 'tabs',
          htmlContent: generateHTML(),
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

    const deployToCloud = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_HTML_UPLOAD_ENDPOINT!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: `tabs-${Date.now()}.html`,
            htmlContent: generateHTML()
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          alert('✅ Deployed to Cloud! URL:\n' + data.url);
          window.open(data.url, '_blank');
        } else {
          alert('❌ Deploy failed: ' + (data.error || JSON.stringify(data)));
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert('Error deploying: ' + err.message);
        } else {
          alert('Error deploying: ' + String(err));
        }
      }
    };



  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Dynamic Tabs Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Configure Tabs
            </h2>
            <button
              onClick={addTab}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              aria-label="Add new tab"
            >
              <Plus size={18} />
              Add Tab
            </button>
          </div>

          <div className="space-y-4">
            {tabs.map((tab) => (
              <div key={tab.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={tab.header}
                    onChange={(e) => updateTabHeader(tab.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Tab header"
                    aria-label={`Header for tab ${tab.id}`}
                  />
                  <button
                    onClick={() => removeTab(tab.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    disabled={tabs.length === 1}
                    aria-label={`Remove tab ${tab.id}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <textarea
                  value={tab.content}
                  onChange={(e) => updateTabContent(tab.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
                  rows={4}
                  placeholder="Tab content (HTML)"
                  aria-label={`Content for tab ${tab.id}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Generated HTML
            </h2>
            <div className="flex gap-2">
              <button
                onClick={saveToDatabase}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                aria-label="Save to database"
              >
                {saved ? <Check size={18} /> : <Save size={18} />}
                {saved ? 'Saved!' : 'Save'}
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                aria-label="Copy HTML to clipboard"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
               <button
                onClick={deployToCloud}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Deploy to Cloud
              </button>
            </div>
          </div>

          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 max-h-[600px] overflow-y-auto">
            <code>{generateHTML()}</code>
          </pre>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> This HTML is ready to use in MOODLE LMS or any browser.
              It uses inline CSS and JavaScript for standalone functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
