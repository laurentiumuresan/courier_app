using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourierAppClient
{
    internal class Courier
    {
       public string name { get; set; } 

       public int id { get; set; }

       public string email { get; set; }

        public int managerId = 0;

       public bool isManager { get; set; }

       public List<Courier> subordinates { get; set; }
    }
}
 