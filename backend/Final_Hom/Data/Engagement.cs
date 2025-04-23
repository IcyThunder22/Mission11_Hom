using System;
using System.ComponentModel.DataAnnotations;

namespace Final_Hom.Data
{
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public int ContractPrice { get; set; }
        public int CustomerID { get; set; }
        public int AgentID { get; set; }
        public int EntertainerID { get; set; }

        // Navigation Property (optional)
        public Entertainer? Entertainer { get; set; }
    }
}
