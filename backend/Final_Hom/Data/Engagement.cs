
using System;

namespace Final_Hom.Data
{
    public class Engagement
    {
        public int EngagementID { get; set; }
        public int EntertainerID { get; set; }
        public DateTime StartDate { get; set; }

        // Navigation Property (optional)
        public Entertainer? Entertainer { get; set; }
    }
}

