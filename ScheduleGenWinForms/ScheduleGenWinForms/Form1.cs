using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace ScheduleGenWinForms
{
    public partial class Form1 : Form
    {

        
        public Form1()
        {
            InitializeComponent();
            InitWebview();
        }

        async void InitWebview()
        {
            await webView.EnsureCoreWebView2Async();
            webView.CoreWebView2.Navigate(Path.Combine("file:", Application.StartupPath, "webapi", "index.html"));
        }

    }
}
