using System.Diagnostics.Metrics;
using System.Windows.Forms.VisualStyles;

namespace CourierAppClient
{
    public partial class Form1 : Form
    {
        PackageService packageService;
        CourierService courierService;
        List<Package> packages;
        List<Courier> couriers;

        public Form1()
        {
            InitializeComponent();
            packageService = new PackageService();
            packageService.createConnection();

            courierService = new CourierService();
            courierService.createConnection();


            comboBoxStatus.Items.AddRange(new string[] { "NEW", "NEW", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED" });
            comboBoxStatus.SelectedIndex = 0;

            LoadCouriers();
        }
        private void LoadCouriers()
        {
            try
            {
                couriers = packageService.getBusyCouriers();
                comboBoxCouriers.Items.Clear();
                foreach (var courier in couriers)
                {
                    comboBoxCouriers.Items.Add(courier.name);
                }

                if (couriers.Count > 0)
                {
                    comboBoxCouriers.SelectedIndex = 0;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la încărcarea curierilor: {ex.Message}", "Eroare");
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            List<Package> packages = packageService.getPackages();
            listBox1.Items.Clear();
            foreach (Package package in packages)
            {
                listBox1.Items.Add($"ID: {package.id}, Courier: {package.courier.name}");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string selectedStatus = comboBoxStatus.SelectedItem.ToString();

            try
            {
                List<Package> filteredPackages = packageService.findPackagesByStatus(selectedStatus);
                listBox2.Items.Clear();

                foreach (var package in filteredPackages)
                {
                    listBox2.Items.Add($"ID: {package.id}, Address: {package.deliveryAddress}");
                }

                if (filteredPackages.Count == 0)
                {
                    MessageBox.Show("Nu există pachete cu acest status.", "Informație");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la afișarea pachetelor: {ex.Message}", "Eroare");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (comboBoxCouriers.SelectedItem == null)
            {
                MessageBox.Show("Selectați un curier din listă!", "Atenție");
                return;
            }

            string selectedCourierName = comboBoxCouriers.SelectedItem.ToString();
            Courier selectedCourier = couriers.FirstOrDefault(c => c.name == selectedCourierName);

            if (selectedCourier == null)
            {
                MessageBox.Show("Curierul selectat nu a fost găsit.", "Eroare");
                return;
            }

            try
            {
                List<Package> courierPackages = packageService.findPackagesByCourier(selectedCourier.id);
                listBox3.Items.Clear();

                foreach (var package in courierPackages)
                {
                    listBox3.Items.Add($"ID: {package.id}, Address: {package.deliveryAddress}");
                }

                if (courierPackages.Count == 0)
                {
                    MessageBox.Show("Nu există pachete asignate acestui curier.", "Informație");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la afișarea pachetelor pentru curier: {ex.Message}", "Eroare");
            }
        }


        private void button4_Click(object sender, EventArgs e)
        {
            List<Courier> busyCouriers = packageService.getBusyCouriers();
            listBox4.Items.Clear();
            foreach (Courier courier in busyCouriers)
            {
                listBox4.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            List<Courier> couriers = courierService.getCouriers();
            listBox5.Items.Clear();
            foreach (Courier courier in couriers)
            {
                listBox5.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            List<Courier> freeCouriers = packageService.getFreeCouriers(courierService.getCouriers());
            listBox6.Items.Clear();
            foreach (Courier courier in freeCouriers)
            {
                listBox6.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

    }
}

