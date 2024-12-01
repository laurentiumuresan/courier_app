using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CourierAppClient
{
    internal class CourierService
    {

        static HttpClient client = new HttpClient();

        public void createConnection()
        {
            client.BaseAddress = new Uri("http://localhost:8081");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }

        public List<Courier> getCouriers()
        {
            List<Courier> couriers = null;
            HttpResponseMessage responseMessage = client.GetAsync("/couriers").Result;
            if (responseMessage.IsSuccessStatusCode)
            {
                string resultString = responseMessage.Content.ReadAsStringAsync().Result;
                Console.WriteLine("result: " + resultString);
                couriers = JsonSerializer.Deserialize<List<Courier>>(resultString);
            }
            return couriers;
        }
    }
}
