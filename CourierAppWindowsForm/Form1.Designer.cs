namespace CourierAppClient
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button1 = new Button();
            listBox1 = new ListBox();
            button2 = new Button();
            tabControl1 = new TabControl();
            tabPage1 = new TabPage();
            comboBoxCouriers = new ComboBox();
            comboBoxStatus = new ComboBox();
            label3 = new Label();
            button3 = new Button();
            listBox3 = new ListBox();
            label2 = new Label();
            label1 = new Label();
            listBox2 = new ListBox();
            tabPage2 = new TabPage();
            label6 = new Label();
            label5 = new Label();
            label4 = new Label();
            listBox6 = new ListBox();
            button6 = new Button();
            listBox5 = new ListBox();
            button5 = new Button();
            listBox4 = new ListBox();
            button4 = new Button();
            tabControl1.SuspendLayout();
            tabPage1.SuspendLayout();
            tabPage2.SuspendLayout();
            SuspendLayout();
            // 
            // button1
            // 
            button1.BackColor = Color.PaleTurquoise;
            button1.Location = new Point(114, 537);
            button1.Name = "button1";
            button1.Size = new Size(123, 43);
            button1.TabIndex = 0;
            button1.Text = "Show packages";
            button1.UseVisualStyleBackColor = false;
            button1.Click += button1_Click;
            // 
            // listBox1
            // 
            listBox1.BackColor = Color.FromArgb(192, 192, 255);
            listBox1.FormattingEnabled = true;
            listBox1.Location = new Point(37, 81);
            listBox1.Name = "listBox1";
            listBox1.Size = new Size(301, 424);
            listBox1.TabIndex = 1;
            // 
            // button2
            // 
            button2.BackColor = Color.PaleTurquoise;
            button2.Location = new Point(449, 537);
            button2.Name = "button2";
            button2.Size = new Size(133, 43);
            button2.TabIndex = 2;
            button2.Text = "Show by status";
            button2.UseVisualStyleBackColor = false;
            button2.Click += button2_Click;
            // 
            // tabControl1
            // 
            tabControl1.Controls.Add(tabPage1);
            tabControl1.Controls.Add(tabPage2);
            tabControl1.Location = new Point(-3, -1);
            tabControl1.Name = "tabControl1";
            tabControl1.SelectedIndex = 0;
            tabControl1.Size = new Size(1028, 646);
            tabControl1.TabIndex = 4;
            // 
            // tabPage1
            // 
            tabPage1.BackColor = Color.Aquamarine;
            tabPage1.Controls.Add(comboBoxCouriers);
            tabPage1.Controls.Add(comboBoxStatus);
            tabPage1.Controls.Add(label3);
            tabPage1.Controls.Add(button3);
            tabPage1.Controls.Add(listBox3);
            tabPage1.Controls.Add(label2);
            tabPage1.Controls.Add(label1);
            tabPage1.Controls.Add(listBox1);
            tabPage1.Controls.Add(button2);
            tabPage1.Controls.Add(listBox2);
            tabPage1.Controls.Add(button1);
            tabPage1.Location = new Point(4, 29);
            tabPage1.Name = "tabPage1";
            tabPage1.Padding = new Padding(3);
            tabPage1.Size = new Size(1020, 613);
            tabPage1.TabIndex = 0;
            tabPage1.Text = "Packages";
            // 
            // comboBoxCouriers
            // 
            comboBoxCouriers.BackColor = SystemColors.InactiveCaption;
            comboBoxCouriers.FormattingEnabled = true;
            comboBoxCouriers.Location = new Point(735, 454);
            comboBoxCouriers.Name = "comboBoxCouriers";
            comboBoxCouriers.Size = new Size(211, 28);
            comboBoxCouriers.TabIndex = 10;
            // 
            // comboBoxStatus
            // 
            comboBoxStatus.BackColor = SystemColors.InactiveCaption;
            comboBoxStatus.FormattingEnabled = true;
            comboBoxStatus.Location = new Point(417, 454);
            comboBoxStatus.Name = "comboBoxStatus";
            comboBoxStatus.Size = new Size(211, 28);
            comboBoxStatus.TabIndex = 9;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(709, 31);
            label3.Name = "label3";
            label3.Size = new Size(258, 20);
            label3.TabIndex = 8;
            label3.Text = "Here you can view packages by status";
            // 
            // button3
            // 
            button3.BackColor = Color.PaleTurquoise;
            button3.Location = new Point(778, 537);
            button3.Name = "button3";
            button3.Size = new Size(125, 43);
            button3.TabIndex = 7;
            button3.Text = "Show by courier";
            button3.UseVisualStyleBackColor = false;
            button3.Click += button3_Click;
            // 
            // listBox3
            // 
            listBox3.BackColor = Color.FromArgb(192, 192, 255);
            listBox3.FormattingEnabled = true;
            listBox3.Location = new Point(709, 81);
            listBox3.Name = "listBox3";
            listBox3.Size = new Size(258, 344);
            listBox3.TabIndex = 6;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(396, 31);
            label2.Name = "label2";
            label2.Size = new Size(258, 20);
            label2.TabIndex = 5;
            label2.Text = "Here you can view packages by status";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(75, 31);
            label1.Name = "label1";
            label1.Size = new Size(220, 20);
            label1.TabIndex = 4;
            label1.Text = "Here you can view all packages ";
            // 
            // listBox2
            // 
            listBox2.BackColor = Color.FromArgb(192, 192, 255);
            listBox2.FormattingEnabled = true;
            listBox2.Location = new Point(394, 81);
            listBox2.Name = "listBox2";
            listBox2.Size = new Size(260, 344);
            listBox2.TabIndex = 3;
            // 
            // tabPage2
            // 
            tabPage2.BackColor = Color.PaleGreen;
            tabPage2.Controls.Add(label6);
            tabPage2.Controls.Add(label5);
            tabPage2.Controls.Add(label4);
            tabPage2.Controls.Add(listBox6);
            tabPage2.Controls.Add(button6);
            tabPage2.Controls.Add(listBox5);
            tabPage2.Controls.Add(button5);
            tabPage2.Controls.Add(listBox4);
            tabPage2.Controls.Add(button4);
            tabPage2.Location = new Point(4, 29);
            tabPage2.Name = "tabPage2";
            tabPage2.Padding = new Padding(3);
            tabPage2.Size = new Size(1020, 613);
            tabPage2.TabIndex = 1;
            tabPage2.Text = "Couriers";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(726, 85);
            label6.Name = "label6";
            label6.Size = new Size(135, 20);
            label6.TabIndex = 8;
            label6.Text = "List of free couriers";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(417, 85);
            label5.Name = "label5";
            label5.Size = new Size(139, 20);
            label5.TabIndex = 7;
            label5.Text = "List of busy couriers";
            label5.TextAlign = ContentAlignment.TopCenter;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(127, 85);
            label4.Name = "label4";
            label4.Size = new Size(125, 20);
            label4.TabIndex = 6;
            label4.Text = "List of all couriers";
            // 
            // listBox6
            // 
            listBox6.BackColor = Color.FromArgb(255, 255, 192);
            listBox6.FormattingEnabled = true;
            listBox6.Location = new Point(689, 131);
            listBox6.Name = "listBox6";
            listBox6.Size = new Size(225, 324);
            listBox6.TabIndex = 5;
            // 
            // button6
            // 
            button6.BackColor = Color.FromArgb(255, 192, 128);
            button6.Location = new Point(726, 520);
            button6.Name = "button6";
            button6.Size = new Size(151, 29);
            button6.TabIndex = 4;
            button6.Text = "Show free couriers";
            button6.UseVisualStyleBackColor = false;
            button6.Click += button6_Click;
            // 
            // listBox5
            // 
            listBox5.BackColor = Color.FromArgb(255, 255, 192);
            listBox5.FormattingEnabled = true;
            listBox5.Location = new Point(379, 131);
            listBox5.Name = "listBox5";
            listBox5.Size = new Size(225, 324);
            listBox5.TabIndex = 3;
            // 
            // button5
            // 
            button5.BackColor = Color.FromArgb(255, 192, 128);
            button5.Location = new Point(127, 520);
            button5.Name = "button5";
            button5.Size = new Size(111, 29);
            button5.TabIndex = 2;
            button5.Text = "Show couriers";
            button5.UseVisualStyleBackColor = false;
            button5.Click += button5_Click;
            // 
            // listBox4
            // 
            listBox4.BackColor = Color.FromArgb(255, 255, 192);
            listBox4.FormattingEnabled = true;
            listBox4.Location = new Point(78, 131);
            listBox4.Name = "listBox4";
            listBox4.Size = new Size(225, 324);
            listBox4.TabIndex = 1;
            // 
            // button4
            // 
            button4.BackColor = Color.FromArgb(255, 192, 128);
            button4.Location = new Point(417, 520);
            button4.Name = "button4";
            button4.Size = new Size(151, 29);
            button4.TabIndex = 0;
            button4.Text = "Show busy couriers";
            button4.UseVisualStyleBackColor = false;
            button4.Click += button4_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.GradientActiveCaption;
            ClientSize = new Size(1021, 653);
            Controls.Add(tabControl1);
            Name = "Form1";
            Text = "Form1";
            tabControl1.ResumeLayout(false);
            tabPage1.ResumeLayout(false);
            tabPage1.PerformLayout();
            tabPage2.ResumeLayout(false);
            tabPage2.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private Button button1;
        private ListBox listBox1;
        private Button button2;
        private TabControl tabControl1;
        private TabPage tabPage1;
        private TabPage tabPage2;
        private ListBox listBox3;
        private Label label2;
        private Label label1;
        private Label label3;
        private Button button3;
        private ListBox listBox2;
        private ListBox listBox4;
        private Button button4;
        private ComboBox comboBoxCouriers;
        private ComboBox comboBoxStatus;
        private ListBox listBox5;
        private Button button5;
        private ListBox listBox6;
        private Button button6;
        private Label label6;
        private Label label5;
        private Label label4;
    }
}
