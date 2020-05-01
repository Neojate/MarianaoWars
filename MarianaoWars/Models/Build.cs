using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Build
    {
        public int Id { get; set; }

        public int ComputerId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int BuildId { get; set; }

        public Build()
        {

        }

        public Build(int computerId, int milliToFinish, int buildId)
        {
            ComputerId = computerId;
            StartTime = DateTime.Now;
            EndTime = StartTime.AddMilliseconds(milliToFinish);
            BuildId = buildId;
        }
    }
}
