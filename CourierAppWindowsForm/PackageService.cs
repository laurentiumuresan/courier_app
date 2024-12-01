using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CourierAppClient
{
    internal class PackageService
    {
        static HttpClient client = new HttpClient();

        public void createConnection()
        {
            client.BaseAddress = new Uri("http://localhost:8081");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }
    
        public List<Package> getPackages()
        {
            List<Package> packages = null;
            HttpResponseMessage responseMessage = client.GetAsync("/package").Result;
            if (responseMessage.IsSuccessStatusCode)
            {
                string resultString = responseMessage.Content.ReadAsStringAsync().Result;
                Console.WriteLine("result: " + resultString);
                packages = JsonSerializer.Deserialize<List<Package>>(resultString);
            }
            return packages;
        }

        public List<Courier> getBusyCouriers()
        {
            List<Package> packages = this.getPackages();
            return packages.Select(p => p.courier).DistinctBy(c => c.name).ToList();
        }

        public List<Courier> getFreeCouriers(List<Courier> allCouriers)
        {
            List<Courier> busyCouriers = getBusyCouriers();
            return allCouriers.Where(c => !busyCouriers.Any(b => b.id == c.id)).ToList();
        }

        public List<Package> findPackagesByStatus(string status)
        {
            List<Package> packages = null;

            try
            {
                HttpResponseMessage responseMessage = client.GetAsync($"/package/status/{status}").Result;

                if (responseMessage.IsSuccessStatusCode)
                {
                    string resultString = responseMessage.Content.ReadAsStringAsync().Result;
                    Console.WriteLine("result: " + resultString);
                    packages = JsonSerializer.Deserialize<List<Package>>(resultString);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Eroare la obținerea pachetelor cu status {status}: {ex.Message}");
                throw;
            }

            return packages ?? new List<Package>();
        }

        public List<Package> findPackagesByCourier(int courierId)
        {
            List<Package> packages = null;

            try
            {
                HttpResponseMessage responseMessage = client.GetAsync($"/package/courier/{courierId}").Result;

                if (responseMessage.IsSuccessStatusCode)
                {
                    string resultString = responseMessage.Content.ReadAsStringAsync().Result;
                    Console.WriteLine("result: " + resultString);
                    packages = JsonSerializer.Deserialize<List<Package>>(resultString);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Eroare la obținerea pachetelor pentru curierul cu ID {courierId}: {ex.Message}");
                throw;
            }

            return packages ?? new List<Package>();
        }

    }
}
