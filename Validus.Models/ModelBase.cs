using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Validus.Core.Data.Interceptor.Interceptors;

namespace Validus.Models
{
    public class ModelBase : IAudit
    {
        [DisplayName("Created On")]
        public DateTime? CreatedOn { get; set; }

        [DisplayName("Modified On")]
        public DateTime? ModifiedOn { get; set; }

        [DisplayName("Created On"), StringLength(256)]
        public string CreatedBy { get; set; }

        [DisplayName("Modified On"), StringLength(256)]
        public string ModifiedBy { get; set; }
    }
}