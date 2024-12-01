using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CourierAppClient
{
    internal class Package
    {
        public int id { get; set; }
        public string deliveryAddress { get; set; }
        public DateTime createdOn { get; set; }
        public Courier courier { get; set; }
        public PackageStatus status { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        internal enum PackageStatus
        {
            NEW,
            PENDING,
            SHIPPED,
            DELIVERED,
            CANCELLED,
        }
    }
}
