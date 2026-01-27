using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RPSLS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RPSLS : ControllerBase
    {
        private readonly Services.RSPLSservice _rPSLSservice;
        public RPSLS(Services.RSPLSservice rPSLSservice)
        {
            _rPSLSservice = rPSLSservice;
        }
        [HttpGet]
        public ActionResult<string> GetCpuChoice()
        {
            return Ok(_rPSLSservice.GetCpuChoice());
        }
    }
}