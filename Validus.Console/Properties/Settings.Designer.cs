﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18444
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Validus.Console.Properties {
    
    
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Editors.SettingsDesigner.SettingsSingleFileGenerator", "11.0.0.0")]
    internal sealed partial class Settings : global::System.Configuration.ApplicationSettingsBase {
        
        private static Settings defaultInstance = ((Settings)(global::System.Configuration.ApplicationSettingsBase.Synchronized(new Settings())));
        
        public static Settings Default {
            get {
                return defaultInstance;
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("talbotdev")]
        public string DomainPrefix {
            get {
                return ((string)(this["DomainPrefix"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.SpecialSettingAttribute(global::System.Configuration.SpecialSetting.WebServiceUrl)]
        [global::System.Configuration.DefaultSettingValueAttribute("http://uksp10webdev01:6262/")]
        public string ServicesHostUrl {
            get {
                return ((string)(this["ServicesHostUrl"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("Integrated=True;IsPrimaryLogin=True;Authenticate=True;EncryptedPassword=False;Hos" +
            "t=UKWFK2DEV02;Port=5252")]
        public string WorkflowServerConnectionString {
            get {
                return ((string)(this["WorkflowServerConnectionString"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("Integrated=True;IsPrimaryLogin=True;Authenticate=True;EncryptedPassword=False;Hos" +
            "t=UKWFK2DEV02;Port=5555")]
        public string WorkflowServerManagementConnectionString {
            get {
                return ((string)(this["WorkflowServerManagementConnectionString"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("http://intranet.globaldev.local/sites/searchcenter/_api/search/query?querytext=\'{" +
            "0}\'&selectproperties=\'{1}\'")]
        public string SP2013RestUrl {
            get {
                return ((string)(this["SP2013RestUrl"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("0")]
        public int RenewalExclDeclar {
            get {
                return ((int)(this["RenewalExclDeclar"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("http://intranet.globaldev.local/sites/searchcenter/")]
        public string SP2013SearchUrl {
            get {
                return ((string)(this["SP2013SearchUrl"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("ValContentType")]
        public string SP2013ContentSourceName {
            get {
                return ((string)(this["SP2013ContentSourceName"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute(@"<?xml version=""1.0"" encoding=""utf-16""?>
<ArrayOfString xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <string>Binder Missing Docs</string>
  <string>Capita Data Entry Correction</string>
  <string>Capita Query</string>
  <string>Non Capita Data Entry Correction</string>
  <string>OS Peer Review</string>
  <string>Overseas Office Data Entry</string>
  <string>Peer Review</string>
  <string>Peer Review Query</string>
  <string>Post Bind Failure</string>
  <string>Post-Bind CC Fail</string>
  <string>Post-Bind CC Query</string>
  <string>Post-Bind CC Reject</string>
  <string>Post-Bind CC Resubmission</string>
  <string>Pre-Bind CC Fail</string>
  <string>Pre-Bind CC Failure</string>
  <string>Pre-Bind CC Query</string>
  <string>Pre-Bind CC Reject</string>
  <string>Pre-Bind Resubmission</string>
  <string>Queries</string>
  <string>Treaty Data Entry</string>
  <string>Underwriter Review Query</string>
  <string>URO Review</string>
  <string>URO Review Query</string>
  <string>UTS Data Entry</string>
  <string>UTS Query</string>
  <string>UW Review</string>
  <string>Wordings External</string>
  <string>Workflow Cancellation Request</string>
</ArrayOfString>")]
        public global::System.Collections.Specialized.StringCollection ActivityNameFilterOptions {
            get {
                return ((global::System.Collections.Specialized.StringCollection)(this["ActivityNameFilterOptions"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("")]
        public string SP2013ContentSources {
            get {
                return ((string)(this["SP2013ContentSources"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("SG-UKDEVWorldCheckUser")]
        public string WorldCheckGroup {
            get {
                return ((string)(this["WorldCheckGroup"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute(@"VALBkrCtc,VALBkrCd,VALBpr,VALCcy,VALLdr,VALDsc,VALDol,VALInsdNm,VALLoccLocn,VALPolID,VALSt,VALUwr,VALReserve,VALPaid,HITHIGHLIGHTEDSUMMARY,VALBkrGrpCd,VALBkrNm,VALBkrPsu,VALBkrSeqId,VALAcctgYr,VALCob,VALDivision,VALEntSt,VALIncpDt,VALOrigOff,VALSt,ContentType,VALInsdId,VALLastYear,VALFirstYear,VALNoOfRisks,VALNoOfLiveRisks,VALNoOfOtherRisks,VALFirstLiveYear,VALLastLiveYear,VALBkrNm,VALLmtAmt,VALExsAmt,VALExpydt,VALInsds")]
        public string SP2013Properties {
            get {
                return ((string)(this["SP2013Properties"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("Underwriting")]
        public string DMSObjectStore {
            get {
                return ((string)(this["DMSObjectStore"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("Underwriting")]
        public string DMSDocumentClass {
            get {
                return ((string)(this["DMSDocumentClass"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.SpecialSettingAttribute(global::System.Configuration.SpecialSetting.ConnectionString)]
        [global::System.Configuration.DefaultSettingValueAttribute("Data Source=ukroomdev01.talbotdev.com;Initial Catalog=Subscribe;User Id=sqlUKDEVS" +
            "QLEDW;Password=D1W2access;")]
        public string SubscribeSQL {
            get {
                return ((string)(this["SubscribeSQL"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.DefaultSettingValueAttribute("Type,Entry-Status,Status,Submission-Status,Claim-Status,Year,COB,Insured,All-Insu" +
            "reds,Broker,Underwriter,Office,Domicile")]
        public string SearchRefinersList {
            get {
                return ((string)(this["SearchRefinersList"]));
            }
        }
    }
}
