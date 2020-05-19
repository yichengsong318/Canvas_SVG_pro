


var Drawers;

DrawingManager = {
  Drawers: [],
  register: function (drawer) {
    DrawingManager.Drawers.push(drawer);
  },
  findDrawer: function (drawerHandle) {
    for (var i = 0; i < DrawingManager.Drawers.length; i++) {
      if (DrawingManager.Drawers[i].Handle === drawerHandle) {
        return DrawingManager.Drawers[i];
      }
    }
    return null;
   }
}




var oriWidth = 280;
var oriHeight = 710;




    //  =  = = = = = = = = Object = = = = = = = = =
    function Pathline(id) {

      this.drawPath = function (position) {
          $('#'+id).attr("d",'M ' + position[0].x + ' ' + position[0].y + ' L ' + position[1].x + ' '+ position[1].y)
      }
      this.getPosition = function() {
        this.path_pos = [{x:0,y:0},{x:0,y:0}]; 
        this.position = $('#'+id).attr("d").split(" ")
        this.path_pos[0].x = Number(this.position[1])
        this.path_pos[0].y = Number(this.position[2]);
        this.path_pos[1].x = Number(this.position[4]);
        this.path_pos[1].y = Number(this.position[5]);
         return this.path_pos;
      }
    }

    function Arrow(id,direction) {

      this.drawArrow = function(position) {

        switch(direction) {
          case "up": 
          $('#'+ id).attr("d",'M '+ position.x + ' ' + position.y +  ' L ' + Number( position.x + 5) + ' ' + Number(position.y + 10) +  ' L ' + position.x + ' ' + position.y +  ' L ' + Number(position.x - 5) + ' ' + Number(position.y + 10) +  'Z');
          break;
          case "down":
            $('#'+ id).attr("d",'M '+ position.x + ' ' + position.y +  ' L ' + Number(position.x - 5) + ' ' + Number(position.y - 10) +  ' L ' + position.x + ' ' + position.y +  ' L ' + Number(position.x + 5) + ' ' + Number(position.y - 10) +  'Z');
          break;
          case "left":
            $('#'+ id).attr("d",'M '  + position.x +  ' ' + position.y + ' L ' + Number(position.x + 10) + ' ' + Number(position.y + 5) + ' L ' + position.x + ' ' + position.y + ' L ' + Number(position.x + 10) + ' ' +  Number(position.y - 5) + 'Z')
          break;
          case "right":
          $('#'+ id).attr("d",'M '+ position.x + ' ' + position.y +  ' L ' + Number(position.x - 10) + ' ' + Number(position.y + 5) +  ' L ' + position.x + ' ' + position.y +  ' L ' + Number(position.x - 10) + ' ' + Number( position.y - 5) +  'Z');
          break;
          }
      }

      this.getPosition = function() {
        this.arrow_pos = {x:0,y:0}; 
        this.position = $('#'+id).attr("d").split(" ")
        this.arrow_pos.x = Number(this.position[1])
        this.arrow_pos.y = Number(this.position[2]);
       
         return this.arrow_pos;
      }

      
    }
    
    function Group(id,direction) {

      this.moveGroup = function(position){
        switch(direction) {
          case "horizon":
            $('#'+id).attr("transform", 'translate(' + position.x + ', ' + position.y + ' )');
            break;
          case "vertical":
            $('#'+id).attr("transform", 'translate(' + position.x + ', ' + position.y + '), rotate(-90 100 100)')
          break;
        }
        
      }
      this.getPosition = function() {
        this.position = {x:0, y:0}
         this.position.x = Number($('#'+id).attr("transform").split("(")[1].split(",")[0]);
         this.position.y = Number($('#'+id).attr("transform").split("(")[1].split(",")[1].split(" ")[1].split(")")[0]);
        return this.position;
      }
        this.changeletter = function(text) {
        $('#'+id).text(text)
      }

    }
    
    function Rect(id) {
      this.moveRect = function (position) {
        $('#'+id).attr({"x": position.x  ,"y": position.y })
        }

      this.getPosition = function() {
        this.rect_pos = {x:0,y:0}; 
         this.positionX = $('#'+id).attr('x')
      
        this.positionY = $('#'+id).attr('y')
        this.rect_pos.x = Number(this.positionX)
        this.rect_pos.y = Number(this.positionY);
          return this.rect_pos;
      }
      this.setSize = function(size) {
        $('#'+id).attr({"width":' '+size.width+'px' , "height": ' '+size.height+'px'})
      }
    }

    function letter(id) {

      this.moveletter = function(position) {
  
        $('#'+id).css('transform','translate(' + position.x +'px, '+ position.y +'px)');
  
      }
      this.changeletter = function(text) {
        $('#'+id).text(text)
      }

      this.returnValue = function() {
        var string =  $('#'+id).text().split("-");
        var realValue = string[1] ? math.fraction(string[0]+' ' +string[1]) : math.fraction(string[0]);
        return realValue
      }

    }

    function curve(id) {

      this.drawCurve = function (position) {
        $('#'+id).attr("d",'M ' + position[0].x + ' ' + position[0].y + ' Q ' + position[1].x + ' '+ position[1].y +' ' + position[2].x + ' '+ position[2].y)
      }


    
    }

    function circle(id) {
      this.moveCircle = function(position) {
        $('#'+id).attr({'cx':''+ position.x+'','cy':''+position.y+''});
  
      }
      this.setSize = function(size) {
        $('#'+id).attr({'rx':''+ size+'','ry':''+size+''});
      }

      this.getPosition = function() {
        this.circle_pos = {x:0,y:0}; 
         this.positionX = $('#'+id).attr('rx')
      
        this.positionY = $('#'+id).attr('ry')
        this.circle_pos.x = Number(this.positionX)
        this.circle_pos.y = Number(this.positionY);
          return this.circle_pos;
      }
    }
    // = = = = = = =  = =   Object instances = = = == =
    function definitionObject() {

      //  = = == =  = = == = Main = = = = = == == = = == 

      //Line  
      this.upLine = new Pathline("ULine");
      this.leftLine = new Pathline("LLine");
      this.rightLine = new Pathline("RLine");
      this.downLine = new Pathline("DLine");

      //-  - -  main Arrow  - 
      // upArrow
      this.upArrowline = new Pathline("U_LineArrow");
      this.ulArrowP = new Pathline("UL_Arrow");
      this.urArrowP = new Pathline("UR_Arrow");
      this.ulTip = new Arrow("UL_Tip","left");
      this.urTip = new Arrow("UR_Tip","right");

      // down
      this.downArrowline = new Pathline("D_LineArrow");
      this.dlArrowP = new Pathline("DL_Arrow");
      this.drArrowP = new Pathline("DR_Arrow");
      this.dlTip = new Arrow("DL_Tip","left");
      this.drTip = new Arrow("DR_Tip","right");

      // left
      this.lArrowline = new Pathline("L_LineArrow");
      this.lfupArrowP = new Pathline("LU_Arrow");
      this.lfdownArrowP = new Pathline("LD_Arrow");
      this.lfupTip = new Arrow("LU_Tip","up");
      this.lfdownTip = new Arrow("LD_Tip","down");

      //  right
      this.rArrowline = new Pathline("R_LineArrow");
      this.rgupArrowP = new Pathline("RU_Arrow");
      this.rgdownArrowP = new Pathline("RD_Arrow");
      this.rgupTip = new Arrow("RU_Tip","up");
      this.rgdownTip = new Arrow("RD_Tip","down");





      // =  = = = = = =  = = == = Corner  = = = = = = = = = = = = =  

      // line
      this.CL_uline = new Pathline("OLineLU");
      this.CL_dline = new Pathline("OLineLB");
      this.CR_uline = new Pathline("OLineRU");
      this.CR_dline = new Pathline("OLineRB");


      // upArrow
      this.CL_upArrowline = new Pathline("C_UL_Line");
      this.CL_ulArrowP = new Pathline("C_UL_P");
      this.CL_ulTip = new Arrow("C_UL_LTip","left");
      this.CL_urTip = new Arrow("C_UL_RTip","right");

      this.CR_upArrowline = new Pathline("C_UR_Line");
      this.CR_ulArrowP = new Pathline("C_UR_P");
      this.CR_ulTip = new Arrow("C_UR_LTip","left");
      this.CR_urTip = new Arrow("C_UR_RTip","right");

       // down
       this.CL_downArrowline = new Pathline("C_DL_Line");
       this.CL_dlArrowP = new Pathline("C_DL_P");
       this.CL_dlTip = new Arrow("C_DL_LTip","left");
       this.CL_drTip = new Arrow("C_DL_RTip","right");

       this.CR_downArrowline = new Pathline("C_DR_Line");
       this.CR_dlArrowP = new Pathline("C_DR_P");
       this.CR_dlTip = new Arrow("C_DR_LTip","left");
       this.CR_drTip = new Arrow("C_DR_RTip","right");

        // left
      this.CU_lArrowline = new Pathline("C_LU_Line");
      this.CU_lfupArrowP = new Pathline("C_LU_P");
      this.CU_lfupTip = new Arrow("C_LU_UTip","up");
      this.CU_lfdownTip = new Arrow("C_LU_DTip","down");

      this.CD_lArrowline = new Pathline("C_LD_Line");
      this.CD_lfdownArrowP = new Pathline("C_LD_P");
      this.CD_lfupTip = new Arrow("C_LD_UTip","up");
      this.CD_lfdownTip = new Arrow("C_LD_DTip","down");

      //  right
      this.CU_rArrowline = new Pathline("C_RU_Line");
      this.CU_rgupArrowP = new Pathline("C_RU_P");
      this.CU_rgupTip = new Arrow("C_RU_UTip","up");
      this.CU_rgdownTip = new Arrow("C_RU_DTip","down");

      this.CD_rArrowline = new Pathline("C_RD_Line");
      this.CD_rgdownArrowP = new Pathline("C_RD_P");
      this.CD_rgupTip = new Arrow("C_RD_UTip","up");
      this.CD_rgdownTip = new Arrow("C_RD_DTip","down");

      // group
      this.CLUW_Group = new Group("CLUW_Group","horizon");
      this.CRUW_Group = new Group("CRUW_Group","horizon");
      this.CLBW_Group = new Group("CLBW_Group","horizon");
      this.CRBW_Group = new Group("CRBW_Group","horizon");

      this.CLUH_Group = new Group("CLUH_Group","vertical");
      this.CLBH_Group = new Group("CLBH_Group","vertical");
      this.CRUH_Group = new Group("CRUH_Group","vertical");
      this.CRBH_Group = new Group("CRBH_Group","vertical");
      // letter
      this.C_LUH_Letter = new letter("C_LUH_Letter");
      this.C_LUW_Letter = new letter("C_LUW_Letter");
      this.C_RUW_Letter = new letter("C_RUW_Letter")
      this.C_RUH_Letter = new letter("C_RUH_Letter")

      this.C_LBH_letter = new letter("C_LBH_letter");
      this.C_LBW_Letter = new letter("C_LBW_Letter");
      this.C_RBW_Letter = new letter("C_RBW_Letter")
      this.C_RBH_Letter = new letter("C_RBH_Letter")



      //  - - - - Radius

      this.RL_u = new curve("LU_curve");
      this.RL_d = new curve("LD_curve");
      this.RR_u = new curve("RU_curve");
      this.RR_d = new curve("RD_curve");


      
      // upArrow
      this.RL_upArrowline = new Pathline("R_UL_Line");
      this.RL_ulArrowP = new Pathline("R_UL_P");
      this.RL_ulTip = new Arrow("R_UL_LTip","left");
      this.RL_urTip = new Arrow("R_UL_RTip","right");

      this.RR_upArrowline = new Pathline("R_UR_Line");
      this.RR_ulArrowP = new Pathline("R_UR_P");
      this.RR_ulTip = new Arrow("R_UR_LTip","left");
      this.RR_urTip = new Arrow("R_UR_RTip","right");

       // down
       this.RL_downArrowline = new Pathline("R_DL_Line");
       this.RL_dlArrowP = new Pathline("R_DL_P");
       this.RL_dlTip = new Arrow("R_DL_LTip","left");
       this.RL_drTip = new Arrow("R_DL_RTip","right");

       this.RR_downArrowline = new Pathline("R_DR_Line");
       this.RR_dlArrowP = new Pathline("R_DR_P");
       this.RR_dlTip = new Arrow("R_DR_LTip","left");
       this.RR_drTip = new Arrow("R_DR_RTip","right");



        // left
      this.RU_lArrowline = new Pathline("R_LU_Line");
      this.RU_lfupArrowP = new Pathline("R_LU_P");
      this.RU_lfupTip = new Arrow("R_LU_UTip","up");
      this.RU_lfdownTip = new Arrow("R_LU_DTip","down");

      this.RD_lArrowline = new Pathline("R_LD_Line");
      this.RD_lfdownArrowP = new Pathline("R_LD_P");
      this.RD_lfupTip = new Arrow("R_LD_UTip","up");
      this.RD_lfdownTip = new Arrow("R_LD_DTip","down");

      //  right
      this.RU_rArrowline = new Pathline("R_RU_Line");
      this.RU_rgupArrowP = new Pathline("R_RU_P");
      this.RU_rgupTip = new Arrow("R_RU_UTip","up");
      this.RU_rgdownTip = new Arrow("R_RU_DTip","down");

      this.RD_rArrowline = new Pathline("R_RD_Line");
      this.RD_rgdownArrowP = new Pathline("R_RD_P");
      this.RD_rgupTip = new Arrow("R_RD_UTip","up");
      this.RD_rgdownTip = new Arrow("R_RD_DTip","down");

      //Group 
      this.RLUW_Group = new Group("RLUW_Group","horizon");
      this.RRUW_Group = new Group("RRUW_Group","horizon");
      this.RLBW_Group = new Group("RLBW_Group","horizon");
      this.RRBW_Group = new Group("RRBW_Group","horizon");

      this.RLUH_Group = new Group("RLUH_Group","vertical");
      this.RLBH_Group = new Group("RLBH_Group","vertical");
      this.RRUH_Group = new Group("RRUH_Group","vertical");
      this.RRBH_Group = new Group("RRBH_Group","vertical");
      // letter
      this.R_LUH_Letter = new letter("R_LUH_Letter");
      this.R_LUW_Letter = new letter("R_LUW_Letter");
      this.R_RUW_Letter = new letter("R_RUW_Letter")
      this.R_RUH_Letter = new letter("R_RUH_Letter")

      this.R_LBH_letter = new letter("R_LBH_letter");
      this.R_LBW_Letter = new letter("R_LBW_Letter");
      this.R_RBW_Letter = new letter("R_RBW_Letter")
      this.R_RBH_Letter = new letter("R_RBH_Letter")



    // = = = = = = = = == =  LeftOutage
      this.L_dot_Line = new Pathline("L_dot_Line");
      this.LLL_E_dot_Line_1 = new Pathline("LLL_E_dot_Line_1");
      this.LLL_E_dot_Line_2 = new Pathline("LLL_E_dot_Line_2");
      this.L_Elbow_1 = new Pathline("L_Elbow_1");
      this.L_Elbow_2 = new Pathline("L_Elbow_2");
     
      //  = = = = = = = = ==  =RightOutage
     
      this.R_dot_Line = new Pathline("R_dot_Line");
      this.RLL_E_dot_Line_1 = new Pathline("RLL_E_dot_Line_1");
      this.RLL_E_dot_Line_2 = new Pathline("RLL_E_dot_Line_2");
      this.R_Elbow_1 = new Pathline("R_Elbow_1");
      this.R_Elbow_2 = new Pathline("R_Elbow_2");
     
      // bottom
      
      this.D_dot_Line = new Pathline("D_dot_Line"); 

      // Notch

      this.LT_notch_width_path1 = new Pathline("LT_notch_width_path1");
      this.LT_notch_width_path2 = new Pathline("LT_notch_width_path2");

      this.LT_notch_height_path1 = new Pathline("LT_notch_height_path1");
      this.LT_notch_height_path2 = new Pathline("LT_notch_height_path2");

      this.RT_notch_width_path1 = new Pathline("RT_notch_width_path1");
      this.RT_notch_width_path2 = new Pathline("RT_notch_width_path2");

      this.RT_notch_height_path1 = new Pathline("RT_notch_height_path1");
      this.RT_notch_height_path2 = new Pathline("RT_notch_height_path2");

      this.LB_notch_width_path1 = new Pathline("LB_notch_width_path1");
      this.LB_notch_width_path2 = new Pathline("LB_notch_width_path2");

      this.LB_notch_height_path1 = new Pathline("LB_notch_height_path1");
      this.LB_notch_height_path2 = new Pathline("LB_notch_height_path2");

      this.RB_notch_width_path1 = new Pathline("RB_notch_width_path1");
      this.RB_notch_width_path2 = new Pathline("RB_notch_width_path2");

      this.RB_notch_height_path1 = new Pathline("RB_notch_height_path1");
      this.RB_notch_height_path2 = new Pathline("RB_notch_height_path2");


      this.extra_p1 = new Pathline("extra_p1");
      this.extra_p2 = new Pathline("extra_p2");
      this.extra_p3 = new Pathline("extra_p3");
      this.extra_p4 = new Pathline("extra_p4");
      this.extra_p5 = new Pathline("extra_p5");
      this.extra_p6 = new Pathline("extra_p6");
      this.extra_p7 = new Pathline("extra_p7");
      this.extra_p8 = new Pathline("extra_p8");


      //  = = = = ==  = ==  = Group
      this. upmainGroup = new Group("upGroup","horizon");
      this. downmainGroup = new Group("downGroup","horizon");
      this. leftmainGroup = new Group("leftGroup","vertical");
      this. rightmainGroup = new Group("rightGroup","vertical");


      // Rect
      this. luRect = new Rect("LU_Rect")
      this. ruRect = new Rect("RU_Rect")
      this. lbRect = new Rect("LB_Rect")
      this. rbRect = new Rect("RB_Rect")

      this.luRect1 = new Rect("LU_Rect1")
      this. ruRect1 = new Rect("RU_Rect1")
      this. lbRect1 = new Rect("LB_Rect1")
      this. rbRect1 = new Rect("RB_Rect1")

      // letter
      this. frontletter = new letter("frontletter")
      this. backletter = new letter("backletter")
      this. centerNote = new letter("cnote")

      this.up_Widthletter = new letter("Top_Width");
      this.down_Widthletter = new letter("Bottom_Width");
      this.left_Heightletter = new letter("lef_height")
      this.right_Heightletter = new letter("Right_Height")

      //  = = = = = = = = Joints = = = == = == = = = = 

      this.BULine = new Pathline("BULine");
      this.BLLine = new Pathline("BLLine");
      this.BDLine = new Pathline("BDLine");
      this.BRLine = new Pathline("BRLine");

      this.LM_dot = new Pathline("LM_dot");
      this.RM_dot = new Pathline("RM_dot");


      this.LM_letterG = new Group("LM_letterG","horizon");
      this.RM_letterG = new Group("RM_letterG","horizon");
      this.LM_letter = new letter("LM_letter");
      this.RM_letter = new letter("RM_letter");

      // = = = = == = =  = = Hole = =  = = = = = = =

      // single
      this.singleCircle = new circle("singleCircle");
      
      this.SL_upArrowline = new Pathline("S_UL_Line");
      this.SL_ulArrowP = new Pathline("S_UL_P");
      this.SL_ulTip = new Arrow("S_UL_LTip","left");
      this.SL_urTip = new Arrow("S_UL_RTip","right");
      this.SW_group = new Group("SW_group","horizon")

      this.SU_lArrowline = new Pathline("S_LU_Line");
      this.SU_lfupArrowP = new Pathline("S_LU_P");
      this.SU_lfupTip = new Arrow("S_LU_UTip","up");
      this.SU_lfdownTip = new Arrow("S_LU_DTip","down");
      this.SH_group = new Group("SH_group","vertical")

      this.SH_letter = new letter("SH_letter");
      this.SW_letter = new letter("SW_letter");

      this.circleDiameter = new letter("circleDiameter");

      // double
      this.doubleCircle = new circle("doubleCircle");

      this.SDL_upArrowline = new Pathline("SD_UL_Line");
      this.SDL_ulArrowP = new Pathline("SD_UL_P");
      this.SDL_ulTip = new Arrow("SD_UL_LTip","left");
      this.SDL_urTip = new Arrow("SD_UL_RTip","right");
      this.SDW_group = new Group("SDW_group","horizon")

      this.SDU_lArrowline = new Pathline("SD_LU_Line");
      this.SDU_lfupArrowP = new Pathline("SD_LU_P");
      this.SDU_lfupTip = new Arrow("SD_LU_UTip","up");
      this.SDU_lfdownTip = new Arrow("SD_LU_DTip","down");
      this.SDH_group = new Group("SDH_group","vertical")

      this.SDH_letter = new letter("SDH_letter");
      this.SDW_letter = new letter("SDW_letter");

      //  = = = = = = U notch = = = = = =  = =

      this.UNcircle = new circle("UNcircle")
      this.UNrect = new Rect("UNrect")
      this.UN_upline = new Pathline("UN_upline")
      this.UN_downline = new Pathline("UN_downline")


    
    }

    //  = = = = = = = =  = = base Draw = = = = = = = = = 
    function initDraw(context) {
      

      var simpleParameter = {};
       simpleParameter = context.Parameters.filter((parameter, i) => { 
        return parameter.ParameterName === 'simeplePanel';
    })
       this.parameter = simpleParameter[0]


          var ele = new definitionObject();

          this.width = this.parameter.value[0].width
          this.height = this.parameter.value[0].height;
          this.centerNote = this.parameter.value[1].centerNote;
          
          // parameter calculation
          this.calHeight = 10 * this.height;
          this.rate  = oriHeight/this.calHeight;
          this.calWidth = 10 * this.width * this.rate;
          this.widthDifference = this.calWidth - oriWidth;

          this.upWidth = this.width;
          this.downWidth = this.width;
          this.leftHeight = this.height;
          this.rightHeight = this.height;

         
          this.dis_upWidth = this.width;
          this.dis_downWidth = this.width;
          this.dis_leftHeight = this.height;
          this.dis_rightHeight = this.height;
        

          this.init2d_pos = [{x:-10000, y:0},  {x:-10000 , y:0},]
          this.initSignle_pos = {x:-10000, y:-10000};
          // main line 
          this.upline_pos = ele.upLine.getPosition()
          this.downline_pos =ele.downLine.getPosition()
          this.leftline_pos = ele.leftLine.getPosition()
          this.rightline_pos = ele.rightLine.getPosition()

          // main arrow
          this.upArrowline_pos =  ele.upArrowline.getPosition()
          this.ulArrowP_pos = ele.ulArrowP.getPosition()
          this.urArrowP_pos = ele.urArrowP.getPosition()
          this.ulTip_pos = ele.ulTip.getPosition()
          this.urTip_pos = ele.urTip.getPosition()

          this.downArrowline_pos =  [{x:this.downline_pos[0].x, y:935},  {x:this.downline_pos[1].x, y:935},]
          this.dlArrowP_pos = [{x:this.downline_pos[0].x, y:945},{x:this.downline_pos[0].x, y:925}]      
          this.drArrowP_pos = [{x:this.downline_pos[1].x, y:945},{x:this.downline_pos[1].x, y:925}]
          this.dlTip_pos = {x:this.downline_pos[0].x, y:935};
          this.drTip_pos = {x:this.downline_pos[1].x, y:935};

          this.rArrowline_pos =  [{x:this.rightline_pos[0].x+77, y:this.rightline_pos[0].y},  {x:this.rightline_pos[1].x+77, y:this.rightline_pos[1].y},]
          this.rgupArrowP_pos = [{x:this.rightline_pos[0].x-10+77, y:this.rightline_pos[0].y}, {x:this.rightline_pos[1].x+10+77, y:this.rightline_pos[0].y}]
          this.rgdownArrowP_pos = [{x:this.rightline_pos[1].x-10+77, y:this.rightline_pos[1].y},{x:this.rightline_pos[1].x+10+77, y:this.rightline_pos[1].y}]
          this.rgupTip_pos = {x:this.rightline_pos[0].x+77, y:this.rightline_pos[0].y};
          this.rgdownTip_pos ={x:this.rightline_pos[1].x+77, y:this.rightline_pos[1].y};


          this.lArrowline_pos =ele.lArrowline.getPosition();
          this.lfupArrowP_pos = ele.lfupArrowP.getPosition();
          this.lfdownArrowP_pos = ele.lfdownArrowP.getPosition();
          this.lfupTip_pos = ele.lfupTip.getPosition();
          this.lfdownTip_pos =ele.lfdownTip.getPosition();
          // group
          this.upletter = ele.upmainGroup.getPosition()
          this.downletter = ele.downmainGroup.getPosition();
          this.rightletter =ele.rightmainGroup.getPosition();
          this.leftletter = ele.leftmainGroup.getPosition()

          this.CLUW_Group = ele.CLUW_Group.getPosition();
          this.CRUW_Group = ele.CRUW_Group.getPosition();
          this.CLBW_Group = ele.CLBW_Group.getPosition();
          this.CRBW_Group = ele.CRBW_Group.getPosition();
    
          this.CLUH_Group = ele.CLUH_Group.getPosition();
          this.CLBH_Group = ele.CLBH_Group.getPosition();
          this.CRUH_Group = ele.CRUH_Group.getPosition();
          this.CRBH_Group = ele.CRBH_Group.getPosition();

          this.RLUW_Group = ele.RLUW_Group.getPosition();
          this.RRUW_Group = ele.RRUW_Group.getPosition();
          this.RLBW_Group = ele.RLBW_Group.getPosition();
          this.RRBW_Group = ele.RRBW_Group.getPosition();
    
          this.RLUH_Group = ele.RLUH_Group.getPosition();
          this.RLBH_Group = ele.RLBH_Group.getPosition();
          this.RRUH_Group = ele.RRUH_Group.getPosition();
          this.RRBH_Group = ele.RRBH_Group.getPosition();
        

          // rect
          this.ruRectmove = {x:ele.ruRect.getPosition().x, y:ele.ruRect.getPosition().y};
          this.rbRectmove = {x:ele.rbRect.getPosition().x, y:ele.rbRect.getPosition().y};
          this.luRectmove = {x:ele.luRect.getPosition().x, y:ele.luRect.getPosition().y};
          this.lbRectmove = {x:ele.lbRect.getPosition().x, y:ele.lbRect.getPosition().y};

          this.ruRectmove1 = {x:ele.ruRect1.getPosition().x, y:ele.ruRect1.getPosition().y};
          this.rbRectmove1 = {x:ele.rbRect1.getPosition().x, y:ele.rbRect1.getPosition().y};
          this.luRectmove1 = {x:ele.luRect1.getPosition().x, y:ele.luRect1.getPosition().y};
          this.lbRectmove1 = {x:ele.lbRect1.getPosition().x, y:ele.lbRect1.getPosition().y};

          // letters
          this.frontletterMove = {x:303 + (this.widthDifference)/2 - 10*4/2, y:115};
          this.backletterMove = {x:303 + (this.widthDifference)/2 - 10*4/2, y:20};
          this.centernoteMove = {x:297 + (this.calWidth-oriWidth)/2-10* ( this.centerNote.length)/2 ,y:320};


          // corner && radius

          this.CL_upArrowline = ele.CL_upArrowline.getPosition();
          this.CL_ulArrowP = ele.CL_ulArrowP.getPosition();
          this.CL_ulTip = ele.CL_ulTip.getPosition();
          this.CL_urTip = ele.CL_urTip.getPosition();
    
          this.CR_upArrowline = ele.CR_upArrowline.getPosition();
          this.CR_ulArrowP = ele.CR_ulArrowP.getPosition();
          this.CR_ulTip = ele.CR_ulTip.getPosition();
          this.CR_urTip = ele.CR_urTip.getPosition();
    
           // down
           this.CL_downArrowline = ele.CL_downArrowline.getPosition();
           this.CL_dlArrowP = ele.CL_dlArrowP.getPosition();
           this.CL_dlTip = ele.CL_dlTip.getPosition();
           this.CL_drTip = ele.CL_drTip.getPosition();
    
           this.CR_downArrowline = ele.CR_downArrowline.getPosition();
           this.CR_dlArrowP = ele.CR_dlArrowP.getPosition();
           this.CR_dlTip = ele.CR_dlTip.getPosition();
           this.CR_drTip = ele.CR_drTip.getPosition();
    
            // left
          this.CU_lArrowline = ele.CU_lArrowline.getPosition();
          this.CU_lfupArrowP = ele.CU_lfupArrowP.getPosition();
          this.CU_lfupTip = ele.CU_lfupTip.getPosition();
          this.CU_lfdownTip = ele.CU_lfdownTip.getPosition();
    
          this.CD_lArrowline = ele.CD_lArrowline.getPosition();
          this.CD_lfdownArrowP = ele.CD_lfdownArrowP.getPosition();
          this.CD_lfupTip = ele.CD_lfupTip.getPosition();
          this.CD_lfdownTip = ele.CD_lfdownTip.getPosition();
    
          //  right
          this.CU_rArrowline = ele.CU_rArrowline.getPosition();
          this.CU_rgupArrowP = ele.CU_rgupArrowP.getPosition()
          this.CU_rgupTip = ele.CU_rgupTip.getPosition();
          this.CU_rgdownTip = ele.CU_rgdownTip.getPosition();
    
          this.CD_rArrowline = ele.CD_rArrowline.getPosition();
          this.CD_rgdownArrowP = ele.CD_rgdownArrowP.getPosition();
          this.CD_rgupTip = ele.CD_rgupTip.getPosition();
          this.CD_rgdownTip = ele.CD_rgdownTip.getPosition();

          // Radius

           this.RL_upArrowline = ele.RL_upArrowline.getPosition();
           this.RL_ulArrowP = ele.RL_ulArrowP.getPosition();
           this.RL_ulTip = ele.RL_ulTip.getPosition();
           this.RL_urTip = ele.RL_urTip.getPosition();
     
           this.RR_upArrowline = ele.RR_upArrowline.getPosition();
           this.RR_ulArrowP = ele.RR_ulArrowP.getPosition();
           this.RR_ulTip = ele.RR_ulTip.getPosition();
           this.RR_urTip = ele.RR_urTip.getPosition();
     
            // down
            this.RL_downArrowline = ele.RL_downArrowline.getPosition();
            this.RL_dlArrowP = ele.RL_dlArrowP.getPosition();
            this.RL_dlTip = ele.RL_dlTip.getPosition();
            this.RL_drTip = ele.RL_drTip.getPosition();
     
            this.RR_downArrowline = ele.RR_downArrowline.getPosition();
            this.RR_dlArrowP = ele.RR_dlArrowP.getPosition();
            this.RR_dlTip = ele.RR_dlTip.getPosition();
            this.RR_drTip = ele.RR_drTip.getPosition();
     
             // left
           this.RU_lArrowline = ele.RU_lArrowline.getPosition();
           this.RU_lfupArrowP = ele.RU_lfupArrowP.getPosition();
           this.RU_lfupTip = ele.RU_lfupTip.getPosition();
           this.RU_lfdownTip = ele.RU_lfdownTip.getPosition();
     
           this.RD_lArrowline = ele.RD_lArrowline.getPosition();
           this.RD_lfdownArrowP = ele.RD_lfdownArrowP.getPosition();
           this.RD_lfupTip = ele.RD_lfupTip.getPosition();
           this.RD_lfdownTip = ele.RD_lfdownTip.getPosition();
     
           //  right
           this.RU_rArrowline = ele.RU_rArrowline.getPosition();
           this.RU_rgupArrowP = ele.RU_rgupArrowP.getPosition();
           this.RU_rgupTip = ele.RU_rgupTip.getPosition();
           this.RU_rgdownTip = ele.RU_rgdownTip.getPosition();
     
           this.RD_rArrowline = ele.RD_rArrowline.getPosition();
           this.RD_rgdownArrowP = ele.RD_rgdownArrowP.getPosition();
           this.RD_rgupTip = ele.RD_rgupTip.getPosition();
           this.RD_rgdownTip = ele.RD_rgdownTip.getPosition();
    
           // = = = = = = = left outage = = = = = = = == =

           
           this.LLL_E_dot_Line_1 = ele.LLL_E_dot_Line_1.getPosition();
           this.LLL_E_dot_Line_2 = ele.LLL_E_dot_Line_2.getPosition();
           this.L_Elbow_1 = ele.L_Elbow_1.getPosition();
           this.L_Elbow_2 = ele.L_Elbow_2.getPosition();

          //  = = = = = = = == = right outage = = = = = = ==  = =

          this.RLL_E_dot_Line_1 = ele.RLL_E_dot_Line_1.getPosition();
          this.RLL_E_dot_Line_2 = ele.RLL_E_dot_Line_2.getPosition();
          this.R_Elbow_1 = ele.R_Elbow_1.getPosition();
          this.R_Elbow_2 = ele.R_Elbow_2.getPosition();

           
          //  = = = = Notch
          this.extra_p1 = ele.extra_p1.getPosition();
          this.extra_p2 = ele.extra_p2.getPosition();
          this.extra_p3 = ele.extra_p3.getPosition();
          this.extra_p4 = ele.extra_p4.getPosition();
          this.extra_p5 = ele.extra_p5.getPosition();
          this.extra_p6 = ele.extra_p6.getPosition();
          this.extra_p7 = ele.extra_p7.getPosition();
          this.extra_p8 = ele.extra_p8.getPosition();

          // = = = = = = Joints = = = =  = = = 

          this.BULine = ele.BULine.getPosition()
          this.BLLine = ele.BLLine.getPosition()
          this.BRLine = ele.BRLine.getPosition()
          this.BDLine =  ele.BDLine.getPosition()

          this.LM_dot = ele.LM_dot.getPosition();
          this.RM_dot = ele.RM_dot.getPosition();



          //  = = = = == = = Hole = = = = = =  = 
          // single
          this.singleCircle = ele.singleCircle.getPosition();

          this.SL_upArrowline = ele.SL_upArrowline.getPosition();
          this.SL_ulArrowP = ele.SL_ulArrowP.getPosition();
          this.SL_ulTip = ele.SL_ulTip.getPosition();
          this.SL_urTip = ele.SL_urTip.getPosition();
          this.SW_group = ele.SW_group.getPosition();


          this.SU_lArrowline = ele.SU_lArrowline.getPosition();
          this.SU_lfupArrowP = ele.SU_lfupArrowP.getPosition();
          this.SU_lfupTip = ele.SU_lfupTip.getPosition();
          this.SU_lfdownTip = ele.SU_lfdownTip.getPosition();
          this.SH_group = ele.SH_group.getPosition();
    
          this.circleDiameter =  {x:-900000,y:-70000000};
         
          // double
          this.doubleCircle = ele.doubleCircle.getPosition()

          this.SDL_upArrowline = ele.SDL_upArrowline.getPosition();
          this.SDL_ulArrowP = ele.SDL_ulArrowP.getPosition();
          this.SDL_ulTip = ele.SDL_ulTip.getPosition();
          this.SDL_urTip = ele.SDL_urTip.getPosition();
          this.SDW_group = ele.SDW_group.getPosition();

          this.SDU_lArrowline = ele.SDU_lArrowline.getPosition();
          this.SDU_lfupArrowP = ele.SDU_lfupArrowP.getPosition();
          this.SDU_lfupTip = ele.SDU_lfupTip.getPosition();
          this.SDU_lfdownTip = ele.SDU_lfdownTip.getPosition();
          this.SDH_group = ele.SDH_group.getPosition();

          //  = = = = = U nortch
          this.UNcircle = this.initSignle_pos;
          this.UNrect = ele.UNrect.getPosition();
          // this.UN_upline = ele.UN_upline.getPosition()
          // this.UN_downline = ele.UN_downline.getPosition()




          this.draw =function () {

            var shape = new definitionObject();
// mainline
              shape.upLine.drawPath(this.upline_pos);
              shape.downLine.drawPath(this.downline_pos);
              shape.leftLine.drawPath(this.leftline_pos);
              shape.rightLine.drawPath(this.rightline_pos);
// arrow
              shape.upArrowline.drawPath(this.upArrowline_pos)
              shape.ulArrowP.drawPath(this.ulArrowP_pos)
              shape.urArrowP.drawPath(this.urArrowP_pos)
              shape.ulTip.drawArrow(this.ulTip_pos)
              shape.urTip.drawArrow(this.urTip_pos)

              shape.downArrowline.drawPath(this.downArrowline_pos)
              shape.dlArrowP.drawPath(this.dlArrowP_pos)
              shape.drArrowP.drawPath(this.drArrowP_pos)
              shape.dlTip.drawArrow(this.dlTip_pos)
              shape.drTip.drawArrow(this.drTip_pos)


              shape.rArrowline.drawPath(this.rArrowline_pos)
              shape.rgupArrowP.drawPath(this.rgupArrowP_pos)
              shape.rgdownArrowP.drawPath(this.rgdownArrowP_pos)
              shape.rgupTip.drawArrow(this.rgupTip_pos)
              shape.rgdownTip.drawArrow(this.rgdownTip_pos)

              shape.lArrowline.drawPath(this.lArrowline_pos)
              shape.lfupArrowP.drawPath(this.lfupArrowP_pos)
              shape.lfdownArrowP.drawPath(this.lfdownArrowP_pos)
              shape.lfupTip.drawArrow(this.lfupTip_pos)
              shape.lfdownTip.drawArrow(this.lfdownTip_pos)


// group
              shape.upmainGroup.moveGroup(this.upletter)
              shape.downmainGroup.moveGroup(this.downletter)
              shape.rightmainGroup.moveGroup(this.rightletter)
              shape.leftmainGroup.moveGroup(this.leftletter)
// rect
              shape.ruRect.moveRect(this.ruRectmove)
              shape.rbRect.moveRect(this.rbRectmove)
              shape.luRect.moveRect(this.luRectmove)
              shape.lbRect.moveRect(this.lbRectmove)

              shape.ruRect1.moveRect(this.ruRectmove1)
              shape.rbRect1.moveRect(this.rbRectmove1)
              shape.luRect1.moveRect(this.luRectmove1)
              shape.lbRect1.moveRect(this.lbRectmove1)
// letter
              shape.frontletter.moveletter(this.frontletterMove)
              shape.backletter.moveletter(this.backletterMove)
              shape.centerNote.moveletter(this.centernoteMove)
              shape.centerNote.changeletter(this.centerNote)

      
              if(this.dis_upWidth.n%this.dis_upWidth.d == 0) {
                shape.up_Widthletter.changeletter('' + parseInt(this.dis_upWidth.n/this.dis_upWidth.d));
                } else {
                shape.up_Widthletter.changeletter(''+parseInt(this.dis_upWidth.n/this.dis_upWidth.d)+ '-'+this.dis_upWidth.n%this.dis_upWidth.d + '/' + this.dis_upWidth.d);
              }

              if(this.dis_downWidth.n%this.dis_downWidth.d == 0) {
                shape.down_Widthletter.changeletter('' + parseInt(this.dis_downWidth.n/this.dis_downWidth.d));
                } else {
                shape.down_Widthletter.changeletter(''+parseInt(this.dis_downWidth.n/this.dis_downWidth.d)+ '-'+this.dis_downWidth.n%this.dis_downWidth.d + '/' + this.dis_downWidth.d);
              }
           

              if(this.dis_leftHeight.n%this.dis_leftHeight.d == 0) {
                shape.left_Heightletter.changeletter('' + parseInt(this.dis_leftHeight.n/this.dis_leftHeight.d));
                } else {
                shape.left_Heightletter.changeletter(''+parseInt(this.dis_leftHeight.n/this.dis_leftHeight.d) + '-'+this.dis_leftHeight.n%this.dis_leftHeight.d + '/' + this.dis_leftHeight.d);
              }

              if(this.dis_rightHeight.n%this.dis_rightHeight.d == 0) {
                shape.right_Heightletter.changeletter('' + parseInt(this.dis_rightHeight.n/this.dis_rightHeight.d));
                } else {
                shape.right_Heightletter.changeletter(''+parseInt(this.dis_rightHeight.n/this.dis_rightHeight.d) + '-'+this.dis_rightHeight.n%this.dis_rightHeight.d + '/' + this.dis_rightHeight.d);
              }
                
              //  = = = = = = = corner
              shape.CL_upArrowline.drawPath(this.CL_upArrowline)
              shape.CL_ulArrowP.drawPath(this.CL_ulArrowP) 
              shape.CL_ulTip.drawArrow(this.CL_ulTip) 
              shape.CL_urTip.drawArrow(this.CL_urTip) 

              shape.CR_upArrowline.drawPath(this.CR_upArrowline) 
              shape.CR_ulArrowP.drawPath(this.CR_ulArrowP) 
              shape.CR_ulTip.drawArrow(this.CR_ulTip) 
              shape.CR_urTip.drawArrow(this.CR_urTip) 

              // down
              shape.CL_downArrowline.drawPath(this.CL_downArrowline) 
              shape.CL_dlArrowP.drawPath(this.CL_dlArrowP)
              shape.CL_dlTip.drawArrow(this.CL_dlTip) 
              shape.CL_drTip.drawArrow(this.CL_drTip)

              shape.CR_downArrowline.drawPath(this.CR_downArrowline) 
              shape.CR_dlArrowP.drawPath(this.CR_dlArrowP) 
              shape.CR_dlTip.drawArrow(this.CR_dlTip) 
              shape.CR_drTip.drawArrow(this.CR_drTip) 

              // left
              shape.CU_lArrowline.drawPath(this.CU_lArrowline) 
              shape.CU_lfupArrowP.drawPath(this.CU_lfupArrowP)
              shape.CU_lfupTip.drawArrow(this.CU_lfupTip) 
              shape.CU_lfdownTip.drawArrow(this.CU_lfdownTip) 

              shape.CD_lArrowline.drawPath(this.CD_lArrowline) 
              shape.CD_lfdownArrowP.drawPath(this.CD_lfdownArrowP)
              shape.CD_lfupTip.drawArrow(this.CD_lfupTip) 
              shape.CD_lfdownTip.drawArrow(this.CD_lfdownTip)

              //  right
              shape.CU_rArrowline.drawPath(this.CU_rArrowline)
              shape.CU_rgupArrowP.drawPath(this.CU_rgupArrowP)
              shape.CU_rgupTip.drawArrow(this.CU_rgupTip) 
              shape.CU_rgdownTip.drawArrow(this.CU_rgdownTip)

              shape.CD_rArrowline.drawPath(this.CD_rArrowline)
              shape.CD_rgdownArrowP.drawPath(this.CD_rgdownArrowP)
              shape.CD_rgupTip.drawArrow(this.CD_rgupTip) 
              shape.CD_rgdownTip.drawArrow(this.CD_rgdownTip)
              

              shape.CLUW_Group.moveGroup(this.CLUW_Group);
              shape.CRUW_Group.moveGroup( this.CRUW_Group);
              shape.CLBW_Group.moveGroup(this.CLBW_Group);
              shape.CRBW_Group.moveGroup(this.CRBW_Group);
        
              shape.CLUH_Group.moveGroup(this.CLUH_Group);
              shape.CLBH_Group.moveGroup(this.CLBH_Group);
              shape.CRUH_Group.moveGroup(this.CRUH_Group);
              shape.CRBH_Group.moveGroup(this.CRBH_Group);
              

              // = = = = = = = = = Radius
              shape.RL_upArrowline.drawPath(this.RL_upArrowline)
              shape.RL_ulArrowP.drawPath(this.RL_ulArrowP) 
              shape.RL_ulTip.drawArrow(this.RL_ulTip) 
              shape.RL_urTip.drawArrow(this.RL_urTip) 

              shape.RR_upArrowline.drawPath(this.RR_upArrowline) 
              shape.RR_ulArrowP.drawPath(this.RR_ulArrowP) 
              shape.RR_ulTip.drawArrow(this.RR_ulTip) 
              shape.RR_urTip.drawArrow(this.RR_urTip) 

              // down
              shape.RL_downArrowline.drawPath(this.RL_downArrowline) 
              shape.RL_dlArrowP.drawPath(this.RL_dlArrowP)
              shape.RL_dlTip.drawArrow(this.RL_dlTip) 
              shape.RL_drTip.drawArrow(this.RL_drTip)

              shape.RR_downArrowline.drawPath(this.RR_downArrowline) 
              shape.RR_dlArrowP.drawPath(this.RR_dlArrowP) 
              shape.RR_dlTip.drawArrow(this.RR_dlTip) 
              shape.RR_drTip.drawArrow(this.RR_drTip) 

              // left
              shape.RU_lArrowline.drawPath(this.RU_lArrowline) 
              shape.RU_lfupArrowP.drawPath(this.RU_lfupArrowP)
              shape.RU_lfupTip.drawArrow(this.RU_lfupTip) 
              shape.RU_lfdownTip.drawArrow(this.RU_lfdownTip) 

              shape.RD_lArrowline.drawPath(this.RD_lArrowline) 
              shape.RD_lfdownArrowP.drawPath(this.RD_lfdownArrowP)
              shape.RD_lfupTip.drawArrow(this.RD_lfupTip) 
              shape.RD_lfdownTip.drawArrow(this.RD_lfdownTip)

              //  right
              shape.RU_rArrowline.drawPath(this.RU_rArrowline)
              shape.RU_rgupArrowP.drawPath(this.RU_rgupArrowP)
              shape.RU_rgupTip.drawArrow(this.RU_rgupTip) 
              shape.RU_rgdownTip.drawArrow(this.RU_rgdownTip)

              shape.RD_rArrowline.drawPath(this.RD_rArrowline)
              shape.RD_rgdownArrowP.drawPath(this.RD_rgdownArrowP)
              shape.RD_rgupTip.drawArrow(this.RD_rgupTip) 
              shape.RD_rgdownTip.drawArrow(this.RD_rgdownTip)


              shape.RLUW_Group.moveGroup(this.RLUW_Group);
              shape.RRUW_Group.moveGroup( this.RRUW_Group);
              shape.RLBW_Group.moveGroup(this.RLBW_Group);
              shape.RRBW_Group.moveGroup(this.RRBW_Group);
        
              shape.RLUH_Group.moveGroup(this.RLUH_Group);
              shape.RLBH_Group.moveGroup(this.RLBH_Group);
              shape.RRUH_Group.moveGroup(this.RRUH_Group);
              shape.RRBH_Group.moveGroup(this.RRBH_Group);

              //  == = = = = leftOutage
              shape.LLL_E_dot_Line_1.drawPath(this.LLL_E_dot_Line_1)
              shape.LLL_E_dot_Line_2.drawPath(this.LLL_E_dot_Line_2)
              shape.L_Elbow_1.drawPath(this.L_Elbow_1)
              shape.L_Elbow_2.drawPath(this.L_Elbow_2)
   
              //  == = = = = leftOutage
              shape.RLL_E_dot_Line_1.drawPath(this.RLL_E_dot_Line_1)
              shape.RLL_E_dot_Line_2.drawPath(this.RLL_E_dot_Line_2)
              shape.R_Elbow_1.drawPath(this.R_Elbow_1)
              shape.R_Elbow_2.drawPath(this.R_Elbow_2)

              //  = = = notch
              shape.extra_p1.drawPath(this.extra_p1)
              shape.extra_p2.drawPath(this.extra_p2)
              shape.extra_p3.drawPath(this.extra_p3)
              shape.extra_p4.drawPath(this.extra_p4)
              shape.extra_p5.drawPath(this.extra_p5)
              shape.extra_p6.drawPath(this.extra_p6)
              shape.extra_p7.drawPath(this.extra_p7)
              shape.extra_p8.drawPath(this.extra_p8)

              //  = = =  = = = Joints
              shape.BULine.drawPath(this.BULine)
              shape.BLLine.drawPath(this.BLLine)
              shape.BDLine.drawPath(this.BDLine)
              shape.BRLine.drawPath(this.BRLine)

              shape.LM_dot.drawPath(this.LM_dot)
              shape.RM_dot.drawPath(this.RM_dot)


              //  = = = = = = =Hole = = = =
            
              // single
              shape.singleCircle.moveCircle(this.singleCircle)
            
              shape.SL_upArrowline.drawPath(this.SL_upArrowline)
              shape.SL_ulArrowP.drawPath(this.SL_ulArrowP)
              shape.SL_ulTip.drawArrow(this.SL_ulTip) 
              shape.SL_urTip.drawArrow(this.SL_urTip) 
              shape.SW_group.moveGroup(this.SW_group);

              shape.SU_lArrowline.drawPath(this.SU_lArrowline)
              shape.SU_lfupArrowP.drawPath(this.SU_lfupArrowP)
              shape.SU_lfupTip.drawArrow(this.SU_lfupTip) 
              shape.SU_lfdownTip.drawArrow(this.SU_lfdownTip) 
              shape.SH_group.moveGroup(this.SH_group);

              shape.circleDiameter.moveletter(this.circleDiameter)

              // double
              shape.doubleCircle.moveCircle(this.doubleCircle)

              shape.SDL_upArrowline.drawPath(this.SDL_upArrowline)
              shape.SDL_ulArrowP.drawPath(this.SDL_ulArrowP)
              shape.SDL_ulTip.drawArrow(this.SDL_ulTip) 
              shape.SDL_urTip.drawArrow(this.SDL_urTip) 
              shape.SDW_group.moveGroup(this.SDW_group);

              shape.SDU_lArrowline.drawPath(this.SDU_lArrowline)
              shape.SDU_lfupArrowP.drawPath(this.SDU_lfupArrowP)
              shape.SDU_lfupTip.drawArrow(this.SDU_lfupTip) 
              shape.SDU_lfdownTip.drawArrow(this.SDU_lfdownTip) 
              shape.SDH_group.moveGroup(this.SDH_group);

              //  = = = == U nortch = = = = = = 
              shape.UNcircle.moveCircle(this.UNcircle)
              shape.UNrect.moveRect(this.UNrect)
              // shape.UN_upline.drawPath(this.UN_upline)
              // shape.UN_downline.drawPath(this.UN_downline)
      }
    }


    // = = = = = = = = = = = drawers = = = = = = = = = = =
    function simplePanel() {

        this.Handle = "simplePanel";

        this.draw = function (context) {
          var ele = new definitionObject();
          var b = new initDraw(context);
          b.upline_pos =  [{x:ele.upLine.getPosition()[0].x, y:ele.upLine.getPosition()[0].y},  {x:ele.upLine.getPosition()[1].x + b.widthDifference, y:ele.upLine.getPosition()[1].y},]
          b.downline_pos =  [{x:ele.downLine.getPosition()[0].x, y:ele.downLine.getPosition()[0].y},  {x:ele.downLine.getPosition()[1].x+ b.widthDifference, y:ele.downLine.getPosition()[1].y},]
          b.leftline_pos =  [{x:ele.leftLine.getPosition()[0].x, y:ele.leftLine.getPosition()[0].y}, {x:ele.leftLine.getPosition()[1].x, y:ele.leftLine.getPosition()[1].y},]
          b.rightline_pos =  [{x:ele.rightLine.getPosition()[0].x+ b.widthDifference, y:ele.rightLine.getPosition()[0].y},{x:ele.rightLine.getPosition()[1].x+ b.widthDifference, y:ele.rightLine.getPosition()[1].y},]
        
          b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},]
          b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
          b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
          b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
          b.urTip_pos = {x:b.upline_pos[1].x, y:165};

          b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
          b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
          b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
          b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
          b.drTip_pos = {x:b.downline_pos[1].x, y:935};

          b.rArrowline_pos =  [{x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y},  {x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y},]
          b.rgupArrowP_pos = [{x:b.rightline_pos[0].x-10+77, y:b.rightline_pos[0].y}, {x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[0].y}]
          b.rgdownArrowP_pos = [{x:b.rightline_pos[1].x-10+77, y:b.rightline_pos[1].y},{x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[1].y}]
          b.rgupTip_pos = {x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y};
          b.rgdownTip_pos ={x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y};


          b.lArrowline_pos =  [{x:52, y:b.leftline_pos[0].y},  {x:52, y:b.leftline_pos[1].y},]
          b.lfupArrowP_pos = [{x:40 , y:b.leftline_pos[0].y}, {x:65, y:b.leftline_pos[0].y}]
          b.lfdownArrowP_pos = [{x:40, y:b.leftline_pos[1].y},{x:65, y:b.leftline_pos[1].y}]
          b.lfupTip_pos = {x:52, y:b.leftline_pos[0].y};
          b.lfdownTip_pos ={x:52, y:b.leftline_pos[1].y};
        
         
          b.upletter = {x:ele.upmainGroup.getPosition().x+b.widthDifference/2,y:ele.upmainGroup.getPosition().y}
          b.downletter.x = ele.upmainGroup.getPosition().x+b.widthDifference/2;
          b.rightletter.x = ele.rightmainGroup.getPosition().x + b.widthDifference


          b.ruRectmove = {x:ele.ruRect.getPosition().x + b.widthDifference, y:ele.ruRect.getPosition().y};
          b.rbRectmove = {x:ele.rbRect.getPosition().x + b.widthDifference, y:ele.rbRect.getPosition().y};
          b.luRectmove = {x:ele.luRect.getPosition().x, y:ele.luRect.getPosition().y};
          b.lbRectmove = {x:ele.lbRect.getPosition().x, y:ele.lbRect.getPosition().y};

          b.BULine =  [{x:ele.BULine.getPosition()[0].x,y:ele.BULine.getPosition()[0].y},{x:ele.BULine.getPosition()[1].x+b.widthDifference,y:ele.BULine.getPosition()[1].y}]

          b.BLLine =  [{x:ele.BLLine.getPosition()[0].x,y:ele.BLLine.getPosition()[0].y},{x:ele.BLLine.getPosition()[1].x,y:ele.BLLine.getPosition()[1].y}]
       
          b.BRLine =  [{x:ele.BRLine.getPosition()[0].x+b.widthDifference,y:45},{x:ele.BRLine.getPosition()[1].x+b.widthDifference,y:75}]
       
          b.BDLine = [{x:ele.BDLine.getPosition()[0].x,y:ele.BDLine.getPosition()[0].y},{x:ele.BDLine.getPosition()[1].x+b.widthDifference,y:ele.BDLine.getPosition()[1].y}]
       
       
          b.draw();
        };

        this.convertToPNG = function () {
          var d = new Date();
          function download(
              filename, // string
              blob // Blob
            ) {
              if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, filename);
              } else {
                const elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = filename;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
              }
            }
            
            var svg = document.querySelector('svg');
            var data = (new XMLSerializer()).serializeToString(svg);
            var canvas = document.createElement('canvas');
          
            canvg(canvas, data, {
              renderCallback: function () {
                canvas.toBlob(function (blob) {
                    download(`${d.getDate()}day-${d.getHours()}hour/${d.getMinutes()}min.png`, blob);
                });
              }
            });
          return "";
        };

        this.cleanUp = function () {
        };

        this.reset = function () {

        };
    }

    function corner() {

      this.Handle = "corner";

      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'corner';
     })
       this.parameter = simpleParameter[0]
 

        this.c_luWidth = this.parameter.value[0].width;
        if(this.c_luWidth) {
          this.c_luWidth=(this.c_luWidth>10)?this.c_luWidth:10;
          
        }
        this.c_luHeight = this.parameter.value[0].height;
        if(this.c_luHeight) {
          this.c_luHeight = (this.c_luHeight>10)?this.c_luHeight:10;
        }

        this.c_ruWidth = this.parameter.value[1].width;
        if(this.c_ruWidth) {
          this.c_ruWidth = (this.c_ruWidth>10)?this.c_ruWidth:10;
        }

        this.c_ruHeight = this.parameter.value[1].height;
        if(this.c_ruHeight) {
          this.c_ruHeight =  (this.c_ruHeight>10)?this.c_ruHeight:10;
        }

        this.c_lbWidth = this.parameter.value[2].width;
        if(this.c_lbWidth) {
          this.c_lbWidth = (this.c_lbWidth>10)?this.c_lbWidth:10;
        }
        this.c_lbHeight = this.parameter.value[2].height;
        if(this.c_lbHeight) {
          this.c_lbHeight =  (this.c_lbHeight>10)?this.c_lbHeight:10;
        }

        this.c_rbWidth = this.parameter.value[3].width;
        if(this.c_rbWidth) {
          this.c_rbWidth = (this.c_rbWidth>10)?this.c_rbWidth:10;
        }

        this.c_rbHeight = this.parameter.value[3].height;
        if(this.c_rbHeight) {
          this.c_rbHeight = (this.c_rbHeight>10)?this.c_rbHeight:10;
        }

        this.dis_c_luWidth = this.parameter.value[0].width
        this.dis_c_luHeight = this.parameter.value[0].height;
        this.dis_c_ruWidth = this.parameter.value[1].width;
        this.dis_c_ruHeight = this.parameter.value[1].height;
        this.dis_c_lbWidth = this.parameter.value[2].width;
        this.dis_c_lbHeight = this.parameter.value[2].height;
        this.dis_c_rbWidth = this.parameter.value[3].width;
        this.dis_c_rbHeight = this.parameter.value[3].height;
       

        var b = new initDraw(context);
        var ele = new definitionObject();

        // letter
        b.downletter = {x:ele.downmainGroup.getPosition().x +(this.c_lbWidth-this.c_rbWidth)*10*b.rate/2,y:ele.downmainGroup.getPosition().y}
        b.upletter = {x:ele.upmainGroup.getPosition().x + (this.c_luWidth - this.c_ruWidth ) *10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
        b.leftletter = {x:ele.leftmainGroup.getPosition().x,  y:ele.leftmainGroup.getPosition().y + (this.c_luHeight - this.c_lbHeight)*10*b.rate/2}
        b.rightletter = {x:ele.rightmainGroup.getPosition().x , y:ele.rightmainGroup.getPosition().y+ (this.c_ruHeight - this.c_rbHeight)*10*b.rate/2}

        // mainline
        b.upline_pos =  [{x: ele.upLine.getPosition()[0].x + 10* this.c_luWidth * b.rate , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x -  10 * this.c_ruWidth * b.rate, y:ele.upLine.getPosition()[1].y},]
        b.downline_pos =  [{x:ele.downLine.getPosition()[0].x + 10 * b.rate * this.c_lbWidth, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * this.c_rbWidth * b.rate, y:ele.downLine.getPosition()[1].y},]
        b.leftline_pos =  [ {x:ele.leftLine.getPosition()[0].x, y:ele.leftLine.getPosition()[0].y + 10 * b.rate * this.c_luHeight}, {x:ele.leftLine.getPosition()[1].x, y:ele.leftLine.getPosition()[1].y - 10 * b.rate * this.c_lbHeight},]
        b.rightline_pos = [{x:ele.rightLine.getPosition()[0].x, y:ele.rightLine.getPosition()[0].y + 10 * b.rate * this.c_ruHeight},{x:ele.rightLine.getPosition()[1].x, y: ele.rightLine.getPosition()[1].y - 10 * b.rate * this.c_rbHeight},]
   
        //  arrow
        b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
        b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
        b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
        b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
        b.urTip_pos = {x:b.upline_pos[1].x, y:165};

        b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
        b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
        b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
        b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
        b.drTip_pos = {x:b.downline_pos[1].x, y:935};
        
        b.rArrowline_pos =  [{x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y},  {x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y},]
        b.rgupArrowP_pos = [{x:b.rightline_pos[0].x-10+77, y:b.rightline_pos[0].y}, {x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[0].y}]
        b.rgdownArrowP_pos = [{x:b.rightline_pos[1].x-10+77, y:b.rightline_pos[1].y},{x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[1].y}]
        b.rgupTip_pos = {x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y};
        b.rgdownTip_pos ={x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y};

        b.lArrowline_pos =  [{x:52, y:b.leftline_pos[0].y},  {x:52, y:b.leftline_pos[1].y},]
        b.lfupArrowP_pos = [{x:40 , y:b.leftline_pos[0].y}, {x:65, y:b.leftline_pos[0].y}]
        b.lfdownArrowP_pos = [{x:40, y:b.leftline_pos[1].y},{x:65, y:b.leftline_pos[1].y}]
        b.lfupTip_pos = {x:52, y:b.leftline_pos[0].y};
        b.lfdownTip_pos ={x:52, y:b.leftline_pos[1].y};


    // corner line && arrow

        if(this.dis_c_luWidth || this.dis_c_luHeight) {
         
          b.luRectmove = b.initSignle_pos;
         
          b.CL_upArrowline = [{x: 163, y:165}, {x:b.upline_pos[0].x , y:165},]
          b.CL_ulArrowP = [{x:163, y:175}, {x:163, y:155},]
          b.CL_ulTip = {x:163, y:165}
          b.CL_urTip = {x:b.upline_pos[0].x, y:165};
              
          b.CU_lArrowline =[{x:52, y:195}, {x:52, y:b.leftline_pos[0].y},]
          b.CU_lfupArrowP =[{x:40, y:195}, {x:65, y:195},]
          b.CU_lfupTip = {x:52, y:195}
          b.CU_lfdownTip = {x:52, y:b.leftline_pos[0].y}

          b.CLUW_Group = {x:135 + 10 * b.rate/2 * this.c_luWidth , y:145}
          b.CLUH_Group = {x:32 , y:20 + 10 *b.rate*this.c_luHeight/2}

          if(this.dis_c_luWidth.n%this.dis_c_luWidth.d == 0) {
            ele.C_LUW_Letter.changeletter('' + parseInt(this.dis_c_luWidth.n/this.dis_c_luWidth.d));
            } else {
            ele.C_LUW_Letter.changeletter(''+parseInt(this.dis_c_luWidth.n/this.dis_c_luWidth.d)+ '-'+this.dis_c_luWidth.n%this.dis_c_luWidth.d + '/' + this.dis_c_luWidth.d);
          }

          if(this.dis_c_luHeight.n%this.dis_c_luHeight.d == 0) {
            ele.C_LUH_Letter.changeletter('' + parseInt(this.dis_c_luHeight.n/this.dis_c_luHeight.d));
            } else {
            ele.C_LUH_Letter.changeletter(''+parseInt(this.dis_c_luHeight.n/this.dis_c_luHeight.d)+ '-'+this.dis_c_luHeight.n%this.dis_c_luHeight.d + '/' + this.dis_c_luHeight.d);
          }

          this.cl_uline =  [{x:b.upline_pos[0].x, y:195},{x:163, y:b.leftline_pos[0].y},]
         
          ele.CL_uline.drawPath(this.cl_uline);
         
        }

        if(this.dis_c_ruWidth || this.dis_c_ruHeight) {

          b.ruRectmove = b.initSignle_pos;
          b.CR_upArrowline =  [{x:b.upline_pos[1].x, y:165}, {x:443 + b.widthDifference, y:165},]
          b.CR_ulArrowP = [{x:443 + b.widthDifference, y:175}, {x:443 + b.widthDifference, y:155},]
          b.CR_ulTip = {x:b.upline_pos[1].x, y:165}
          b.CR_urTip = {x:443 + b.widthDifference , y:165}


          b.CU_rArrowline =[{x:b.rArrowline_pos[0].x, y:195}, {x:b.rArrowline_pos[1].x, y:b.rightline_pos[0].y},]
          b.CU_rgupArrowP = [{x:b.rArrowline_pos[0].x-10, y:195}, {x:b.rArrowline_pos[0].x+10, y:195},]
          b.CU_rgupTip = {x:b.rArrowline_pos[0].x, y:195}
          b.CU_rgdownTip = {x:b.rArrowline_pos[0].x, y:b.rightline_pos[0].y}
      
          
          b.CRUW_Group = {x:415 + b.widthDifference - 10 * this.c_ruWidth * b.rate/2 , y:145}
          b.CRUH_Group = {x:500 + b.widthDifference , y:23 + 10 * b.rate * this.c_ruHeight / 2}

          if(this.dis_c_ruWidth.n%this.dis_c_ruWidth.d == 0) {
            ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_c_ruWidth.n/this.dis_c_ruWidth.d));
            } else {
            ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_c_ruWidth.n/this.dis_c_ruWidth.d)+ '-'+this.dis_c_ruWidth.n%this.dis_c_ruWidth.d + '/' + this.dis_c_ruWidth.d);
          }

          if(this.dis_c_ruHeight.n%this.dis_c_ruHeight.d == 0) {
            ele.C_RUH_Letter.changeletter('' + parseInt(this.dis_c_ruHeight.n/this.dis_c_ruHeight.d));
            } else {
            ele.C_RUH_Letter.changeletter(''+parseInt(this.dis_c_ruHeight.n/this.dis_c_ruHeight.d)+ '-'+this.dis_c_ruHeight.n%this.dis_c_ruHeight.d + '/' + this.dis_c_ruHeight.d);
          }
  
          this.cr_uline = [{x:b.upline_pos[1].x, y:195},{x:443 + b.widthDifference, y:b.rightline_pos[0].y},]
          ele.CR_uline.drawPath(this.cr_uline);

        }


        if(this.dis_c_lbWidth || this.dis_c_lbHeight) {
          b.lbRectmove = b.initSignle_pos;

          b.CD_lArrowline = [{x:52, y:905}, {x:52, y:b.leftline_pos[1].y},]
          b.CD_lfdownArrowP =[{x:40, y:905}, {x:65, y:905},]
          b.CD_lfupTip = {x:52, y:b.leftline_pos[1].y}
          b.CD_lfdownTip = {x:52, y:905}

          b.CL_downArrowline = [{x:163, y:935}, {x:b.downline_pos[0].x, y:935},]
          b.CL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
          b.CL_dlTip = {x:163, y:935}
          b.CL_drTip = {x:b.downline_pos[0].x, y:935}

          
          b.CLBW_Group = {x:135 + 10*b.rate*this.c_lbWidth/2 , y:918}
          b.CLBH_Group = {x:32 , y:731 - 10 * b.rate * this.c_lbHeight/2}

          if(this.dis_c_lbWidth.n%this.dis_c_lbWidth.d == 0) {
            ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_c_lbWidth.n/this.dis_c_lbWidth.d));
            } else {
            ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_c_lbWidth.n/this.dis_c_lbWidth.d)+ '-'+this.dis_c_lbWidth.n%this.dis_c_lbWidth.d + '/' + this.dis_c_lbWidth.d);
          }

          if(this.dis_c_lbHeight.n%this.dis_c_lbHeight.d == 0) {
            ele.C_LBH_letter.changeletter('' + parseInt(this.dis_c_lbHeight.n/this.dis_c_lbHeight.d));
            } else {
            ele.C_LBH_letter.changeletter(''+parseInt(this.dis_c_lbHeight.n/this.dis_c_lbHeight.d)+ '-'+this.dis_c_lbHeight.n%this.dis_c_lbHeight.d + '/' + this.dis_c_lbHeight.d);
          }
            this.cl_dline = [{x:163, y:b.leftline_pos[1].y},{x:b.downline_pos[0].x, y:905}]
            ele.CL_dline.drawPath(this.cl_dline);
        }


        if(this.dis_c_rbWidth || this.dis_c_rbHeight) {
          b.rbRectmove = b.initSignle_pos;

          b.CR_downArrowline = [{x:b.downline_pos[1].x, y:935}, {x:443 + b.widthDifference, y:935},]
          b.CR_dlArrowP = [{x:443 + b.widthDifference, y:945}, {x:443 + b.widthDifference, y:925},]
          b.CR_dlTip ={x:b.downline_pos[1].x, y:935}
          b.CR_drTip = {x:443 + b.widthDifference, y:935}
         
          b.CD_rArrowline = [{x:520 + b.widthDifference, y:905}, {x:520 + b.widthDifference, y:b.rightline_pos[1].y},]
          b.CD_rgdownArrowP = [{x:510 + b.widthDifference, y:905}, {x:530 + b.widthDifference, y:905},]
          b.CD_rgupTip = {x:520 + b.widthDifference, y:b.rightline_pos[1].y}
          b.CD_rgdownTip = {x:520 + b.widthDifference, y:905}
          b.CRBW_Group = {x:415 + b.widthDifference -10*this.c_rbWidth/2*b.rate, y:915}
          b.CRBH_Group = {x:500 + b.widthDifference , y:731-10*b.rate*this.c_rbHeight/2}

          if(this.dis_c_rbWidth.n%this.dis_c_rbWidth.d == 0) {
            ele.C_RBW_Letter.changeletter('' + parseInt(this.dis_c_rbWidth.n/this.dis_c_rbWidth.d));
            } else {
            ele.C_RBW_Letter.changeletter(''+parseInt(this.dis_c_rbWidth.n/this.dis_c_rbWidth.d)+ '-'+this.dis_c_rbWidth.n%this.dis_c_rbWidth.d + '/' + this.dis_c_rbWidth.d);
          }

          if(this.dis_c_rbHeight.n%this.dis_c_rbHeight.d == 0) {
            ele.C_RBH_Letter.changeletter('' + parseInt(this.dis_c_rbHeight.n/this.dis_c_rbHeight.d));
            } else {
            ele.C_RBH_Letter.changeletter(''+parseInt(this.dis_c_rbHeight.n/this.dis_c_rbHeight.d)+ '-'+this.dis_c_rbHeight.n%this.dis_c_rbHeight.d + '/' + this.dis_c_rbHeight.d);
          }

          
        this.cr_dline = [{x:443 + b.widthDifference, y:b.rightline_pos[1].y},{x:b.downline_pos[1].x, y:905},]
        ele.CR_dline.drawPath(this.cr_dline);
          
        }

        b.dis_upWidth =  math.subtract(ele.up_Widthletter.returnValue(),(this.dis_c_luWidth+this.dis_c_ruWidth))
        b.dis_downWidth =  math.subtract(ele.down_Widthletter.returnValue(),(this.dis_c_lbWidth+this.dis_c_rbWidth))
        b.dis_leftHeight = math.subtract(ele.left_Heightletter.returnValue(),(this.dis_c_luHeight+this.dis_c_lbHeight))
        b.dis_rightHeight = math.subtract(ele.right_Heightletter.returnValue(),(this.dis_c_ruHeight+this.dis_c_rbHeight))
        b.draw();

      }
    }

    function radius() {
      this.Handle = "radius"

      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'radius';
        })
        this.parameter = simpleParameter[0]
 

        this.r_luWidth = this.parameter.value[0].width;
        if(this.r_luWidth) {
          this.r_luWidth=(this.r_luWidth>10)?this.r_luWidth:10;
        }
        
        this.r_luHeight = this.parameter.value[0].height;
        if(this.r_luHeight) {
          this.r_luHeight = (this.r_luHeight>10)?this.r_luHeight:10;
        }

        this.r_ruWidth = this.parameter.value[1].width;
        if(this.r_ruWidth) {
          this.r_ruWidth = (this.r_ruWidth>10)?this.r_ruWidth:10;
        }

        this.r_ruHeight = this.parameter.value[1].height;
        if(this.r_ruHeight) {
          this.r_ruHeight =  (this.r_ruHeight>10)?this.r_ruHeight:10;
        }

        this.r_lbWidth = this.parameter.value[2].width;
        if(this.r_lbWidth) {
          this.r_lbWidth = (this.r_lbWidth>10)?this.r_lbWidth:10;
        }
        this.r_lbHeight = this.parameter.value[2].height;
        if(this.r_lbHeight) {
          this.r_lbHeight =  (this.r_lbHeight>10)?this.r_lbHeight:10;
        }

        this.r_rbWidth = this.parameter.value[3].width;
        if(this.r_rbWidth) {
          this.r_rbWidth = (this.r_rbWidth>10)?this.r_rbWidth:10;
        }

        this.r_rbHeight = this.parameter.value[3].height;
        if(this.r_rbHeight) {
          this.r_rbHeight = (this.r_rbHeight>10)?this.r_rbHeight:10;
        }


        this.dis_r_luWidth = this.parameter.value[0].width
        this.dis_r_luHeight = this.parameter.value[0].height;
        this.dis_r_ruWidth = this.parameter.value[1].width;
        this.dis_r_ruHeight = this.parameter.value[1].height;
        this.dis_r_lbWidth = this.parameter.value[2].width;
        this.dis_r_lbHeight = this.parameter.value[2].height;
        this.dis_r_rbWidth = this.parameter.value[3].width;
        this.dis_r_rbHeight = this.parameter.value[3].height;
       


        var b = new initDraw(context);
        var ele = new definitionObject();
        // letter
        b.downletter = {x:ele.downmainGroup.getPosition().x +(this.r_lbWidth-this.r_rbWidth)*10*b.rate/2,y:ele.downmainGroup.getPosition().y}
        b.upletter = {x:ele.upmainGroup.getPosition().x + (this.r_luWidth - this.r_ruWidth ) *10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
        b.leftletter = {x:ele.leftmainGroup.getPosition().x,  y:ele.leftmainGroup.getPosition().y + (this.r_luHeight - this.r_lbHeight)*10*b.rate/2}
        b.rightletter = {x:ele.rightmainGroup.getPosition().x , y:ele.rightmainGroup.getPosition().y+ (this.r_ruHeight - this.r_rbHeight)*10*b.rate/2}
        
        // mainline
        b.upline_pos =  [{x: ele.upLine.getPosition()[0].x + 10* this.r_luWidth * b.rate , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x -  10 * this.r_ruWidth * b.rate, y:ele.upLine.getPosition()[1].y},]
        b.downline_pos =  [{x:ele.downLine.getPosition()[0].x + 10 * b.rate * this.r_lbWidth, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * this.r_rbWidth * b.rate, y:ele.downLine.getPosition()[1].y},]
        b.leftline_pos =  [ {x:ele.leftLine.getPosition()[0].x, y:ele.leftLine.getPosition()[0].y + 10 * b.rate * this.r_luHeight}, {x:ele.leftLine.getPosition()[1].x, y:ele.leftLine.getPosition()[1].y - 10 * b.rate * this.r_lbHeight},]
        b.rightline_pos = [{x:ele.rightLine.getPosition()[0].x, y:ele.rightLine.getPosition()[0].y + 10 * b.rate * this.r_ruHeight},{x:ele.rightLine.getPosition()[1].x, y: ele.rightLine.getPosition()[1].y - 10 * b.rate * this.r_rbHeight},]
       
      //  arrow
        b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
        b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
        b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
        b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
        b.urTip_pos = {x:b.upline_pos[1].x, y:165};

        b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
        b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
        b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
        b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
        b.drTip_pos = {x:b.downline_pos[1].x, y:935};

        
        b.rArrowline_pos =  [{x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y},  {x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y},]
        b.rgupArrowP_pos = [{x:b.rightline_pos[0].x-10+77, y:b.rightline_pos[0].y}, {x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[0].y}]
        b.rgdownArrowP_pos = [{x:b.rightline_pos[1].x-10+77, y:b.rightline_pos[1].y},{x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[1].y}]
        b.rgupTip_pos = {x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y};
        b.rgdownTip_pos ={x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y};

        b.lArrowline_pos =  [{x:52, y:b.leftline_pos[0].y},  {x:52, y:b.leftline_pos[1].y},]
        b.lfupArrowP_pos = [{x:40 , y:b.leftline_pos[0].y}, {x:65, y:b.leftline_pos[0].y}]
        b.lfdownArrowP_pos = [{x:40, y:b.leftline_pos[1].y},{x:65, y:b.leftline_pos[1].y}]
        b.lfupTip_pos = {x:52, y:b.leftline_pos[0].y};
        b.lfdownTip_pos ={x:52, y:b.leftline_pos[1].y};

    // radius line && arrow
        if(this.dis_r_luWidth || this.dis_r_luHeight) {
          b.luRectmove = b.initSignle_pos;
          b.RL_upArrowline = [{x: 163, y:165}, {x:b.upline_pos[0].x , y:165},]
          b.RL_ulArrowP = [{x:163, y:175}, {x:163, y:155},]
          b.RL_ulTip = {x:163, y:165}
          b.RL_urTip = {x:b.upline_pos[0].x, y:165};
              
          b.RU_lArrowline =[{x:52, y:195}, {x:52, y:b.leftline_pos[0].y},]
          b.RU_lfupArrowP =[{x:40, y:195}, {x:65, y:195},]
          b.RU_lfupTip = {x:52, y:195}
          b.RU_lfdownTip = {x:52, y:b.leftline_pos[0].y}

          b.RLUW_Group = {x:135 + 10 * b.rate/2 * this.r_luWidth , y:145}
          b.RLUH_Group = {x:32 , y:20 + 10 *b.rate*this.r_luHeight/2}

          if(this.dis_r_luWidth.n%this.dis_r_luWidth.d == 0) {
            ele.R_LUW_Letter.changeletter('' + parseInt(this.dis_r_luWidth.n/this.dis_r_luWidth.d));
            } else {
            ele.R_LUW_Letter.changeletter(''+parseInt(this.dis_r_luWidth.n/this.dis_r_luWidth.d)+ '-'+this.dis_r_luWidth.n%this.dis_r_luWidth.d + '/' + this.dis_r_luWidth.d);
          }

          if(this.dis_r_luHeight.n%this.dis_r_luHeight.d == 0) {
            ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_r_luHeight.n/this.dis_r_luHeight.d));
            } else {
            ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_r_luHeight.n/this.dis_r_luHeight.d)+ '-'+this.dis_r_luHeight.n%this.dis_r_luHeight.d + '/' + this.dis_r_luHeight.d);
          }

          //curve
          this.rl_u =  [{x:b.leftline_pos[0].x, y:b.leftline_pos[0].y},{x:163 + 10*this.r_luWidth*b.rate/4, y:195+10*b.rate*this.r_luHeight/4},{x:b.upline_pos[0].x, y:b.upline_pos[0].y}]

          ele.RL_u.drawCurve(this.rl_u)

        }

        if(this.dis_r_ruWidth || this.dis_r_ruHeight) {
          b.ruRectmove = b.initSignle_pos;
         
          b.RR_upArrowline =  [{x:b.upline_pos[1].x, y:165}, {x:443 + b.widthDifference, y:165},]
          b.RR_ulArrowP = [{x:443 + b.widthDifference, y:175}, {x:443 + b.widthDifference, y:155},]
          b.RR_ulTip = {x:b.upline_pos[1].x, y:165}
          b.RR_urTip = {x:443 + b.widthDifference , y:165}


          b.RU_rArrowline =[{x:520 + b.widthDifference, y:195}, {x:520 + b.widthDifference, y:b.rightline_pos[0].y},]
          b.RU_rgupArrowP = [{x:510 + b.widthDifference, y:195}, {x:530 + b.widthDifference, y:195},]
          b.RU_rgupTip = {x:520 + b.widthDifference, y:195}
          b.RU_rgdownTip = {x:520 + b.widthDifference, y:b.rightline_pos[0].y}
      
          
          b.RRUW_Group = {x:415 + b.widthDifference - 10 * this.r_ruWidth * b.rate/2 , y:145}
          b.RRUH_Group = {x:500 + b.widthDifference , y:23 + 10 * b.rate * this.r_ruHeight / 2}

          if(this.dis_r_ruWidth.n%this.dis_r_ruWidth.d == 0) {
            ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_r_ruWidth.n/this.dis_r_ruWidth.d));
            } else {
            ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_r_ruWidth.n/this.dis_r_ruWidth.d)+ '-'+this.dis_r_ruWidth.n%this.dis_r_ruWidth.d + '/' + this.dis_r_ruWidth.d);

          }

          if(this.dis_r_ruHeight.n%this.dis_r_ruHeight.d == 0) {
            ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_r_ruHeight.n/this.dis_r_ruHeight.d));
            } else {
            ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_r_ruHeight.n/this.dis_r_ruHeight.d)+ '-'+this.dis_r_ruHeight.n%this.dis_r_ruHeight.d + '/' + this.dis_r_ruHeight.d);
          }
          this.rr_u = [{x:b.upline_pos[1].x, y:b.upline_pos[1].y},{x:443+b.widthDifference - 10*b.rate*this.r_ruWidth/4, y:195+10*b.rate*this.r_ruHeight/4},{x:b.rightline_pos[0].x, y:b.rightline_pos[0].y},]
          ele.RR_u.drawCurve(this.rr_u);

         
        }

        if(this.dis_r_lbWidth || this.dis_r_lbHeight) {
          b.lbRectmove = b.initSignle_pos;

          b.RD_lArrowline = [{x:52, y:905}, {x:52, y:b.leftline_pos[1].y},]
          b.RD_lfdownArrowP =[{x:40, y:905}, {x:65, y:905},]
          b.RD_lfupTip = {x:52, y:b.leftline_pos[1].y}
          b.RD_lfdownTip = {x:52, y:905}

          b.RL_downArrowline = [{x:163, y:935}, {x:b.downline_pos[0].x, y:935},]
          b.RL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
          b.RL_dlTip = {x:163, y:935}
          b.RL_drTip = {x:b.downline_pos[0].x, y:935}

          
          b.RLBW_Group = {x:135 + 10*b.rate*this.r_lbWidth/2 , y:918}
          b.RLBH_Group = {x:32 , y:731 - 10 * b.rate * this.r_lbHeight/2}

          if(this.dis_r_lbWidth.n%this.dis_r_lbWidth.d == 0) {
            ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_r_lbWidth.n/this.dis_r_lbWidth.d));
            } else {
            ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_r_lbWidth.n/this.dis_r_lbWidth.d)+ '-'+this.dis_r_lbWidth.n%this.dis_r_lbWidth.d + '/' + this.dis_r_lbWidth.d);
          }

          if(this.dis_r_lbHeight.n%this.dis_r_lbHeight.d == 0) {
            ele.R_LBH_letter.changeletter('' + parseInt(this.dis_r_lbHeight.n/this.dis_r_lbHeight.d));
            } else {
            ele.R_LBH_letter.changeletter(''+parseInt(this.dis_r_lbHeight.n/this.dis_r_lbHeight.d)+ '-'+this.dis_r_lbHeight.n%this.dis_r_lbHeight.d + '/' + this.dis_r_lbHeight.d);
          }

           this.rl_d = [{x:b.leftline_pos[1].x, y:b.leftline_pos[1].y},{x:163+this.r_lbWidth*10*b.rate/4, y:905-10*b.rate*this.r_lbHeight/4},{x:b.downline_pos[0].x, y:b.downline_pos[0].y}]
           ele.RL_d.drawCurve(this.rl_d);


          }

        if(this.dis_r_rbWidth || this.dis_r_rbHeight) {
          b.rbRectmove = b.initSignle_pos;

          b.RR_downArrowline = [{x:b.downline_pos[1].x, y:935}, {x:443 + b.widthDifference, y:935},]
          b.RR_dlArrowP = [{x:443 + b.widthDifference, y:945}, {x:443 + b.widthDifference, y:925},]
          b.RR_dlTip ={x:b.downline_pos[1].x, y:935}
          b.RR_drTip = {x:443 + b.widthDifference, y:935}
         
          b.RD_rArrowline = [{x:520 + b.widthDifference, y:905}, {x:520 + b.widthDifference, y:b.rightline_pos[1].y},]
          b.RD_rgdownArrowP = [{x:510 + b.widthDifference, y:905}, {x:530 + b.widthDifference, y:905},]
          b.RD_rgupTip = {x:520 + b.widthDifference, y:b.rightline_pos[1].y}
          b.RD_rgdownTip = {x:520 + b.widthDifference, y:905}

          b.RRBW_Group = {x:415 + b.widthDifference -10*this.r_rbWidth/2*b.rate, y:915}
          b.RRBH_Group = {x:500 + b.widthDifference , y:731-10*b.rate*this.r_rbHeight/2}

          if(this.dis_r_rbWidth.n%this.dis_r_rbWidth.d == 0) {
            ele.R_RBW_Letter.changeletter('' + parseInt(this.dis_r_rbWidth.n/this.dis_r_rbWidth.d));
            } else {
            ele.R_RBW_Letter.changeletter(''+parseInt(this.dis_r_rbWidth.n/this.dis_r_rbWidth.d)+ '-'+this.dis_r_rbWidth.n%this.dis_r_rbWidth.d + '/' + this.dis_r_rbWidth.d);
          }

          if(this.dis_r_rbHeight.n%this.dis_r_rbHeight.d == 0) {
            ele.R_RBH_Letter.changeletter('' + parseInt(this.dis_r_rbHeight.n/this.dis_r_rbHeight.d));
            } else {
            ele.R_RBH_Letter.changeletter(''+parseInt(this.dis_r_rbHeight.n/this.dis_r_rbHeight.d)+ '-'+this.dis_r_rbHeight.n%this.dis_r_rbHeight.d + '/' + this.dis_r_rbHeight.d);
          }

          this.rr_d = [{x:b.rightline_pos[1].x, y:b.rightline_pos[1].y},{x:443+b.widthDifference-10*b.rate*this.r_rbWidth/4,y:905-10*b.rate*this.r_rbHeight/4},{x:b.downline_pos[1].x, y:b.downline_pos[1].y},]
          ele.RR_d.drawCurve(this.rr_d);
  
          
        }

        b.dis_upWidth =  math.subtract(ele.up_Widthletter.returnValue(),(this.dis_r_luWidth+this.dis_r_ruWidth))
        b.dis_downWidth =  math.subtract(ele.down_Widthletter.returnValue(),(this.dis_r_lbWidth+this.dis_r_rbWidth))
        b.dis_leftHeight = math.subtract(ele.left_Heightletter.returnValue(),(this.dis_r_luHeight+this.dis_r_lbHeight))
        b.dis_rightHeight = math.subtract(ele.right_Heightletter.returnValue(),(this.dis_r_ruHeight+this.dis_r_rbHeight))
        
        b.draw();

    
       
      }
    }

    function leftOutage() {

      this.Handle = "leftOutage";
      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'leftOutage';
        })
        this.parameter = simpleParameter[0]

        this.LL_TopLeft = this.parameter.value[0].topLeft;
        this.dis_LL_TopLeft = this.parameter.value[0].topLeft;
        if(this.LL_TopLeft) {
          this.LL_TopLeft=(this.LL_TopLeft>10)?this.LL_TopLeft:10;
        }

        this.LL_TopRight = this.parameter.value[0].topRight;
        this.dis_LL_TopRight = this.parameter.value[0].topRight;
        if(this.LL_TopRight) {
          this.LL_TopRight=(this.LL_TopRight>10)?this.LL_TopRight:10;
        }

        this.LLL_inputE_Width_1 = this.parameter.value[1].width1;
        this.dis_LLL_inputE_Width_1 = this.parameter.value[1].width1;
        if(this.LLL_inputE_Width_1) {
          this.LLL_inputE_Width_1=(this.LLL_inputE_Width_1>10)?this.LLL_inputE_Width_1:10;
        }

        this.LLL_inputE_Width_2 = this.parameter.value[1].width2;
        this.dis_LLL_inputE_Width_2 = this.parameter.value[1].width2;
        if(this.LLL_inputE_Width_2) {
          this.LLL_inputE_Width_2=(this.LLL_inputE_Width_2>10)?this.LLL_inputE_Width_2:10;
        }

        this.LLL_inputE_Height = this.parameter.value[1].height;
        this.dis_LLL_inputE_Height = this.parameter.value[1].height;
        if(this.LLL_inputE_Height) {
          this.LLL_inputE_Height=(this.LLL_inputE_Height>10)?this.LLL_inputE_Height:10;
        }

        this.LLR_inputE_Width_1 =  this.parameter.value[2].width1;
        this.dis_LLR_inputE_Width_1 =  this.parameter.value[2].width1;
        if(this.LLR_inputE_Width_1) {
          this.LLR_inputE_Width_1=(this.LLR_inputE_Width_1>10)?this.LLR_inputE_Width_1:10;
        }

        this.LLR_inputE_Width_2 = this.parameter.value[2].width2;
        this.dis_LLR_inputE_Width_2 = this.parameter.value[2].width2;
        if(this.LLR_inputE_Width_2) {
          this.LLR_inputE_Width_2=(this.LLR_inputE_Width_2>10)?this.LLR_inputE_Width_2:10;
        }

        this.LLR_inputE_Height = this.parameter.value[2].height;
        this.dis_LLR_inputE_Height = this.parameter.value[2].height;
        if(this.LLR_inputE_Height) {
          this.LLR_inputE_Height=(this.LLR_inputE_Height>10)?this.LLR_inputE_Height:10;
        }

        this.LRL_inputE_Width_1 =this.parameter.value[3].width1;
        this.dis_LRL_inputE_Width_1 =this.parameter.value[3].width1;
        if(this.LRL_inputE_Width_1) {
          this.LRL_inputE_Width_1=(this.LRL_inputE_Width_1>10)?this.LRL_inputE_Width_1:10;
        }

        this.LRL_inputE_Width_2 = this.parameter.value[3].width2;
        this.dis_LRL_inputE_Width_2 = this.parameter.value[3].width2;
        if(this.LRL_inputE_Width_2) {
          this.LRL_inputE_Width_2=(this.LRL_inputE_Width_2>10)?this.LRL_inputE_Width_2:10;
        }

        this.LRL_inputE_Height = this.parameter.value[3].height;
        this.dis_LRL_inputE_Height = this.parameter.value[3].height;
        if(this.LRL_inputE_Height) {
          this.LRL_inputE_Height=(this.LRL_inputE_Height>10)?this.LRL_inputE_Height:10;
        }

        this.LRR_inputE_Width_1 = this.parameter.value[4].width1;
        this.dis_LRR_inputE_Width_1 = this.parameter.value[4].width1;
        if(this.LRR_inputE_Width_1) {
          this.LRR_inputE_Width_1=(this.LRR_inputE_Width_1>10)?this.LRR_inputE_Width_1:10;
        }

        this.LRR_inputE_Width_2 = this.parameter.value[4].width2;
        this.dis_LRR_inputE_Width_2 = this.parameter.value[4].width2;
        if(this.LRR_inputE_Width_2) {
          this.LRR_inputE_Width_2=(this.LRR_inputE_Width_2>10)?this.LRR_inputE_Width_2:10;
        }
 
        this.LRR_inputE_Height =this.parameter.value[4].height;
        this.dis_LRR_inputE_Height =this.parameter.value[4].height;
        if(this.LRR_inputE_Height) {
          this.LRR_inputE_Height=(this.LRR_inputE_Height>10)?this.LRR_inputE_Height:10;
        }

        
        var b = new initDraw(context);
        var ele = new definitionObject();

        // signle
        if(this.LL_TopLeft) {
          // rect , leftLine,letter remove
          b.luRectmove = b.initSignle_pos;
          b.lbRectmove = b.initSignle_pos;
          b.leftline_pos = b.init2d_pos;
          // b.rightline_pos = b.init2d_pos;

          b.downline_pos =  [{x:ele.downLine.getPosition()[0].x + 10 * b.rate * this.LL_TopLeft, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x, y:ele.downLine.getPosition()[1].y},]
          b.downletter = {x:ele.downmainGroup.getPosition().x +this.LL_TopLeft*10*b.rate/2, y: ele.downmainGroup.getPosition().y}
          
          b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
          b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
          b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
          b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
          b.drTip_pos = {x:b.downline_pos[1].x, y:935};
        
          //  line
          this.cl_uline =  [{x:b.upline_pos[0].x, y:b.upline_pos[0].y},{x:b.downline_pos[0].x, y:b.downline_pos[0].y},]
          this.L_dot_Line = [{x:163,y:195},{x:163,y:905}]

          ele.L_dot_Line.drawPath(this.L_dot_Line)
          ele.CL_uline.drawPath(this.cl_uline);

          //  line
          b.CL_downArrowline = [{x:163, y:935}, {x:b.downline_pos[0].x, y:935},]
          b.CL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
          b.CL_dlTip = {x:163, y:935}
          b.CL_drTip = {x:b.downline_pos[0].x, y:935}
          b.CLBW_Group = {x:135 + 10*b.rate*this.LL_TopLeft/2 , y:918}

          if(this.dis_LL_TopLeft.n%this.dis_LL_TopLeft.d == 0) {
            ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LL_TopLeft.n/this.dis_LL_TopLeft.d));
            } else {
            ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LL_TopLeft.n/this.dis_LL_TopLeft.d)+ '-'+this.dis_LL_TopLeft.n%this.dis_LL_TopLeft.d + '/' + this.dis_LL_TopLeft.d);
          }

        } else if(this.LL_TopRight) {
          // rect , leftLine remove
          b.luRectmove = b.initSignle_pos;
          b.lbRectmove = b.initSignle_pos;
          b.leftline_pos = b.init2d_pos;  
        
          b.upline_pos =  [{x: ele.upLine.getPosition()[0].x + 10* this.LL_TopRight * b.rate , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x, y:ele.upLine.getPosition()[1].y},]
        
          b.upletter = {x:ele.upmainGroup.getPosition().x + this.LL_TopRight*10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
          b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
          b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
          b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
          b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
          b.urTip_pos = {x:b.upline_pos[1].x, y:165};
  

          //  line
          this.cl_dline = [{x:b.downline_pos[0].x, y:b.downline_pos[0].y},{x:b.upline_pos[0].x, y:b.upline_pos[0].y}]
          this.L_dot_Line = [{x:163,y:195},{x:163,y:905}]
          
          ele.L_dot_Line.drawPath(this.L_dot_Line)
          ele.CL_dline.drawPath(this.cl_dline);
          // letter
          b.CL_upArrowline = [{x: 163, y:165}, {x:b.upline_pos[0].x , y:165},]
          b.CL_ulArrowP = [{x:163, y:175}, {x:163, y:155},]
          b.CL_ulTip = {x:163, y:165}
          b.CL_urTip = {x:b.upline_pos[0].x, y:165};
          b.CLUW_Group = {x:135 + 10 * b.rate/2 * this.LL_TopRight , y:145}

          if(this.dis_LL_TopRight.n%this.dis_LL_TopRight.d == 0) {
            ele.C_LUW_Letter.changeletter('' + parseInt(this.dis_LL_TopRight.n/this.dis_LL_TopRight.d));
            } else {
            ele.C_LUW_Letter.changeletter(''+parseInt(this.dis_LL_TopRight.n/this.dis_LL_TopRight.d)+ '-'+this.dis_LL_TopRight.n%this.dis_LL_TopRight.d + '/' + this.dis_LL_TopRight.d);
          }
        }
        // elbow
        // *left-left elbow

        if(this.LLL_inputE_Width_1){

           // rect , leftLine,letter remove
          b.luRectmove = b.initSignle_pos;
          b.lbRectmove = b.initSignle_pos;
          b.leftline_pos = b.init2d_pos;
          // change
          b.downline_pos =  [{x:ele.downLine.getPosition()[0].x + (this.LLL_inputE_Width_1+this.LLL_inputE_Width_2)*b.rate*10,y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x,y:ele.downLine.getPosition()[1].y}]
          b.downletter = {x:ele.downmainGroup.getPosition().x + (this.LLL_inputE_Width_1+this.LLL_inputE_Width_2)*b.rate*10/2, y: ele.downmainGroup.getPosition().y}

          b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
          b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
          b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
          b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
          b.drTip_pos = {x:b.downline_pos[1].x, y:935};


          //first leftline
          b.CU_lArrowline =[{x:100, y:195}, {x:100, y:905-this.LLL_inputE_Height*10*b.rate},]
          b.CU_lfupArrowP =[{x:90, y:195}, {x:110, y:195},]
          b.CU_lfupTip = {x:100, y:195}
          b.CU_lfdownTip = {x:100, y:905-this.LLL_inputE_Height*b.rate*10}
          b.CLUH_Group = {x:82 , y:20 +  (710 - this.LLL_inputE_Height*10*b.rate) / 2}

          this.tempHeight = math.subtract(ele.left_Heightletter.returnValue(),this.dis_LLL_inputE_Height)
          if(this.tempHeight.n%this.tempHeight.d == 0) {
            ele.C_LUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
            } else {
            ele.C_LUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
          }


          b.RU_lArrowline =[{x:100, y:905}, {x:100, y:905-this.LLL_inputE_Height*10*b.rate},]
          b.RU_lfupArrowP =[{x:90, y:905}, {x:110, y:905},]
          b.extra_p2 =[{x:90,y:905-this.LLL_inputE_Height*b.rate*10},{x:110,y:905-this.LLL_inputE_Height*b.rate*10}]
          b.RU_lfupTip = {x:100, y:905-this.LLL_inputE_Height*b.rate*10}
          b.RU_lfdownTip = {x:100, y:905}
          b.RLUH_Group = {x:82 , y:730-b.rate*10*this.LLL_inputE_Height/2}

          if(this.dis_LLL_inputE_Height.n%this.dis_LLL_inputE_Height.d == 0) {
            ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_LLL_inputE_Height.n/this.dis_LLL_inputE_Height.d));
            } else {
            ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_LLL_inputE_Height.n/this.dis_LLL_inputE_Height.d)+ '-'+this.dis_LLL_inputE_Height.n%this.dis_LLL_inputE_Height.d + '/' + this.dis_LLL_inputE_Height.d);
          }


          b.CL_downArrowline = [{x:163, y:935}, {x:163+10*b.rate*this.LLL_inputE_Width_1, y:935},]
          b.CL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
          b.CL_dlTip = {x:163, y:935}
          b.CL_drTip = {x:163+10*b.rate*this.LLL_inputE_Width_1, y:935}
          b.CLBW_Group = {x:135 + this.LLL_inputE_Width_1 * b.rate * 10/2 , y:918}

          if(this.dis_LLL_inputE_Width_1.n%this.dis_LLL_inputE_Width_1.d == 0) {
            ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LLL_inputE_Width_1.n/this.dis_LLL_inputE_Width_1.d));
            } else {
            ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LLL_inputE_Width_1.n/this.dis_LLL_inputE_Width_1.d)+ '-'+this.dis_LLL_inputE_Width_1.n%this.dis_LLL_inputE_Width_1.d + '/' + this.dis_LLL_inputE_Width_1.d);
          }


          b.RL_downArrowline = [{x:163+ 10*b.rate*this.LLL_inputE_Width_1, y:935}, {x:163+(this.LLL_inputE_Width_1+this.LLL_inputE_Width_2)*b.rate*10, y:935},]
          b.RL_dlArrowP = [{x:163+ 10*b.rate*this.LLL_inputE_Width_1, y:945}, {x:163+ 10*b.rate*this.LLL_inputE_Width_1, y:925},]
          b.RL_dlTip = {x:163+ 10*b.rate*this.LLL_inputE_Width_1, y:935}
          b.RL_drTip = {x:163+(this.LLL_inputE_Width_1+this.LLL_inputE_Width_2)*b.rate*10, y:935}
          b.RLBW_Group = {x:135+this.LLL_inputE_Width_1 * b.rate * 10 + this.LLL_inputE_Width_2*b.rate*10/2,y:918}

          if(this.dis_LLL_inputE_Width_2.n%this.dis_LLL_inputE_Width_2.d == 0) {
            ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_LLL_inputE_Width_2.n/this.dis_LLL_inputE_Width_2.d));
            } else {
            ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_LLL_inputE_Width_2.n/this.dis_LLL_inputE_Width_2.d)+ '-'+this.dis_LLL_inputE_Width_2.n%this.dis_LLL_inputE_Width_2.d + '/' + this.dis_LLL_inputE_Width_2.d);
          }


          b.LLL_E_dot_Line_1 = [{x:163,y:195},{x:163,y:905-10*b.rate*this.LLL_inputE_Height}]                                
          b.LLL_E_dot_Line_2 = [{x:163+10*b.rate*this.LLL_inputE_Width_1,y:905 - this.LLL_inputE_Height*10*b.rate},{x: 163+10*b.rate*this.LLL_inputE_Width_1,y:905}]
          b.L_Elbow_1 = [{x:163,y:195},{x:163+10*b.rate*this.LLL_inputE_Width_1,y:905-this.LLL_inputE_Height*10*b.rate}]
          b.L_Elbow_2 = [{x:163+10*b.rate*this.LLL_inputE_Width_1,y:905-this.LLL_inputE_Height*10*b.rate},{x:163+10*(this.LLL_inputE_Width_1+this.LLL_inputE_Width_2)*b.rate,y:905}]

        }



        // *left-right elbow
        if(this.LLR_inputE_Width_1){

          // rect , leftLine,letter remove
         b.luRectmove = b.initSignle_pos;
         b.lbRectmove = b.initSignle_pos;
         b.leftline_pos = b.init2d_pos;
         // change
         b.upline_pos = [{x:ele.upLine.getPosition()[0].x + this.LLR_inputE_Width_1*b.rate*10,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[1].x,y:ele.upLine.getPosition()[1].y}]
         b.downline_pos =  [{x:ele.downLine.getPosition()[0].x +this.LLR_inputE_Width_2*b.rate*10,y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x,y:ele.downLine.getPosition()[1].y}]
         b.downletter = {x:ele.downmainGroup.getPosition().x + this.LLR_inputE_Width_2*b.rate*10/2, y: ele.downmainGroup.getPosition().y}
         b.upletter = {x:ele.upmainGroup.getPosition().x+this.LLR_inputE_Width_1*b.rate*10/2,y:ele.upmainGroup.getPosition().y}
       
         b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
         b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
         b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
         b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
         b.drTip_pos = {x:b.downline_pos[1].x, y:935};

         b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
         b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
         b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
         b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
         b.urTip_pos = {x:b.upline_pos[1].x, y:165};

         //first leftline
         b.CU_lArrowline =[{x:100, y:195}, {x:100, y:905-this.LLR_inputE_Height*10*b.rate},]
         b.CU_lfupArrowP =[{x:90, y:195}, {x:110, y:195},]
         b.CU_lfupTip = {x:100, y:195}
         b.CU_lfdownTip = {x:100, y:905-this.LLR_inputE_Height*b.rate*10}
         b.CLUH_Group = {x:82 , y:20 +  (710 - this.LLR_inputE_Height*10*b.rate) / 2}

         this.tempHeight = math.subtract(ele.left_Heightletter.returnValue(),this.dis_LLR_inputE_Height)
         if(this.tempHeight.n%this.tempHeight.d == 0) {
           ele.C_LUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
           } else {
           ele.C_LUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
         }

        //  second leftline
         b.RU_lArrowline =[{x:100, y:905}, {x:100, y:905-this.LLR_inputE_Height*10*b.rate},]
         b.RU_lfupArrowP =[{x:90, y:905}, {x:110, y:905},]
         b.extra_p2 =[{x:90,y:905-this.LLR_inputE_Height*b.rate*10},{x:110,y:905-this.LLR_inputE_Height*b.rate*10}]
         b.RU_lfupTip = {x:100, y:905-this.LLR_inputE_Height*b.rate*10}
         b.RU_lfdownTip = {x:100, y:905}
         b.RLUH_Group = {x:82 , y:730-b.rate*10*this.LLR_inputE_Height/2}

         if(this.dis_LLR_inputE_Height.n%this.dis_LLR_inputE_Height.d == 0) {
           ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_LLR_inputE_Height.n/this.dis_LLR_inputE_Height.d));
           } else {
           ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_LLR_inputE_Height.n/this.dis_LLR_inputE_Height.d)+ '-'+this.dis_LLR_inputE_Height.n%this.dis_LLR_inputE_Height.d + '/' + this.dis_LLR_inputE_Height.d);
         }


        
         b.CL_downArrowline = [{x:163, y:165}, {x:163+10*b.rate*this.LLR_inputE_Width_1, y:165},]
         b.CL_dlArrowP = [{x:163, y:175}, {x:163, y:155},]
         b.CL_dlTip = {x:163, y:165}
         b.CL_drTip = {x:163+10*b.rate*this.LLR_inputE_Width_1, y:165}
         b.CLBW_Group = {x:135 + this.LLR_inputE_Width_1 * b.rate * 10/2 , y:148}

         if(this.dis_LLR_inputE_Width_1.n%this.dis_LLR_inputE_Width_1.d == 0) {
           ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LLR_inputE_Width_1.n/this.dis_LLR_inputE_Width_1.d));
           } else {
           ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LLR_inputE_Width_1.n/this.dis_LLR_inputE_Width_1.d)+ '-'+this.dis_LLR_inputE_Width_1.n%this.dis_LLR_inputE_Width_1.d + '/' + this.dis_LLR_inputE_Width_1.d);
         }


         b.RL_downArrowline = [{x:163, y:935}, {x:163+this.LLR_inputE_Width_2*b.rate*10, y:935},]
         b.RL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
         b.RL_dlTip = {x:163, y:935}
         b.RL_drTip = {x:163+this.LLR_inputE_Width_2*b.rate*10, y:935}
         b.RLBW_Group = {x:135 + this.LLR_inputE_Width_2*b.rate*10/2,y:918}

         if(this.dis_LLR_inputE_Width_2.n%this.dis_LLR_inputE_Width_2.d == 0) {
           ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_LLR_inputE_Width_2.n/this.dis_LLR_inputE_Width_2.d));
           } else {
           ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_LLR_inputE_Width_2.n/this.dis_LLR_inputE_Width_2.d)+ '-'+this.dis_LLR_inputE_Width_2.n%this.dis_LLR_inputE_Width_2.d + '/' + this.dis_LLR_inputE_Width_2.d);
         }


         b.LLL_E_dot_Line_1 = [{x:163,y:195},{x:163,y:905-10*b.rate*this.LLR_inputE_Height}]                                
         b.LLL_E_dot_Line_2 = [{x:163,y:905 - this.LLR_inputE_Height*10*b.rate},{x: 163,y:905}]
         b.L_Elbow_1 = [{x:163+10*b.rate*this.LLR_inputE_Width_1,y:195},{x:163,y:905-this.LLR_inputE_Height*10*b.rate}]
         b.L_Elbow_2 = [{x:163,y:905-this.LLR_inputE_Height*10*b.rate},{x:163+10*this.LLR_inputE_Width_2*b.rate,y:905}]

       }

        // *right-left elbow
        if(this.LRL_inputE_Width_1){

          // rect , leftLine,letter remove
         b.luRectmove = b.initSignle_pos;
         b.lbRectmove = b.initSignle_pos;
         b.leftline_pos = b.init2d_pos;
         // change

         b.leftletter = {x:ele.leftmainGroup.getPosition().x+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:ele.leftmainGroup.getPosition().y}
         b.upletter = {x:ele.upmainGroup.getPosition().x+(this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10/2,y:ele.upmainGroup.getPosition().y-25}
         b.downletter = {x:ele.downmainGroup.getPosition().x,y:ele.downmainGroup.getPosition().y+30}

         b.upline_pos = [{x:ele.upLine.getPosition()[0].x + (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[1].x,y:ele.upLine.getPosition()[1].y}]

         b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:140},  {x:b.upline_pos[1].x, y:140},] 
         b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:150},{x:b.upline_pos[0].x, y:130}]
         b.urArrowP_pos = [{x:b.upline_pos[1].x, y:150},{x:b.upline_pos[1].x, y:130}]
         b.ulTip_pos = {x:b.upline_pos[0].x, y:140};
         b.urTip_pos = {x:b.upline_pos[1].x, y:140};

         b.downArrowline_pos =  [{x:ele.downArrowline.getPosition()[0].x, y:965},  {x:ele.downArrowline.getPosition()[1].x, y:965},]
         b.dlArrowP_pos = [{x:ele.downArrowline.getPosition()[0].x, y:975},{x:ele.downArrowline.getPosition()[0].x, y:955}]      
         b.drArrowP_pos = [{x:ele.downArrowline.getPosition()[1].x, y:975},{x:ele.downArrowline.getPosition()[1].x, y:955}]
         b.dlTip_pos = {x:ele.downArrowline.getPosition()[0].x, y:965};
         b.drTip_pos = {x:ele.downArrowline.getPosition()[1].x, y:965};

         b.lArrowline_pos =  [{x:ele.lArrowline.getPosition()[0].x+(this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:ele.lArrowline.getPosition()[0].y},{x:ele.lArrowline.getPosition()[1].x+(this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:ele.lArrowline.getPosition()[1].y}]
         b.lfupArrowP_pos = [{x:b.lArrowline_pos[0].x-10,y:b.lArrowline_pos[0].y},{x:b.lArrowline_pos[1].x+10,y:b.lArrowline_pos[0].y}]
         b.lfdownArrowP_pos =   [{x:b.lArrowline_pos[0].x-10,y:b.lArrowline_pos[1].y},{x:b.lArrowline_pos[1].x+10,y:b.lArrowline_pos[1].y}]
         b.lfupTip_pos = {x:b.lArrowline_pos[0].x, y:b.lArrowline_pos[0].y};
         b.lfdownTip_pos ={x:b.lArrowline_pos[1].x, y:b.lArrowline_pos[1].y};








         //first leftline
         b.CU_lArrowline =[{x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:195}, {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905-this.LRL_inputE_Height*10*b.rate},]
         b.CU_lfupArrowP =[{x:90+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:195}, {x:110+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:195},]
         b.CU_lfupTip = {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:195}
         b.CU_lfdownTip = {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905-this.LRL_inputE_Height*b.rate*10}
         b.CLUH_Group = {x:82+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10 , y:20 +  (710 - this.LRL_inputE_Height*10*b.rate) / 2}

         this.tempHeight = math.subtract(ele.left_Heightletter.returnValue(),this.dis_LRL_inputE_Height)
         if(this.tempHeight.n%this.tempHeight.d == 0) {
           ele.C_LUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
           } else {
           ele.C_LUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
         }

        //  second leftline
         b.RU_lArrowline =[{x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905}, {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905-this.LRL_inputE_Height*10*b.rate},]
         b.RU_lfupArrowP =[{x:90+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905}, {x:110+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905},]
         b.extra_p2 =[{x:90+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:905-this.LRL_inputE_Height*b.rate*10},{x:110+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:905-this.LRL_inputE_Height*b.rate*10}]
         b.RU_lfupTip = {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905-this.LRL_inputE_Height*b.rate*10}
         b.RU_lfdownTip = {x:100+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:905}
         b.RLUH_Group = {x:82+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10 , y:730-b.rate*10*this.LRL_inputE_Height/2}

         if(this.dis_LRL_inputE_Height.n%this.dis_LRL_inputE_Height.d == 0) {
           ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_LRL_inputE_Height.n/this.dis_LRL_inputE_Height.d));
           } else {
           ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_LRL_inputE_Height.n/this.dis_LRL_inputE_Height.d)+ '-'+this.dis_LRL_inputE_Height.n%this.dis_LRL_inputE_Height.d + '/' + this.dis_LRL_inputE_Height.d);
         }


        
         b.CL_downArrowline = [{x:163+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:165}, {x:163+10*b.rate*this.LRL_inputE_Width_2, y:165},]
         b.CL_dlArrowP = [{x:163+10*b.rate*this.LRL_inputE_Width_2, y:175}, {x:163+10*b.rate*this.LRL_inputE_Width_2, y:155},]
         b.CL_dlTip = {x:163+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10, y:165}
         b.CL_drTip = {x:163+10*b.rate*this.LRL_inputE_Width_2, y:165}
         b.CLBW_Group = {x:135+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1/2) * b.rate * 10 , y:148}

         if(this.dis_LRL_inputE_Width_1.n%this.dis_LRL_inputE_Width_1.d == 0) {
           ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LRL_inputE_Width_1.n/this.dis_LRL_inputE_Width_1.d));
           } else {
           ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LRL_inputE_Width_1.n/this.dis_LRL_inputE_Width_1.d)+ '-'+this.dis_LRL_inputE_Width_1.n%this.dis_LRL_inputE_Width_1.d + '/' + this.dis_LRL_inputE_Width_1.d);
         }


         b.RL_downArrowline = [{x:163, y:935}, {x:163+this.LRL_inputE_Width_2*b.rate*10, y:935},]
         b.RL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
         b.RL_dlTip = {x:163, y:935}
         b.RL_drTip = {x:163+this.LRL_inputE_Width_2*b.rate*10, y:935}
         b.RLBW_Group = {x:135 + this.LRL_inputE_Width_2*b.rate*10/2,y:918}

         if(this.dis_LRL_inputE_Width_2.n%this.dis_LRL_inputE_Width_2.d == 0) {
           ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_LRL_inputE_Width_2.n/this.dis_LRL_inputE_Width_2.d));
           } else {
           ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_LRL_inputE_Width_2.n/this.dis_LRL_inputE_Width_2.d)+ '-'+this.dis_LRL_inputE_Width_2.n%this.dis_LRL_inputE_Width_2.d + '/' + this.dis_LRL_inputE_Width_2.d);
         }


         b.LLL_E_dot_Line_1 = [{x:163+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:195},{x:163+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:905-10*b.rate*this.LRL_inputE_Height}]                                
         b.LLL_E_dot_Line_2 = [{x:163,y:905 - this.LRL_inputE_Height*10*b.rate},{x: 163,y:905}]
         b.L_Elbow_1 = [{x:163+ (this.LRL_inputE_Width_2-this.LRL_inputE_Width_1)*b.rate*10,y:195},{x:163+10*b.rate*this.LRL_inputE_Width_2,y:905-this.LRL_inputE_Height*10*b.rate}]
         b.L_Elbow_2 = [{x:163+10*b.rate*this.LRL_inputE_Width_2,y:905-this.LRL_inputE_Height*10*b.rate},{x:163,y:905}]

       }


       //right-right elbow
       if(this.LRR_inputE_Width_1){

        // rect , leftLine,letter remove
       b.luRectmove = b.initSignle_pos;
       b.lbRectmove = b.initSignle_pos;
       b.leftline_pos = b.init2d_pos;
       // change
       b.upline_pos = [{x:ele.upLine.getPosition()[0].x + (this.LRR_inputE_Width_1+this.LRR_inputE_Width_2)*b.rate*10,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[1].x,y:ele.upLine.getPosition()[1].y}]
       b.upletter = {x:ele.upmainGroup.getPosition().x+(this.LRR_inputE_Width_1+this.LRR_inputE_Width_2)*b.rate*10/2,y:ele.upmainGroup.getPosition().y}
     
   
       b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
       b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
       b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
       b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
       b.urTip_pos = {x:b.upline_pos[1].x, y:165};

       //first leftline
       b.CU_lArrowline =[{x:100, y:195}, {x:100, y:905-this.LRR_inputE_Height*10*b.rate},]
       b.CU_lfupArrowP =[{x:90, y:195}, {x:110, y:195},]
       b.CU_lfupTip = {x:100, y:195}
       b.CU_lfdownTip = {x:100, y:905-this.LRR_inputE_Height*b.rate*10}
       b.CLUH_Group = {x:82 , y:20 +  (710 - this.LRR_inputE_Height*10*b.rate) / 2}

       this.tempHeight = math.subtract(ele.left_Heightletter.returnValue(),this.dis_LRR_inputE_Height)
       if(this.tempHeight.n%this.tempHeight.d == 0) {
         ele.C_LUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
         } else {
         ele.C_LUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
       }

      //  second leftline
       b.RU_lArrowline =[{x:100, y:905}, {x:100, y:905-this.LRR_inputE_Height*10*b.rate},]
       b.RU_lfupArrowP =[{x:90, y:905}, {x:110, y:905},]
       b.extra_p2 =[{x:90,y:905-this.LRR_inputE_Height*b.rate*10},{x:110,y:905-this.LRR_inputE_Height*b.rate*10}]
       b.RU_lfupTip = {x:100, y:905-this.LRR_inputE_Height*b.rate*10}
       b.RU_lfdownTip = {x:100, y:905}
       b.RLUH_Group = {x:82 , y:730-b.rate*10*this.LRR_inputE_Height/2}

       if(this.dis_LRR_inputE_Height.n%this.dis_LRR_inputE_Height.d == 0) {
         ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_LRR_inputE_Height.n/this.dis_LRR_inputE_Height.d));
         } else {
         ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_LRR_inputE_Height.n/this.dis_LRR_inputE_Height.d)+ '-'+this.dis_LRR_inputE_Height.n%this.dis_LRR_inputE_Height.d + '/' + this.dis_LRR_inputE_Height.d);
       }


      
       b.CL_downArrowline = [{x:163+10*b.rate*this.LRR_inputE_Width_2, y:165}, {x:163+10*b.rate*(this.LRR_inputE_Width_1+this.LRR_inputE_Width_2), y:165},]
       b.CL_dlArrowP = [{x:163+10*b.rate*this.LRR_inputE_Width_2, y:175}, {x:163+10*b.rate*this.LRR_inputE_Width_2, y:155},]
       b.CL_dlTip = {x:163+10*b.rate*this.LRR_inputE_Width_2, y:165}
       b.CL_drTip = {x:163+10*b.rate*(this.LRR_inputE_Width_1+this.LRR_inputE_Width_2), y:165}
       b.CLBW_Group = {x:135 + (this.LRR_inputE_Width_2+this.LRR_inputE_Width_1/2) * b.rate * 10, y:148}

       if(this.dis_LRR_inputE_Width_1.n%this.dis_LRR_inputE_Width_1.d == 0) {
         ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LRR_inputE_Width_1.n/this.dis_LRR_inputE_Width_1.d));
         } else {
         ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LRR_inputE_Width_1.n/this.dis_LRR_inputE_Width_1.d)+ '-'+this.dis_LRR_inputE_Width_1.n%this.dis_LRR_inputE_Width_1.d + '/' + this.dis_LRR_inputE_Width_1.d);
       }


       b.RL_downArrowline = [{x:163, y:165}, {x:163+(this.LRR_inputE_Width_1+this.LRR_inputE_Width_2)*b.rate*10, y:165},]
       b.RL_dlArrowP = [{x:163, y:175}, {x:163, y:155},]
       b.RL_dlTip = {x:163, y:165}
       b.RL_drTip = {x:163+this.LRR_inputE_Width_2*b.rate*10, y:165}
       b.RLBW_Group = {x:135+this.LRR_inputE_Width_2/2*b.rate*10,y:148}

       if(this.dis_LRR_inputE_Width_2.n%this.dis_LRR_inputE_Width_2.d == 0) {
         ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_LRR_inputE_Width_2.n/this.dis_LRR_inputE_Width_2.d));
         } else {
         ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_LRR_inputE_Width_2.n/this.dis_LRR_inputE_Width_2.d)+ '-'+this.dis_LRR_inputE_Width_2.n%this.dis_LRR_inputE_Width_2.d + '/' + this.dis_LRR_inputE_Width_2.d);
       }


       b.LLL_E_dot_Line_1 = [{x:163+this.LRR_inputE_Width_2*10*b.rate,y:195},{x:163+this.LRR_inputE_Width_2*10*b.rate,y:905-10*b.rate*this.LRR_inputE_Height}]                                
       b.LLL_E_dot_Line_2 = [{x:163,y:905 - this.LRR_inputE_Height*10*b.rate},{x: 163,y:905}]
       b.L_Elbow_1 = [{x:163+10*b.rate*(this.LRR_inputE_Width_1+this.LRR_inputE_Width_2),y:195},{x:163+this.LRR_inputE_Width_2*10*b.rate,y:905-this.LRR_inputE_Height*10*b.rate}]
       b.L_Elbow_2 = [{x:163+10*b.rate*this.LRR_inputE_Width_2,y:905-this.LRR_inputE_Height*10*b.rate},{x:163,y:905}]

     }

        b.dis_leftHeight = ele.left_Heightletter.returnValue()
        b.dis_rightHeight = ele.right_Heightletter.returnValue()
        b.dis_upWidth = math.subtract(ele.up_Widthletter.returnValue(),(this.dis_LL_TopRight+this.dis_LLR_inputE_Width_1+this.dis_LRR_inputE_Width_1+this.dis_LRR_inputE_Width_2))
        b.dis_downWidth = math.subtract(ele.down_Widthletter.returnValue(),(this.dis_LLL_inputE_Width_1+this.dis_LLL_inputE_Width_2+this.dis_LL_TopLeft+this.dis_LLR_inputE_Width_2))
        b.draw();

      }
    }

    function rightOutage() {

      this.Handle = "rightOutage";
      this.draw = function(context) {

        var simpleParameter = [];
      
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'rightOutage';
        })
        this.parameter = simpleParameter[0]
        this.RL_TopLeft = this.parameter.value[0].topLeft;
        this.dis_RL_TopLeft = this.parameter.value[0].topLeft;
        if(this.RL_TopLeft) {
          this.RL_TopLeft=(this.RL_TopLeft>10)?this.RL_TopLeft:10;
        }

        this.RL_TopRight = this.parameter.value[0].topRight;
        this.dis_RL_TopRight = this.parameter.value[0].topRight;
        if(this.RL_TopRight) {
          this.RL_TopRight=(this.RL_TopRight>10)?this.RL_TopRight:10;
        }

        this.RLL_inputE_Width_1 = this.parameter.value[1].width1;
        this.dis_RLL_inputE_Width_1 = this.parameter.value[1].width1;
        if(this.RLL_inputE_Width_1) {
          this.RLL_inputE_Width_1=(this.RLL_inputE_Width_1>10)?this.RLL_inputE_Width_1:10;
        }

        this.RLL_inputE_Width_2 = this.parameter.value[1].width2;
        this.dis_RLL_inputE_Width_2 = this.parameter.value[1].width2;
        if(this.RLL_inputE_Width_2) {
          this.RLL_inputE_Width_2=(this.RLL_inputE_Width_2>10)?this.RLL_inputE_Width_2:10;
        }

        this.RLL_inputE_Height = this.parameter.value[1].height;
        this.dis_RLL_inputE_Height = this.parameter.value[1].height;
        if(this.RLL_inputE_Height) {
          this.RLL_inputE_Height=(this.RLL_inputE_Height>10)?this.RLL_inputE_Height:10;
        }

        this.RLR_inputE_Width_1 =  this.parameter.value[2].width1;
        this.dis_RLR_inputE_Width_1 =  this.parameter.value[2].width1;
        if(this.RLR_inputE_Width_1) {
          this.RLR_inputE_Width_1=(this.RLR_inputE_Width_1>10)?this.RLR_inputE_Width_1:10;
        }

        this.RLR_inputE_Width_2 = this.parameter.value[2].width2;
        this.dis_RLR_inputE_Width_2 = this.parameter.value[2].width2;
        if(this.RLR_inputE_Width_2) {
          this.RLR_inputE_Width_2=(this.RLR_inputE_Width_2>10)?this.RLR_inputE_Width_2:10;
        }

        this.RLR_inputE_Height = this.parameter.value[2].height;
        this.dis_RLR_inputE_Height = this.parameter.value[2].height;
        if(this.RLR_inputE_Height) {
          this.RLR_inputE_Height=(this.RLR_inputE_Height>10)?this.RLR_inputE_Height:10;
        }

        this.RRL_inputE_Width_1 =this.parameter.value[3].width1;
        this.dis_RRL_inputE_Width_1 =this.parameter.value[3].width1;
        if(this.RRL_inputE_Width_1) {
          this.RRL_inputE_Width_1=(this.RRL_inputE_Width_1>10)?this.RRL_inputE_Width_1:10;
        }

        this.RRL_inputE_Width_2 = this.parameter.value[3].width2;
        this.dis_RRL_inputE_Width_2 = this.parameter.value[3].width2;
        if(this.RRL_inputE_Width_2) {
          this.RRL_inputE_Width_2=(this.RRL_inputE_Width_2>10)?this.RRL_inputE_Width_2:10;
        }

        this.RRL_inputE_Height = this.parameter.value[3].height;
        this.dis_RRL_inputE_Height = this.parameter.value[3].height;
        if(this.RRL_inputE_Height) {
          this.RRL_inputE_Height=(this.RRL_inputE_Height>10)?this.RRL_inputE_Height:10;
        }

        this.RRR_inputE_Width_1 = this.parameter.value[4].width1;
        this.dis_RRR_inputE_Width_1 = this.parameter.value[4].width1;
        if(this.RRR_inputE_Width_1) {
          this.RRR_inputE_Width_1=(this.RRR_inputE_Width_1>10)?this.RRR_inputE_Width_1:10;
        }

        this.RRR_inputE_Width_2 = this.parameter.value[4].width2;
        this.dis_RRR_inputE_Width_2 = this.parameter.value[4].width2;
        if(this.RRR_inputE_Width_2) {
          this.RRR_inputE_Width_2=(this.RRR_inputE_Width_2>10)?this.RRR_inputE_Width_2:10;
        }
 
        this.RRR_inputE_Height =this.parameter.value[4].height;
        this.dis_RRR_inputE_Height =this.parameter.value[4].height;
        if(this.RRR_inputE_Height) {
          this.RRR_inputE_Height=(this.RRR_inputE_Height>10)?this.RRR_inputE_Height:10;
        }

        
        var b = new initDraw(context);
        var ele = new definitionObject();

        // signle
        if(this.RL_TopLeft) {
          // rect , leftLine,letter remove
          b.ruRectmove = b.initSignle_pos
          b.rbRectmove = b.initSignle_pos;
          b.rightline_pos = b.init2d_pos;

          b.downletter = {x:ele.downmainGroup.getPosition().x -this.RL_TopLeft*10*b.rate/2, y: ele.downmainGroup.getPosition().y}
          b.downline_pos =  [{x:ele.downLine.getPosition()[0].x, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * b.rate * this.RL_TopLeft, y:ele.downLine.getPosition()[1].y},]

          b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
          b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
          b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
          b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
          b.drTip_pos = {x:b.downline_pos[1].x, y:935};
    
           //  line
          this.cr_uline =  [{x:b.upline_pos[1].x, y:b.upline_pos[1].y},{x:b.downline_pos[1].x, y:b.downline_pos[1].y},]
          this.R_dot_Line = [{x:443 + b.widthDifference,y:195},{x:443+b.widthDifference,y:905}]

          ele.R_dot_Line.drawPath(this.R_dot_Line)
          ele.CR_uline.drawPath(this.cr_uline);

          //  arrow
          b.CR_downArrowline = [ {x:b.downline_pos[1].x, y:935}, {x:ele.downLine.getPosition()[1].x, y:935},]
          b.CR_dlArrowP = [{x:ele.downLine.getPosition()[1].x, y:945}, {x:ele.downLine.getPosition()[1].x, y:925},]
          b.CR_dlTip = {x:b.downline_pos[1].x, y:935}
          b.CR_drTip = {x:ele.downLine.getPosition()[1].x, y:935}
          b.CRBW_Group = {x:415 + b.widthDifference -10*this.RL_TopLeft/2*b.rate, y:915}

    
          if(this.dis_RL_TopLeft.n%this.dis_RL_TopLeft.d == 0) {
            ele.C_RBW_Letter.changeletter('' + parseInt(this.dis_RL_TopLeft.n/this.dis_RL_TopLeft.d));
            } else {
            ele.C_RBW_Letter.changeletter(''+parseInt(this.dis_RL_TopLeft.n/this.dis_RL_TopLeft.d)+ '-'+this.dis_RL_TopLeft.n%this.dis_RL_TopLeft.d + '/' + this.dis_RL_TopLeft.d);
          }


        }  else if (this.RL_TopRight) {
          // rect , leftLine remove
          b.ruRectmove = b.initSignle_pos
          b.rbRectmove = b.initSignle_pos;
          b.rightline_pos = b.init2d_pos;

          b.upletter = {x:ele.upmainGroup.getPosition().x - this.RL_TopRight*10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
          b.upline_pos =  [{x: ele.upLine.getPosition()[0].x , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x-10* this.RL_TopRight * b.rate , y:ele.upLine.getPosition()[1].y},]
  
          b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
          b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
          b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
          b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
          b.urTip_pos = {x:b.upline_pos[1].x, y:165};
          //  line
          this.cr_uline =  [{x:b.upline_pos[1].x, y:b.upline_pos[1].y},{x:b.downline_pos[1].x, y:b.downline_pos[1].y},]
          this.R_dot_Line = [{x:443 + b.widthDifference,y:195},{x:443+b.widthDifference,y:905}]
          this.cr_dline = [{x:b.downline_pos[1].x,y:b.downline_pos[1].y},{x:b.upline_pos[1].x,y:b.upline_pos[1].y}]
          
          ele.R_dot_Line.drawPath(this.R_dot_Line)
          ele.CR_dline.drawPath(this.cr_dline);
          // letter
          b.CR_upArrowline = [{x:b.upline_pos[1].x, y:165}, {x:ele.upLine.getPosition()[1].x , y:165},]
          b.CR_ulArrowP = [{x:ele.upLine.getPosition()[1].x, y:175}, {x:ele.upLine.getPosition()[1].x, y:155},]
          b.CR_ulTip = {x:b.upline_pos[1].x, y:165}
          b.CR_urTip = {x:ele.upLine.getPosition()[1].x, y:165};
          b.CRUW_Group = {x:415 + b.widthDifference - 10 * this.RL_TopRight * b.rate/2 , y:145}

          if(this.dis_RL_TopRight.n%this.dis_RL_TopRight.d == 0) {
            ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RL_TopRight.n/this.dis_RL_TopRight.d));
            } else {
            ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RL_TopRight.n/this.dis_RL_TopRight.d)+ '-'+this.dis_RL_TopRight.n%this.dis_RL_TopRight.d + '/' + this.dis_RL_TopRight.d);
          }
        }

        // elbow
        // *left-left elbow

        if(this.RLL_inputE_Width_1){

           // rect , rightline remove
           b.ruRectmove = b.initSignle_pos
           b.rbRectmove = b.initSignle_pos;
           b.rightline_pos = b.init2d_pos;
          // change
          b.upletter = {x:ele.upmainGroup.getPosition().x-(this.RLL_inputE_Width_1+this.RLL_inputE_Width_2)*10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
          b.upline_pos =  [{x: ele.upLine.getPosition()[0].x , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x-10* (this.RLL_inputE_Width_1+this.RLL_inputE_Width_2) * b.rate , y:ele.upLine.getPosition()[1].y},]
  
          
          b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
          b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
          b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
          b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
          b.urTip_pos = {x:b.upline_pos[1].x, y:165};

          // //first rightline
          b.CU_rArrowline =[{x:480+b.widthDifference, y:195}, {x:480+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10},]
          b.CU_rgupArrowP = [{x:470+b.widthDifference, y:195}, {x:490+b.widthDifference, y:195},]
          b.CU_rgupTip = {x:480+b.widthDifference, y:195}
          b.CU_rgdownTip = {x:480+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10}
          b.CRUH_Group = {x:460 + b.widthDifference , y:23 + (710-this.RLL_inputE_Height*b.rate*10) / 2}
      

  
          this.tempHeight = math.subtract(ele.right_Heightletter.returnValue(),this.dis_RLL_inputE_Height)
          if(this.tempHeight.n%this.tempHeight.d == 0) {
            ele.C_RUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
            } else {
            ele.C_RUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
          }

          // second rightline
          b.RU_rArrowline =[{x:480+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10}, {x:480+b.widthDifference, y:905},]
          b.RU_rgupArrowP = [{x:470+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10}, {x:490+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10},]
          b.RU_rgupTip = {x:480+b.widthDifference, y:905-this.RLL_inputE_Height*b.rate*10}
          b.RU_rgdownTip = {x:480+b.widthDifference, y:905}
      
          b.RRUH_Group = {x:460 + b.widthDifference , y:23 + 710 - 10 * b.rate * this.RLL_inputE_Height / 2}

          if(this.dis_RLL_inputE_Height.n%this.dis_RLL_inputE_Height.d == 0) {
            ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_RLL_inputE_Height.n/this.dis_RLL_inputE_Height.d));
            } else {
            ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_RLL_inputE_Height.n/this.dis_RLL_inputE_Height.d)+ '-'+this.dis_RLL_inputE_Height.n%this.dis_RLL_inputE_Height.d + '/' + this.dis_RLL_inputE_Height.d);
          }


          // horizon line
          b.CR_upArrowline =  [{x:b.upline_pos[1].x, y:165}, {x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:165},]
          b.CR_ulArrowP = [{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:175}, {x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:155},]
          b.CR_ulTip = {x:b.upline_pos[1].x, y:165}
          b.CR_urTip = {x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10 , y:165}

          b.CRUW_Group = {x:415 + b.widthDifference - 10 *(this.RLL_inputE_Width_2+this.RLL_inputE_Width_1/2)* b.rate , y:145}
          if(this.dis_RLL_inputE_Width_1.n%this.dis_RLL_inputE_Width_1.d == 0) {
            ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RLL_inputE_Width_1.n/this.dis_RLL_inputE_Width_1.d));
            } else {
            ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RLL_inputE_Width_1.n/this.dis_RLL_inputE_Width_1.d)+ '-'+this.dis_RLL_inputE_Width_1.n%this.dis_RLL_inputE_Width_1.d + '/' + this.dis_RLL_inputE_Width_1.d);
          }

          b.RR_upArrowline =  [{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:165}, {x:443 + b.widthDifference, y:165},]
          b.RR_ulArrowP = [{x:443 + b.widthDifference , y:175}, {x:443 + b.widthDifference , y:155},]
          // b.extra_p3 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:205}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:185},]
          b.RR_ulTip = {x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:165}
          b.RR_urTip = {x:443 + b.widthDifference, y:165}
          b.RRUW_Group = {x:415 + b.widthDifference - 10 * this.dis_RLL_inputE_Width_2 * b.rate/2 , y:145}

          if(this.dis_RLL_inputE_Width_2.n%this.dis_RLL_inputE_Width_2.d == 0) {
            ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_RLL_inputE_Width_2.n/this.dis_RLL_inputE_Width_2.d));
            } else {
            ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_RLL_inputE_Width_2.n/this.dis_RLL_inputE_Width_2.d)+ '-'+this.dis_RLL_inputE_Width_2.n%this.dis_RLL_inputE_Width_2.d + '/' + this.dis_RLL_inputE_Width_2.d);
          }
          
      


          b.RLL_E_dot_Line_1 = [{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10,y:195},{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10, y:905-10*b.rate*this.RLL_inputE_Height }]  
          b.RLL_E_dot_Line_2 = [{x:443 + b.widthDifference,y:905 - this.RLL_inputE_Height*10*b.rate},{x:443 + b.widthDifference,y:905}]
          b.R_Elbow_1 = [{x:b.upline_pos[1].x, y:195},{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10,y:905-10*b.rate*this.RLL_inputE_Height}]
          b.R_Elbow_2 = [{x:443 + b.widthDifference-this.RLL_inputE_Width_2*b.rate*10,y:905-10*b.rate*this.RLL_inputE_Height},{x:443+b.widthDifference,y:905}]

        }

        if(this.RLR_inputE_Width_1){

          // rect , rightline remove
          b.ruRectmove = b.initSignle_pos
          b.rbRectmove = b.initSignle_pos;
          b.rightline_pos = b.init2d_pos;
          
         // change
         b.rightletter = {x:ele.rightmainGroup.getPosition().x+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2) , y:ele.rightmainGroup.getPosition().y}
         b.upletter = {x:ele.upmainGroup.getPosition().x,y:ele.upmainGroup.getPosition().y-25}
         b.downletter = {x:ele.downmainGroup.getPosition().x,y:ele.downmainGroup.getPosition().y+30}
        
         b.upline_pos =  [{x: ele.upLine.getPosition()[0].x , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x+(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2)*10*b.rate, y:ele.upLine.getPosition()[1].y},]
 
         b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:140},  {x:b.upline_pos[1].x, y:140},] 
         b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:150},{x:b.upline_pos[0].x, y:130}]
         b.urArrowP_pos = [{x:b.upline_pos[1].x, y:150},{x:b.upline_pos[1].x, y:130}]
         b.ulTip_pos = {x:b.upline_pos[0].x, y:140};
         b.urTip_pos = {x:b.upline_pos[1].x, y:140};


         b.downArrowline_pos =  [{x:ele.downArrowline.getPosition()[0].x, y:965},  {x:ele.downArrowline.getPosition()[1].x, y:965},]
         b.dlArrowP_pos = [{x:ele.downArrowline.getPosition()[0].x, y:975},{x:ele.downArrowline.getPosition()[0].x, y:955}]      
         b.drArrowP_pos = [{x:ele.downArrowline.getPosition()[1].x, y:975},{x:ele.downArrowline.getPosition()[1].x, y:955}]
         b.dlTip_pos = {x:ele.downArrowline.getPosition()[0].x, y:965};
         b.drTip_pos = {x:ele.downArrowline.getPosition()[1].x, y:965};


          b.rArrowline_pos =  [{x:ele.rArrowline.getPosition()[0].x+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:ele.rArrowline.getPosition()[0].y},  {x:ele.rArrowline.getPosition()[1].x+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:ele.rArrowline.getPosition()[1].y},]
          b.rgupArrowP_pos = [{x:b.rArrowline_pos[0].x-10,y:ele.rgupArrowP.getPosition()[0].y},{x:b.rArrowline_pos[0].x+10,y:ele.rgupArrowP.getPosition()[0].y}]
          b.rgdownArrowP_pos =  [{x:b.rArrowline_pos[0].x-10,y:ele.rgdownArrowP.getPosition()[1].y},{x:b.rArrowline_pos[0].x+10,y:ele.rgdownArrowP.getPosition()[1].y}]
          b.rgupTip_pos = {x:b.rArrowline_pos[0].x, y:b.rArrowline_pos[0].y};
          b.rgdownTip_pos ={x:b.rArrowline_pos[1].x, y:b.rArrowline_pos[1].y};
         
        
        
          // //first rightline
         b.CU_rArrowline =[{x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2),y:195},{x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10},]
         b.CU_rgupArrowP = [{x:470+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:195}, {x:490+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:195},]
         b.CU_rgupTip = {x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:195}
         b.CU_rgdownTip = {x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10}
         b.CRUH_Group = {x:460 + b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:23 + (710-this.RLR_inputE_Height*b.rate*10) / 2}
     

 
         this.tempHeight = math.subtract(ele.right_Heightletter.returnValue(),this.dis_RLR_inputE_Height)
         if(this.tempHeight.n%this.tempHeight.d == 0) {
           ele.C_RUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
           } else {
           ele.C_RUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
         }  

         // second rightline
         b.RU_rArrowline =[{x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10}, {x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905},]
         b.RU_rgupArrowP = [{x:470+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10}, {x:490+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10},]
         b.RU_rgupTip = {x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905-this.RLR_inputE_Height*b.rate*10}
         b.RU_rgdownTip = {x:480+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905}
         b.extra_p6=[{x:470+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905}, {x:490+b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2), y:905},]
        
         b.RRUH_Group = {x:460 + b.widthDifference+10*b.rate*(this.RLR_inputE_Width_1-this.RLR_inputE_Width_2) , y:23 + 710 - 10 * b.rate * this.RLR_inputE_Height / 2}

         if(this.dis_RLR_inputE_Height.n%this.dis_RLR_inputE_Height.d == 0) {
           ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_RLR_inputE_Height.n/this.dis_RLR_inputE_Height.d));
           } else {
           ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_RLR_inputE_Height.n/this.dis_RLR_inputE_Height.d)+ '-'+this.dis_RLR_inputE_Height.n%this.dis_RLR_inputE_Height.d + '/' + this.dis_RLR_inputE_Height.d);
         }


         // horizon line
         b.CR_upArrowline =  [{x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:165},{x:b.upline_pos[1].x, y:165}]
         b.CR_ulArrowP = [{x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:175}, {x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:155},]
         b.CR_ulTip = {x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:165}
         b.CR_urTip = {x:b.upline_pos[1].x,y:165}

         b.CRUW_Group = {x:415 + b.widthDifference + 10*b.rate*(this.RLR_inputE_Width_1/2-this.RLR_inputE_Width_2)  , y:145}
         if(this.dis_RLR_inputE_Width_1.n%this.dis_RLR_inputE_Width_1.d == 0) {
           ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RLR_inputE_Width_1.n/this.dis_RLR_inputE_Width_1.d));
           } else {
           ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RLR_inputE_Width_1.n/this.dis_RLR_inputE_Width_1.d)+ '-'+this.dis_RLR_inputE_Width_1.n%this.dis_RLR_inputE_Width_1.d + '/' + this.dis_RLR_inputE_Width_1.d);
         }

         b.RR_upArrowline =  [{x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:935}, {x:443 + b.widthDifference, y:935},]
          b.RR_ulArrowP = [{x:443 + b.widthDifference -this.RLR_inputE_Width_2*b.rate*10, y:945}, {x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10 , y:925},]
         // b.extra_p3 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:205}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:185},]
         b.RR_ulTip = {x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10, y:935}
         b.RR_urTip = {x:443 + b.widthDifference, y:935}
         b.RRUW_Group = {x:415 + b.widthDifference - 10 * this.dis_RLR_inputE_Width_2 * b.rate/2 , y:915}

         if(this.dis_RLR_inputE_Width_2.n%this.dis_RLR_inputE_Width_2.d == 0) {
           ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_RLR_inputE_Width_2.n/this.dis_RLR_inputE_Width_2.d));
           } else {
           ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_RLR_inputE_Width_2.n/this.dis_RLR_inputE_Width_2.d)+ '-'+this.dis_RLR_inputE_Width_2.n%this.dis_RLR_inputE_Width_2.d + '/' + this.dis_RLR_inputE_Width_2.d);
         }
         
     


         b.RLL_E_dot_Line_1 = [{x:b.upline_pos[1].x,y:195},{x:b.upline_pos[1].x, y:905-10*b.rate*this.RLR_inputE_Height }]  
         b.RLL_E_dot_Line_2 = [{x:ele.downLine.getPosition()[1].x,y:905 - this.RLR_inputE_Height*10*b.rate},{x:ele.downLine.getPosition()[1].x,y:905}]
         b.R_Elbow_1 = [{x:b.upline_pos[1].x, y:195},{x:b.RR_upArrowline[0].x,y:905-10*b.rate*this.RLR_inputE_Height}]
         b.R_Elbow_2 = [{x:443 + b.widthDifference-this.RLR_inputE_Width_2*b.rate*10,y:905-10*b.rate*this.RLR_inputE_Height},{x:443+b.widthDifference,y:905}]

       }

       if(this.RRL_inputE_Width_1){

        // rect , rightline remove
        b.ruRectmove = b.initSignle_pos
        b.rbRectmove = b.initSignle_pos;
        b.rightline_pos = b.init2d_pos;
       // change
       b.upletter = {x:ele.upmainGroup.getPosition().x-this.RRL_inputE_Width_1*10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
       b.upline_pos =  [{x: ele.upLine.getPosition()[0].x , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x-10* this.RRL_inputE_Width_1* b.rate , y:ele.upLine.getPosition()[1].y},]
       b.downline_pos =  [{x:ele.downLine.getPosition()[0].x, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * b.rate *this.RRL_inputE_Width_2, y:ele.downLine.getPosition()[1].y},]

       b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
       b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
       b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
       b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
       b.urTip_pos = {x:b.upline_pos[1].x, y:165};

       b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
       b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
       b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
       b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
       b.drTip_pos = {x:b.downline_pos[1].x, y:935};

       // //first rightline
       b.CU_rArrowline =[{x:480+b.widthDifference, y:195}, {x:480+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10},]
       b.CU_rgupArrowP = [{x:470+b.widthDifference, y:195}, {x:490+b.widthDifference, y:195},]
       b.CU_rgupTip = {x:480+b.widthDifference, y:195}
       b.CU_rgdownTip = {x:480+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10}
       b.CRUH_Group = {x:460 + b.widthDifference , y:23 + (710-this.RRL_inputE_Height*b.rate*10) / 2}
   


       this.tempHeight = math.subtract(ele.right_Heightletter.returnValue(),this.dis_RRL_inputE_Height)
       if(this.tempHeight.n%this.tempHeight.d == 0) {
         ele.C_RUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
         } else {
         ele.C_RUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
       }

       // second rightline
       b.RU_rArrowline =[{x:480+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10}, {x:480+b.widthDifference, y:905},]
       b.RU_rgupArrowP = [{x:470+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10}, {x:490+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10},]
       b.RU_rgupTip = {x:480+b.widthDifference, y:905-this.RRL_inputE_Height*b.rate*10}
       b.RU_rgdownTip = {x:480+b.widthDifference, y:905}
   
       b.RRUH_Group = {x:460 + b.widthDifference , y:23 + 710 - 10 * b.rate * this.RRL_inputE_Height / 2}

       if(this.dis_RRL_inputE_Height.n%this.dis_RRL_inputE_Height.d == 0) {
         ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_RRL_inputE_Height.n/this.dis_RRL_inputE_Height.d));
         } else {
         ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_RRL_inputE_Height.n/this.dis_RRL_inputE_Height.d)+ '-'+this.dis_RRL_inputE_Height.n%this.dis_RRL_inputE_Height.d + '/' + this.dis_RRL_inputE_Height.d);
       }


       // horizon line
       b.CR_upArrowline =  [{x:b.upline_pos[1].x, y:165}, {x:ele.upLine.getPosition()[1].x, y:165},]
       b.CR_ulArrowP = [{x:ele.upLine.getPosition()[1].x, y:175}, {x:ele.upLine.getPosition()[1].x, y:155},]
       b.CR_ulTip = {x:b.upline_pos[1].x, y:165}
       b.CR_urTip = {x:ele.upLine.getPosition()[1].x , y:165}

       b.CRUW_Group = {x:415 + b.widthDifference - 10 *this.RRL_inputE_Width_1/2* b.rate , y:145}
       if(this.dis_RRL_inputE_Width_1.n%this.dis_RRL_inputE_Width_1.d == 0) {
         ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RRL_inputE_Width_1.n/this.dis_RRL_inputE_Width_1.d));
         } else {
         ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RRL_inputE_Width_1.n/this.dis_RRL_inputE_Width_1.d)+ '-'+this.dis_RRL_inputE_Width_1.n%this.dis_RRL_inputE_Width_1.d + '/' + this.dis_RRL_inputE_Width_1.d);
       }

       b.RR_upArrowline =  [{x:b.downline_pos[1].x, y:935}, {x:443 + b.widthDifference, y:935},]
       b.RR_ulArrowP = [{x:443 + b.widthDifference , y:945}, {x:443 + b.widthDifference , y:925},]
      //  b.extra_p3 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:205}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:185},]
       b.RR_ulTip = {x:b.downline_pos[1].x, y:935}
       b.RR_urTip = {x:443 + b.widthDifference, y:935}
       b.RRUW_Group = {x:415 + b.widthDifference - 10 * this.RRL_inputE_Width_2 * b.rate/2 , y:915}

       if(this.dis_RRL_inputE_Width_2.n%this.dis_RRL_inputE_Width_2.d == 0) {
         ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_RRL_inputE_Width_2.n/this.dis_RRL_inputE_Width_2.d));
         } else {
         ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_RRL_inputE_Width_2.n/this.dis_RRL_inputE_Width_2.d)+ '-'+this.dis_RRL_inputE_Width_2.n%this.dis_RRL_inputE_Width_2.d + '/' + this.dis_RRL_inputE_Width_2.d);
       }
       
   


       b.RLL_E_dot_Line_1 = [{x:443 + b.widthDifference,y:195},{x:443 + b.widthDifference, y:905 }]  
      //  b.RLL_E_dot_Line_2 = [{x:443 + b.widthDifference,y:905 - this.RLL_inputE_Height*10*b.rate},{x:443 + b.widthDifference,y:905}]
       b.R_Elbow_1 = [{x:b.upline_pos[1].x, y:195},{x:443 + b.widthDifference,y:905-10*b.rate*this.RRL_inputE_Height}]
       b.R_Elbow_2 = [{x:443 + b.widthDifference,y:905-10*b.rate*this.RRL_inputE_Height},{x:443+b.widthDifference - 10*b.rate*this.RRL_inputE_Width_2,y:905}]

       }
    
       if(this.RRR_inputE_Width_1){

        // rect , rightline remove
        b.ruRectmove = b.initSignle_pos
        b.rbRectmove = b.initSignle_pos;
        b.rightline_pos = b.init2d_pos;
       // change
       b.downline_pos =  [{x:ele.downLine.getPosition()[0].x, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * b.rate *(this.RRR_inputE_Width_1+this.RRR_inputE_Width_2), y:ele.downLine.getPosition()[1].y},]
       b.downletter = {x:ele.downmainGroup.getPosition().x-10 * b.rate *(this.RRR_inputE_Width_1+this.RRR_inputE_Width_2)/2,y:ele.downmainGroup.getPosition().y}

       b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
       b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
       b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
       b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
       b.drTip_pos = {x:b.downline_pos[1].x, y:935};

       // //first rightline
       b.CU_rArrowline =[{x:480+b.widthDifference, y:195}, {x:480+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10},]
       b.CU_rgupArrowP = [{x:470+b.widthDifference, y:195}, {x:490+b.widthDifference, y:195},]
       b.CU_rgupTip = {x:480+b.widthDifference, y:195}
       b.CU_rgdownTip = {x:480+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10}
       b.CRUH_Group = {x:460 + b.widthDifference , y:23 + (710-this.RRR_inputE_Height*b.rate*10) / 2}
   


       this.tempHeight = math.subtract(ele.right_Heightletter.returnValue(),this.dis_RRR_inputE_Height)
       if(this.tempHeight.n%this.tempHeight.d == 0) {
         ele.C_RUH_Letter.changeletter('' + parseInt(this.tempHeight.n/this.tempHeight.d));
         } else {
         ele.C_RUH_Letter.changeletter(''+parseInt(this.tempHeight.n/this.tempHeight.d)+ '-'+this.tempHeight.n%this.tempHeight.d + '/' + this.tempHeight.d);
       }

       // second rightline
       b.RU_rArrowline =[{x:480+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10}, {x:480+b.widthDifference, y:905},]
       b.RU_rgupArrowP = [{x:470+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10}, {x:490+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10},]
       b.RU_rgupTip = {x:480+b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10}
       b.RU_rgdownTip = {x:480+b.widthDifference, y:905}
   
       b.RRUH_Group = {x:460 + b.widthDifference , y:23 + 710 - 10 * b.rate * this.RRR_inputE_Height / 2}

       if(this.dis_RRR_inputE_Height.n%this.dis_RRR_inputE_Height.d == 0) {
         ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_RRR_inputE_Height.n/this.dis_RRR_inputE_Height.d));
         } else {
         ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_RRR_inputE_Height.n/this.dis_RRR_inputE_Height.d)+ '-'+this.dis_RRR_inputE_Height.n%this.dis_RRR_inputE_Height.d + '/' + this.dis_RRR_inputE_Height.d);
       }


       // horizon line
       b.CR_upArrowline =  [{x:ele.downLine.getPosition()[1].x-10*b.rate*this.RRR_inputE_Width_1, y:935}, {x:ele.downLine.getPosition()[1].x, y:935},]
       b.CR_ulArrowP = [{x:ele.downLine.getPosition()[1].x, y:945}, {x:ele.downLine.getPosition()[1].x, y:925},]
       b.CR_ulTip = {x:ele.downLine.getPosition()[1].x-10*b.rate*this.RRR_inputE_Width_1, y:935}
       b.CR_urTip = {x:ele.downLine.getPosition()[1].x , y:935}

       b.CRUW_Group = {x:415 + b.widthDifference - 10 *this.RRR_inputE_Width_1/2* b.rate , y:915}
     
        if(this.dis_RRR_inputE_Width_1.n%this.dis_RRR_inputE_Width_1.d == 0) {
         ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RRR_inputE_Width_1.n/this.dis_RRR_inputE_Width_1.d));
         } else {
         ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RRR_inputE_Width_1.n/this.dis_RRR_inputE_Width_1.d)+ '-'+this.dis_RRR_inputE_Width_1.n%this.dis_RRR_inputE_Width_1.d + '/' + this.dis_RRR_inputE_Width_1.d);
       }

       b.RR_upArrowline =  [{x:b.downline_pos[1].x, y:935}, {x:b.CR_upArrowline[0].x, y:935},]
       b.RR_ulArrowP = [{x:b.CR_upArrowline[0].x , y:945}, {x:b.CR_upArrowline[0].x , y:925},]
      //  b.extra_p3 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:205}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:185},]
       b.RR_ulTip = {x:b.downline_pos[1].x, y:935}
       b.RR_urTip = {x:b.CR_upArrowline[0].x , y:935}
       b.RRUW_Group = {x:415 + b.widthDifference - 10 * (this.RRR_inputE_Width_2/2+this.RRR_inputE_Width_1) * b.rate , y:915}

       if(this.dis_RRR_inputE_Width_2.n%this.dis_RRR_inputE_Width_2.d == 0) {
         ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_RRR_inputE_Width_2.n/this.dis_RRR_inputE_Width_2.d));
         } else {
         ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_RRR_inputE_Width_2.n/this.dis_RRR_inputE_Width_2.d)+ '-'+this.dis_RRR_inputE_Width_2.n%this.dis_RRR_inputE_Width_2.d + '/' + this.dis_RRR_inputE_Width_2.d);
       }
      
       b.RLL_E_dot_Line_1 = [{x:443 + b.widthDifference,y:195},{x:443 + b.widthDifference, y:905-this.RRR_inputE_Height*b.rate*10 }]  
       b.RLL_E_dot_Line_2 = [{x:443 + b.widthDifference-10*b.rate*this.RRR_inputE_Width_1,y:905-this.RRR_inputE_Height*b.rate*10},{x:443 + b.widthDifference-10*b.rate*this.RRR_inputE_Width_1,y:905}]
       b.R_Elbow_1 = [{x:443 + b.widthDifference,y:195},{x:443 + b.widthDifference-10*b.rate*this.RRR_inputE_Width_1,y:905-10*b.rate*this.RRR_inputE_Height}]
       b.R_Elbow_2 = [{x:443 + b.widthDifference-10*b.rate*this.RRR_inputE_Width_1,y:905-10*b.rate*this.RRR_inputE_Height},{x:443+b.widthDifference - 10*b.rate*(this.RRR_inputE_Width_1+this.RRR_inputE_Width_2),y:905}]

       }

        b.dis_leftHeight = ele.left_Heightletter.returnValue()
        b.dis_rightHeight = ele.right_Heightletter.returnValue()
        b.dis_upWidth = math.subtract(ele.up_Widthletter.returnValue(),(this.dis_RL_TopRight+(this.dis_RLL_inputE_Width_1+this.dis_RLL_inputE_Width_2)+(this.dis_RLR_inputE_Width_1-this.dis_RLR_inputE_Width_2)+this.dis_RRL_inputE_Width_1))
        b.dis_downWidth = math.subtract(ele.down_Widthletter.returnValue(),(this.dis_RL_TopLeft+this.dis_RRL_inputE_Width_2+(this.dis_RRR_inputE_Width_1+this.dis_RRR_inputE_Width_2)))
        b.draw();

      }
    }

    function bottomOutage() {
      this.Handle = "bottomOutage";
      this.draw = function(context) {

        var simpleParameter = [];
      
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'bottomOutage';
        })
        this.parameter = simpleParameter[0]

        this.leftRight = this.parameter.value[0].leftRight;
        this.dis_leftRight = this.parameter.value[0].leftRight;
        if(this.leftRight) {
          this.leftRight=(this.leftRight>10)?this.leftRight:10;
        }

        this.rightLeft = this.parameter.value[0].rightLeft;
        this.dis_rightLeft = this.parameter.value[0].rightLeft;
        if(this.rightLeft) {
          this.rightLeft=(this.rightLeft>10)?this.rightLeft:10;
        }

        var b = new initDraw(context);
        var ele = new definitionObject();

        if(this.leftRight) {
          b.lbRectmove = b.initSignle_pos;
          b.rbRectmove = b.initSignle_pos;
          b.downline_pos = b.init2d_pos;

          b.rightletter = {x:ele.rightmainGroup.getPosition().x,y:ele.rightmainGroup.getPosition().y-this.leftRight*b.rate*10/2}
         
          b.rightline_pos = [{x:ele.rightLine.getPosition()[0].x,y:ele.rightLine.getPosition()[0].y},{x:ele.rightLine.getPosition()[1].x,y:ele.rightLine.getPosition()[1].y-this.leftRight*b.rate*10},]
         
          b.rArrowline_pos =  [{x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y},  {x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y},]
          b.rgupArrowP_pos = [{x:b.rightline_pos[0].x-10+77, y:b.rightline_pos[0].y}, {x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[0].y}]
          b.rgdownArrowP_pos = [{x:b.rightline_pos[1].x-10+77, y:b.rightline_pos[1].y},{x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[1].y}]
          b.rgupTip_pos = {x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y};
          b.rgdownTip_pos ={x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y};


          b.CD_rArrowline = [{x:520 + b.widthDifference, y:905}, {x:520 + b.widthDifference, y:b.rightline_pos[1].y},]
          b.CD_rgdownArrowP = [{x:510 + b.widthDifference, y:905}, {x:530 + b.widthDifference, y:905},]
          b.CD_rgupTip = {x:520 + b.widthDifference, y:b.rightline_pos[1].y}
          b.CD_rgdownTip = {x:520 + b.widthDifference, y:905}

          b.CRBH_Group = {x:500 + b.widthDifference , y:731-10*b.rate*this.leftRight/2}

          if(this.dis_leftRight.n%this.dis_leftRight.d == 0) {
            ele.C_RBH_Letter.changeletter('' + parseInt(this.dis_leftRight.n/this.dis_leftRight.d));
            } else {
            ele.C_RBH_Letter.changeletter(''+parseInt(this.dis_leftRight.n/this.dis_leftRight.d)+ '-'+this.dis_leftRight.n%this.dis_leftRight.d + '/' + this.dis_leftRight.d);
          }

          this.cr_dline = [{x:b.leftline_pos[1].x,y:b.leftline_pos[1].y},{x:b.rightline_pos[1].x,y:b.rightline_pos[1].y}]
          this.D_dot_Line = ele.downLine.getPosition();

          ele.D_dot_Line.drawPath(this.D_dot_Line);
          ele.CR_dline.drawPath(this.cr_dline)
         
        }

        if(this.rightLeft) {
          b.lbRectmove = b.initSignle_pos;
          b.rbRectmove = b.initSignle_pos;
          b.downline_pos = b.init2d_pos;

          b.leftletter =  {x:ele.leftmainGroup.getPosition().x,y:ele.leftmainGroup.getPosition().y-this.rightLeft*b.rate*10/2}
          b.leftline_pos = [{x:ele.leftLine.getPosition()[0].x,y:ele.leftLine.getPosition()[0].y},{x:ele.leftLine.getPosition()[1].x,y:ele.leftLine.getPosition()[1].y-this.rightLeft*b.rate*10},]
       
          b.lArrowline_pos =  [{x:52, y:b.leftline_pos[0].y},  {x:52, y:b.leftline_pos[1].y},]
          b.lfupArrowP_pos = [{x:40 , y:b.leftline_pos[0].y}, {x:65, y:b.leftline_pos[0].y}]
          b.lfdownArrowP_pos = [{x:40, y:b.leftline_pos[1].y},{x:65, y:b.leftline_pos[1].y}]
          b.lfupTip_pos = {x:52, y:b.leftline_pos[0].y};
          b.lfdownTip_pos ={x:52, y:b.leftline_pos[1].y};

          b.CD_lArrowline = [{x:52, y:905}, {x:52, y:b.leftline_pos[1].y},]
          b.CD_lfdownArrowP =[{x:40, y:905}, {x:65, y:905},]
          b.CD_lfupTip = {x:52, y:b.leftline_pos[1].y}
          b.CD_lfdownTip = {x:52, y:905}

          b.CLBH_Group = {x:32 , y:731 - 10 * b.rate * this.rightLeft/2}
         
          if(this.dis_rightLeft.n%this.dis_rightLeft.d == 0) {
              ele.C_LBH_letter.changeletter('' + parseInt(this.dis_rightLeft.n/this.dis_rightLeft.d));
              } else {
              ele.C_LBH_Letter.changeletter(''+parseInt(this.dis_rightLeft.n/this.dis_rightLeft.d)+ '-'+this.dis_rightLeft.n%this.dis_rightLeft.d + '/' + this.dis_rightLeft.d);
            }

            this.cl_dline = [{x:b.rightline_pos[1].x,y:b.rightline_pos[1].y},{x:b.leftline_pos[1].x,y:b.leftline_pos[1].y}]
            this.D_dot_Line = ele.downLine.getPosition();
  
            ele.D_dot_Line.drawPath(this.D_dot_Line);
            ele.CL_dline.drawPath(this.cl_dline)
        }

        b.dis_leftHeight = math.subtract(ele.left_Heightletter.returnValue(),this.dis_rightLeft)
        b.dis_rightHeight = math.subtract(ele.right_Heightletter.returnValue(),this.dis_leftRight)
        b.dis_upWidth = ele.up_Widthletter.returnValue()
        b.dis_downWidth =ele.down_Widthletter.returnValue()
        b.draw();






      }
    }

    function notch() {

      this.Handle = "notch";
      this.draw = function(context) {
       
        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'notch';
       })

          this.parameter = simpleParameter[0]
  
          this.LT_notch_width1 = this.parameter.value[0].width1;
          this.dis_LT_notch_width1 = this.parameter.value[0].width1;
          if(this.LT_notch_width1) {
            this.LT_notch_width1=(this.LT_notch_width1>10)?this.LT_notch_width1:10;
            
            this.dis_LT_notch_width2 = this.parameter.value[0].width2;
            if(this.dis_LT_notch_width2) {
              this.LT_notch_width1=(this.LT_notch_width1>20)?this.LT_notch_width1:20;
              this.LT_notch_width2 = this.LT_notch_width1/2;
            }
          }
          
          this.LT_notch_height1 = this.parameter.value[0].height1;
          this.dis_LT_notch_height1 = this.parameter.value[0].height1;
          if(this.LT_notch_height1) {
            this.LT_notch_height1=(this.LT_notch_height1>10)?this.LT_notch_height1:10;
          this.dis_LT_notch_height2 = this.parameter.value[0].height2;
            if(this.dis_LT_notch_height2) {
              this.LT_notch_height1=(this.LT_notch_height1>20)?this.LT_notch_height1:20;
              this.LT_notch_height2 = this.LT_notch_height1/2;
            }
          }
    
          this.RT_notch_width1 = this.parameter.value[1].width1;
          this.dis_RT_notch_width1 = this.parameter.value[1].width1;
          if(this.RT_notch_width1) {
            this.RT_notch_width1=(this.RT_notch_width1>10)?this.RT_notch_width1:10;
           
            this.dis_RT_notch_width2 = this.parameter.value[1].width2;
            if(this.dis_RT_notch_width2) {
            this.RT_notch_width1=(this.RT_notch_width1>20)?this.RT_notch_width1:20;
            this.RT_notch_width2 = this.RT_notch_width1/2;
            }
          }

          this.RT_notch_height1 = this.parameter.value[1].height1;
          this.dis_RT_notch_height1 = this.parameter.value[1].height1;
          if(this.RT_notch_height1) {
            this.RT_notch_height1=(this.RT_notch_height1>10)?this.RT_notch_height1:10;
           
            this.dis_RT_notch_height2 = this.parameter.value[1].height2;
            if(this.dis_RT_notch_height2) {
              this.RT_notch_height1=(this.RT_notch_height1>20)?this.RT_notch_height1:20;
              this.RT_notch_height2 = this.RT_notch_height1/2;
            }
          }

          this.LB_notch_width1 = this.parameter.value[2].width1;
          this.dis_LB_notch_width1 = this.parameter.value[2].width1;
          if(this.LB_notch_width1) {
            this.LB_notch_width1=(this.LB_notch_width1>10)?this.LB_notch_width1:10;
          
            this.dis_LB_notch_width2 = this.parameter.value[2].width2;
            if(this.dis_LB_notch_width2) {
            this.LB_notch_width1=(this.LB_notch_width1>20)?this.LB_notch_width1:20;
            this.LB_notch_width2 = this.LB_notch_width1/2;
            }
          }

          this.LB_notch_height1 = this.parameter.value[2].height1;
          this.dis_LB_notch_height1 = this.parameter.value[2].height1;
          if(this.LB_notch_height1) {
            this.LB_notch_height2=(this.LB_notch_height2>10)?this.LB_notch_height2:10;
           
            this.dis_LB_notch_height2 = this.parameter.value[2].height2;
            if(this.dis_LB_notch_height2) {
              this.LB_notch_height1=(this.LB_notch_height1>20)?this.LB_notch_height1:20;
              this.LB_notch_height2 = this.LB_notch_height1/2;
            }
          }

          this.RB_notch_width1 = this.parameter.value[3].width1;
          this.dis_RB_notch_width1 = this.parameter.value[3].width1;
          if(this.RB_notch_width1) {
            this.RB_notch_width1=(this.RB_notch_width1>10)?this.RB_notch_width1:10;
           
            this.dis_RB_notch_width2 =  this.parameter.value[3].width2;
            if(this.dis_RB_notch_width2) {
              this.RB_notch_width1=(this.RB_notch_width1>20)?this.RB_notch_width1:20;
              this.RB_notch_width2 = this.RB_notch_width1/2;
            }
          }

          this.RB_notch_height1 = this.parameter.value[3].height1;
          this.dis_RB_notch_height1 = this.parameter.value[3].height1;
          if(this.RB_notch_height1) {
            this.RB_notch_height1=(this.RB_notch_height1>10)?this.RB_notch_height1:10;
          
            this.dis_RB_notch_height2 = this.parameter.value[3].height2;
            if(this.dis_RB_notch_height2) {
              this.RB_notch_height1=(this.RB_notch_height1>20)?this.RB_notch_height1:20;
              this.RB_notch_height2 = this.RB_notch_height1/2;
            }
          }


          var b = new initDraw(context);
          var ele = new definitionObject();

          b.upletter = {x:ele.upmainGroup.getPosition().x + (this.LT_notch_width1 - this.RT_notch_width1 ) *10*b.rate/2 , y: ele.upmainGroup.getPosition().y}
          b.rightletter = {x:ele.rightmainGroup.getPosition().x , y:ele.rightmainGroup.getPosition().y+ (this.RT_notch_height1 - this.RB_notch_height1)*10*b.rate/2}
          b.downletter = {x:ele.downmainGroup.getPosition().x +(this.LB_notch_width1-this.RB_notch_width1)*10*b.rate/2,y:ele.downmainGroup.getPosition().y}
          b.leftletter = {x:ele.leftmainGroup.getPosition().x,  y:ele.leftmainGroup.getPosition().y + (this.LT_notch_height1-this.LB_notch_height1)*10*b.rate/2}
         
          b.upline_pos =  [{x: ele.upLine.getPosition()[0].x + 10* this.LT_notch_width1 * b.rate , y:ele.upLine.getPosition()[0].y}, {x:ele.upLine.getPosition()[1].x -  10 * this.RT_notch_width1 * b.rate, y:ele.upLine.getPosition()[1].y},]
          b.downline_pos =  [{x:ele.downLine.getPosition()[0].x + 10 * b.rate * this.LB_notch_width1, y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x - 10 * this.RB_notch_width1 * b.rate, y:ele.downLine.getPosition()[1].y},]
          b.leftline_pos =  [ {x:ele.leftLine.getPosition()[0].x, y:ele.leftLine.getPosition()[0].y+this.LT_notch_height1*10*b.rate}, {x:ele.leftLine.getPosition()[1].x, y:ele.leftLine.getPosition()[1].y - 10 * b.rate * this.LB_notch_height1},]
          b.rightline_pos = [{x:ele.rightLine.getPosition()[0].x, y:ele.rightLine.getPosition()[0].y + 10 * b.rate * this.RT_notch_height1},{x:ele.rightLine.getPosition()[1].x, y: ele.rightLine.getPosition()[1].y - 10 * b.rate * this.RB_notch_height1},]
          
          b.upArrowline_pos =  [{x:b.upline_pos[0].x, y:165},  {x:b.upline_pos[1].x, y:165},] 
          b.ulArrowP_pos = [{x:b.upline_pos[0].x, y:175},{x:b.upline_pos[0].x, y:155}]
          b.urArrowP_pos = [{x:b.upline_pos[1].x, y:175},{x:b.upline_pos[1].x, y:155}]
          b.ulTip_pos = {x:b.upline_pos[0].x, y:165};
          b.urTip_pos = {x:b.upline_pos[1].x, y:165};

          b.downArrowline_pos =  [{x:b.downline_pos[0].x, y:935},  {x:b.downline_pos[1].x, y:935},]
          b.dlArrowP_pos = [{x:b.downline_pos[0].x, y:945},{x:b.downline_pos[0].x, y:925}]      
          b.drArrowP_pos = [{x:b.downline_pos[1].x, y:945},{x:b.downline_pos[1].x, y:925}]
          b.dlTip_pos = {x:b.downline_pos[0].x, y:935};
          b.drTip_pos = {x:b.downline_pos[1].x, y:935};

          b.rArrowline_pos =  [{x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y},  {x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y},]
          b.rgupArrowP_pos = [{x:b.rightline_pos[0].x-10+77, y:b.rightline_pos[0].y}, {x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[0].y}]
          b.rgdownArrowP_pos = [{x:b.rightline_pos[1].x-10+77, y:b.rightline_pos[1].y},{x:b.rightline_pos[1].x+10+77, y:b.rightline_pos[1].y}]
          b.rgupTip_pos = {x:b.rightline_pos[0].x+77, y:b.rightline_pos[0].y};
          b.rgdownTip_pos ={x:b.rightline_pos[1].x+77, y:b.rightline_pos[1].y};

          b.lArrowline_pos =  [{x:52, y:b.leftline_pos[0].y},  {x:52, y:b.leftline_pos[1].y},]
          b.lfupArrowP_pos = [{x:40 , y:b.leftline_pos[0].y}, {x:65, y:b.leftline_pos[0].y}]
          b.lfdownArrowP_pos = [{x:40, y:b.leftline_pos[1].y},{x:65, y:b.leftline_pos[1].y}]
          b.lfupTip_pos = {x:52, y:b.leftline_pos[0].y};
          b.lfdownTip_pos ={x:52, y:b.leftline_pos[1].y};

          if(this.dis_LT_notch_width1||this.dis_LT_notch_height1) {
             b.luRectmove = b.upline_pos[0]
             b.luRectmove1 = b.leftline_pos[0]
            this.LT_notch_width_path1 = [{x:b.leftline_pos[0].x, y:b.leftline_pos[0].y},{x:b.upline_pos[0].x,y:b.leftline_pos[0].y}]
            this.LT_notch_height_path1 = [{x:b.upline_pos[0].x,y:b.upline_pos[0].y},{x:b.upline_pos[0].x,y:b.leftline_pos[0].y}]
            ele.LT_notch_width_path1.drawPath(this.LT_notch_width_path1)
            ele.LT_notch_height_path1.drawPath(this.LT_notch_height_path1)

            
            b.CL_upArrowline = [{x: 163, y:165}, {x:b.upline_pos[0].x , y:165},]
            b.CL_ulArrowP = [{x:163, y:175}, {x:163, y:155},]
            b.CL_ulTip = {x:163, y:165}
            b.CL_urTip = {x:b.upline_pos[0].x, y:165};
                
            b.CU_lArrowline =[{x:52, y:195}, {x:52, y:b.leftline_pos[0].y},]
            b.CU_lfupArrowP =[{x:40, y:195}, {x:65, y:195},]
            b.CU_lfupTip = {x:52, y:195}
            b.CU_lfdownTip = {x:52, y:b.leftline_pos[0].y}

            
            b.CLUW_Group = {x:135 + 10 * b.rate/2 * this.LT_notch_width1 , y:145}
            b.CLUH_Group = {x:32 , y:20 + 10 *b.rate*this.LT_notch_height1/2}

           

            if(this.dis_LT_notch_width1.n%this.dis_LT_notch_width1.d == 0) {
              ele.C_LUW_Letter.changeletter('' + parseInt(this.dis_LT_notch_width1.n/this.dis_LT_notch_width1.d));
              } else {
              ele.C_LUW_Letter.changeletter(''+parseInt(this.dis_LT_notch_width1.n/this.dis_LT_notch_width1.d)+ '-'+this.dis_LT_notch_width1.n%this.dis_LT_notch_width1.d + '/' + this.dis_LT_notch_width1.d);
            }
  
            if(this.dis_LT_notch_height1.n%this.dis_LT_notch_height1.d == 0) {
              ele.C_LUH_Letter.changeletter('' + parseInt(this.dis_LT_notch_height1.n/this.dis_LT_notch_height1.d));
              } else {
              ele.C_LUH_Letter.changeletter(''+parseInt(this.dis_LT_notch_height1.n/this.dis_LT_notch_height1.d)+ '-'+this.dis_LT_notch_height1.n%this.dis_LT_notch_height1.d + '/' + this.dis_LT_notch_height1.d);
            }
            
              if(this.dis_LT_notch_width2||this.dis_LT_notch_height2){

                this.LT_notch_width_path1 = [{x:b.leftline_pos[0].x,y:b.leftline_pos[0].y},{x:b.upline_pos[0].x - 10*b.rate*this.LT_notch_width2,y:b.leftline_pos[0].y}]
                this.LT_notch_height_path1 = [{x:b.upline_pos[0].x-this.LT_notch_width2*10*b.rate,y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2},{x:b.upline_pos[0].x - 10*b.rate*this.LT_notch_width2,y:b.leftline_pos[0].y}]
                this.LT_notch_width_path2 = [{x:b.upline_pos[0].x-this.LT_notch_width2*10*b.rate,y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2},{x:b.upline_pos[0].x,y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2}]
                this.LT_notch_height_path2 = [{x:b.upline_pos[0].x,y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2},{x:b.upline_pos[0].x,y:b.upline_pos[0].y}]
              
                ele.LT_notch_width_path1.drawPath(this.LT_notch_width_path1)
                ele.LT_notch_height_path1.drawPath(this.LT_notch_height_path1)
                ele.LT_notch_width_path2.drawPath(this.LT_notch_width_path2)
                ele.LT_notch_height_path2.drawPath(this.LT_notch_height_path2)

                b.RL_upArrowline = [{x: 163 + 10*b.rate*this.LT_notch_width2, y:195}, {x:b.upline_pos[0].x , y:195},]
                b.RL_ulArrowP = [{x:163 + 10*b.rate*this.LT_notch_width2, y:205}, {x:163 + 10*b.rate*this.LT_notch_width2, y:185},]
                b.extra_p1 = [{x:b.upline_pos[0].x, y:205}, {x:b.upline_pos[0].x, y:185},]
                b.RL_ulTip ={x:163 + 10*b.rate*this.LT_notch_width2, y:195}
                b.RL_urTip ={x:b.upline_pos[0].x, y:195};
                    
                b.RU_lArrowline =[{x:163, y:195}, {x:163, y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2},]
                b.RU_lfupArrowP =[{x:158, y:195}, {x:168, y:195},]
                b.extra_p2 =[{x:158, y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2}, {x:168, y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2},]
                b.RU_lfupTip = {x:163, y:195}
                b.RU_lfdownTip = {x:163, y:b.upline_pos[0].y+10*b.rate*this.LT_notch_height2}



                b.RLUW_Group = {x:135 + 10 * b.rate*3/4 * this.LT_notch_width1 , y:175}
                b.RLUH_Group = {x:142 , y:20 + 10 *b.rate*this.LT_notch_height2/2}
             

                if(this.dis_LT_notch_width2.n%this.dis_LT_notch_width2.d == 0) {
                  ele.R_LUW_Letter.changeletter('' + parseInt(this.dis_LT_notch_width2.n/this.dis_LT_notch_width2.d));
                  } else {
                  ele.C_LUW_Letter.changeletter(''+parseInt(this.dis_LT_notch_width2.n/this.dis_LT_notch_width2.d)+ '-'+this.dis_LT_notch_width2.n%this.dis_LT_notch_width2.d + '/' + this.dis_LT_notch_width2.d);
                }
      
                if(this.dis_LT_notch_height2.n%this.dis_LT_notch_height2.d == 0) {
                  ele.R_LUH_Letter.changeletter('' + parseInt(this.dis_LT_notch_height2.n/this.dis_LT_notch_height2.d));
                  } else {
                  ele.R_LUH_Letter.changeletter(''+parseInt(this.dis_LT_notch_height2.n/this.dis_LT_notch_height2.d)+ '-'+this.dis_LT_notch_height2.n%this.dis_LT_notch_height2.d + '/' + this.dis_LT_notch_height2.d);
                }
              }
           
          } 


          if(this.dis_RT_notch_width1||this.dis_RT_notch_height1) {
            
            b.ruRectmove = {x:b.upline_pos[1].x-10,y:b.upline_pos[1].y}
            b.ruRectmove1 = {x:b.rightline_pos[0].x-10,y:b.rightline_pos[0].y}

            this.RT_notch_width_path1 = [{x:b.rightline_pos[0].x, y:b.rightline_pos[0].y},{x:b.upline_pos[1].x,y:b.rightline_pos[0].y}]
            this.RT_notch_height_path1 = [{x:b.upline_pos[1].x,y:b.upline_pos[1].y},{x:b.upline_pos[1].x,y:b.rightline_pos[0].y}]
            ele.RT_notch_width_path1.drawPath(this.RT_notch_width_path1)
            ele.RT_notch_height_path1.drawPath(this.RT_notch_height_path1)

            b.CR_upArrowline =  [{x:b.upline_pos[1].x, y:165}, {x:443 + b.widthDifference, y:165},]
            b.CR_ulArrowP = [{x:443 + b.widthDifference, y:175}, {x:443 + b.widthDifference, y:155},]
            b.CR_ulTip = {x:b.upline_pos[1].x, y:165}
            b.CR_urTip = {x:443 + b.widthDifference , y:165}
  
  
            b.CU_rArrowline =[{x:b.rArrowline_pos[0].x, y:195}, {x:b.rArrowline_pos[1].x, y:b.rightline_pos[0].y},]
            b.CU_rgupArrowP = [{x:b.rArrowline_pos[0].x-10, y:195}, {x:b.rArrowline_pos[0].x+10, y:195},]
            b.CU_rgupTip = {x:b.rArrowline_pos[0].x, y:195}
            b.CU_rgdownTip = {x:b.rArrowline_pos[0].x, y:b.rightline_pos[0].y}
        
            
            b.CRUW_Group = {x:415 + b.widthDifference - 10 * this.RT_notch_width1 * b.rate/2 , y:145}
            b.CRUH_Group = {x:500 + b.widthDifference , y:23 + 10 * b.rate * this.RT_notch_height1/ 2}
            
           
           
            if(this.dis_RT_notch_width1.n%this.dis_RT_notch_width1.d == 0) {
              ele.C_RUW_Letter.changeletter('' + parseInt(this.dis_RT_notch_width1.n/this.dis_RT_notch_width1.d));
              } else {
              ele.C_RUW_Letter.changeletter(''+parseInt(this.dis_RT_notch_width1.n/this.dis_RT_notch_width1.d)+ '-'+this.dis_RT_notch_width1.n%this.dis_RT_notch_width1.d + '/' + this.dis_RT_notch_width1.d);
            }
  
            if(this.dis_RT_notch_height1.n%this.dis_RT_notch_height1.d == 0) {
              ele.C_RUH_Letter.changeletter('' + parseInt(this.dis_RT_notch_height1.n/this.dis_RT_notch_height1.d));
              } else {
              ele.C_RUH_Letter.changeletter(''+parseInt(this.dis_RT_notch_height1.n/this.dis_RT_notch_height1.d)+ '-'+this.dis_RT_notch_height1.n%this.dis_RT_notch_height1.d + '/' + this.dis_RT_notch_height1.d);
            }


            if (this.dis_RT_notch_width2||this.dis_RT_notch_height2) {

              this.RT_notch_width_path1 = [{x:b.rightline_pos[0].x,y:b.rightline_pos[0].y},{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2,y:b.rightline_pos[0].y}]
              this.RT_notch_height_path1 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2,y:b.upline_pos[1].y+10*b.rate*this.RT_notch_height2},{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2,y:b.rightline_pos[0].y}]
              this.RT_notch_width_path2 = [{x:b.upline_pos[1].x,y:b.upline_pos[1].y+10*b.rate*this.RT_notch_height2},{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2,y:b.upline_pos[1].y+10*b.rate*this.RT_notch_height2}]
              this.RT_notch_height_path2 = [{x:b.upline_pos[1].x,y:b.upline_pos[1].y+10*b.rate*this.RT_notch_height2},{x:b.upline_pos[1].x,y:b.upline_pos[1].y}]
            
              ele.RT_notch_width_path1.drawPath(this.RT_notch_width_path1)
              ele.RT_notch_height_path1.drawPath(this.RT_notch_height_path1)
              ele.RT_notch_width_path2.drawPath(this.RT_notch_width_path2)
              ele.RT_notch_height_path2.drawPath(this.RT_notch_height_path2)

              b.RR_upArrowline =  [{x:b.upline_pos[1].x, y:195}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:195},]
              b.RR_ulArrowP = [{x:b.upline_pos[1].x , y:205}, {x:b.upline_pos[1].x , y:185},]
              b.extra_p3 = [{x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:205}, {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:185},]
              b.RR_ulTip = {x:b.upline_pos[1].x, y:195}
              b.RR_urTip = {x:b.upline_pos[1].x + 10*b.rate*this.RT_notch_width2, y:195}
    
    
              b.RU_rArrowline =[{x:443 + b.widthDifference, y:195}, {x:443 + b.widthDifference, y:b.upline_pos[0].y+10*b.rate*this.RT_notch_height2},]
              b.RU_rgupArrowP = [{x:433 + b.widthDifference, y:195}, {x:453 + b.widthDifference, y:195},]
              b.extra_p4 = [{x:433 + b.widthDifference, y:b.upline_pos[0].y+10*b.rate*this.RT_notch_height2}, {x:453 + b.widthDifference, y:b.upline_pos[0].y+10*b.rate*this.RT_notch_height2},]
              b.RU_rgupTip = {x:443 + b.widthDifference, y:195}
              b.RU_rgdownTip = {x:443 + b.widthDifference, y:b.upline_pos[0].y+10*b.rate*this.RT_notch_height2}
              
              b.RRUW_Group = {x:415 + b.widthDifference - 10 * this.RT_notch_width1 * b.rate*3/4 , y:175}
              b.RRUH_Group = {x:425 + b.widthDifference , y:23 + 10 * b.rate * this.RT_notch_height2 / 2}
    
              if(this.dis_RT_notch_width2.n%this.dis_RT_notch_width2.d == 0) {
                ele.R_RUW_Letter.changeletter('' + parseInt(this.dis_RT_notch_width2.n/this.dis_RT_notch_width2.d));
                } else {
                ele.R_RUW_Letter.changeletter(''+parseInt(this.dis_RT_notch_width2.n/this.dis_RT_notch_width2.d)+ '-'+this.dis_RT_notch_width2.n%this.dis_RT_notch_width2.d + '/' + this.dis_RT_notch_width2.d);
              }

              if(this.dis_RT_notch_height2.n%this.dis_RT_notch_height2.d == 0) {
                ele.R_RUH_Letter.changeletter('' + parseInt(this.dis_RT_notch_height2.n/this.dis_RT_notch_height2.d));
                } else {
                ele.R_RUH_Letter.changeletter(''+parseInt(this.dis_RT_notch_height2.n/this.dis_RT_notch_height2.d)+ '-'+this.dis_RT_notch_height2.n%this.dis_RT_notch_height2.d + '/' + this.dis_RT_notch_height2.d);
              }

            }
          } 


          if(this.dis_LB_notch_width1||this.dis_LB_notch_height1) {

            b.lbRectmove = {x:b.downline_pos[0].x,y:b.downline_pos[0].y-10}
            b.lbRectmove1 ={x:b.leftline_pos[1].x,y:b.leftline_pos[1].y-10}

            this.LB_notch_width_path1 = [{x:b.leftline_pos[1].x, y:b.leftline_pos[1].y},{x:b.downline_pos[0].x,y:b.leftline_pos[1].y}]
            this.LB_notch_height_path1 = [{x:b.downline_pos[0].x,y:b.downline_pos[0].y},{x:b.downline_pos[0].x,y:b.leftline_pos[1].y}]
            ele.LB_notch_height_path1.drawPath(this.LB_notch_height_path1)
            ele.LB_notch_width_path1.drawPath(this.LB_notch_width_path1)


            b.CD_lArrowline = [{x:52, y:905}, {x:52, y:b.leftline_pos[1].y},]
            b.CD_lfdownArrowP =[{x:40, y:905}, {x:65, y:905},]
            b.CD_lfupTip = {x:52, y:b.leftline_pos[1].y}
            b.CD_lfdownTip = {x:52, y:905}
  
            b.CL_downArrowline = [{x:163, y:935}, {x:b.downline_pos[0].x, y:935},]
            b.CL_dlArrowP = [{x:163, y:945}, {x:163, y:925},]
            b.CL_dlTip = {x:163, y:935}
            b.CL_drTip = {x:b.downline_pos[0].x, y:935}
  
            b.CLBW_Group = {x:135 + 10*b.rate*this.LB_notch_height1/2 , y:918}
            b.CLBH_Group = {x:32 , y:731 - 10 * b.rate * this.LB_notch_height1/2}

           
            
            if(this.dis_LB_notch_width1.n%this.dis_LB_notch_width1.d == 0) {
              ele.C_LBW_Letter.changeletter('' + parseInt(this.dis_LB_notch_width1.n/this.dis_LB_notch_width1.d));
              } else {
              ele.C_LBW_Letter.changeletter(''+parseInt(this.dis_LB_notch_width1.n/this.dis_LB_notch_width1.d)+ '-'+this.dis_LB_notch_width1.n%this.dis_LB_notch_width1.d + '/' + this.dis_LB_notch_width1.d);
            }
  
            if(this.dis_LB_notch_height1.n%this.dis_LB_notch_height1.d == 0) {
              ele.C_LBH_letter.changeletter('' + parseInt(this.dis_LB_notch_height1.n/this.dis_LB_notch_height1.d));
              } else {
              ele.C_LBH_Letter.changeletter(''+parseInt(this.dis_LB_notch_height1.n/this.dis_LB_notch_height1.d)+ '-'+this.dis_LB_notch_height1.n%this.dis_LB_notch_height1.d + '/' + this.dis_LB_notch_height1.d);
            }

            if(this.dis_LB_notch_width2||this.dis_LB_notch_height2) {

              this.LB_notch_width_path1 = [{x:b.leftline_pos[1].x,y:b.leftline_pos[1].y},{x:b.downline_pos[0].x-this.LB_notch_width2*10*b.rate,y:b.leftline_pos[1].y}]
              this.LB_notch_height_path1 = [{x:b.downline_pos[0].x-this.LB_notch_width2*10*b.rate,y:b.leftline_pos[1].y},{x:b.downline_pos[0].x-this.LB_notch_width2*10*b.rate,y:b.downline_pos[0].y-this.LB_notch_height2*10*b.rate}]
              this.LB_notch_width_path2 = [{x:b.downline_pos[0].x-this.LB_notch_width2*10*b.rate,y:b.downline_pos[0].y-this.LB_notch_height2*10*b.rate},{x:b.downline_pos[0].x,y:b.downline_pos[0].y-this.LB_notch_height2*10*b.rate}]
              this.LB_notch_height_path2 = [{x:b.downline_pos[0].x,y:b.downline_pos[0].y-this.LB_notch_height2*10*b.rate},{x:b.downline_pos[0].x,y:b.downline_pos[0].y}]
           
              ele.LB_notch_width_path1.drawPath(this.LB_notch_width_path1)
              ele.LB_notch_height_path1.drawPath(this.LB_notch_height_path1)
              ele.LB_notch_width_path2.drawPath(this.LB_notch_width_path2)
              ele.LB_notch_height_path2.drawPath(this.LB_notch_height_path2)




              b.RL_downArrowline = [{x:163+ 10*b.rate*this.LB_notch_width2, y:905}, {x:b.downline_pos[0].x, y:905},]
              b.RL_dlArrowP = [{x:163+ 10*b.rate*this.LB_notch_width2, y:915}, {x:163+ 10*b.rate*this.LB_notch_width2, y:895},]
              b.extra_p5 = [{x:b.downline_pos[0].x, y:915}, {x:b.downline_pos[0].x, y:895},]
              b.RL_dlTip = {x:163+ 10*b.rate*this.LB_notch_width2, y:905}
              b.RL_drTip = {x:b.downline_pos[0].x, y:905}


              b.RD_lArrowline = [{x:163, y:905}, {x:163, y:b.downline_pos[1].y-10*b.rate*this.LB_notch_height2},]
              b.RD_lfdownArrowP =[{x:158, y:905}, {x:168, y:905},]
              b.extra_p6 = [{x:158, y:b.downline_pos[1].y-10*b.rate*this.LB_notch_height2}, {x:168, y:b.downline_pos[1].y-10*b.rate*this.LB_notch_height2},]
             
              b.RD_lfupTip = {x:163, y:b.downline_pos[1].y-10*b.rate*this.LB_notch_height2}
              b.RD_lfdownTip = {x:163, y:905}
    
            
    
              b.RLBW_Group = {x:135 + 10*b.rate*this.LB_notch_width1*3/4 , y:885}
              b.RLBH_Group = {x:144 , y:731-10*b.rate*this.LB_notch_height2/2}
            
              if(this.dis_LB_notch_width2.n%this.dis_LB_notch_width2.d == 0) {
                ele.R_LBW_Letter.changeletter('' + parseInt(this.dis_LB_notch_width2.n/this.dis_LB_notch_width2.d));
                } else {
                ele.R_LBW_Letter.changeletter(''+parseInt(this.dis_LB_notch_width2.n/this.dis_LB_notch_width2.d)+ '-'+this.dis_LB_notch_width2.n%this.dis_LB_notch_width2.d + '/' + this.dis_LB_notch_width2.d);
              }
    
              if(this.dis_LB_notch_height2.n%this.dis_LB_notch_height2.d == 0) {
                ele.R_LBH_letter.changeletter('' + parseInt(this.dis_LB_notch_height2.n/this.dis_LB_notch_height2.d));
                } else {
                ele.R_LBH_letter.changeletter(''+parseInt(this.dis_LB_notch_height2.n/this.dis_LB_notch_height2.d)+ '-'+this.dis_LB_notch_height2.n%this.dis_LB_notch_height2.d + '/' + this.dis_LB_notch_height2.d);
              }

            }
          }

          if(this.dis_RB_notch_width1||this.dis_RB_notch_height1) {

            b.rbRectmove = {x:b.rightline_pos[1].x-10,y:b.rightline_pos[1].y-10}
            b.rbRectmove1 ={x:b.downline_pos[1].x-10,y:b.downline_pos[1].y-10}

            this.RB_notch_width_path1 = [{x:b.rightline_pos[1].x, y:b.rightline_pos[1].y},{x:b.downline_pos[1].x,y:b.rightline_pos[1].y}]
            this.RB_notch_height_path1 = [{x:b.downline_pos[1].x,y:b.downline_pos[1].y},{x:b.downline_pos[1].x,y:b.rightline_pos[1].y}]
            ele.RB_notch_width_path1.drawPath(this.RB_notch_width_path1)
            ele.RB_notch_height_path1.drawPath(this.RB_notch_height_path1)


            b.CR_downArrowline = [{x:b.downline_pos[1].x, y:935}, {x:443 + b.widthDifference, y:935},]
            b.CR_dlArrowP = [{x:443 + b.widthDifference, y:945}, {x:443 + b.widthDifference, y:925},]
            b.CR_dlTip ={x:b.downline_pos[1].x, y:935}
            b.CR_drTip = {x:443 + b.widthDifference, y:935}
           
            b.CD_rArrowline = [{x:520 + b.widthDifference, y:905}, {x:520 + b.widthDifference, y:b.rightline_pos[1].y},]
            b.CD_rgdownArrowP = [{x:510 + b.widthDifference, y:905}, {x:530 + b.widthDifference, y:905},]
            b.CD_rgupTip = {x:520 + b.widthDifference, y:b.rightline_pos[1].y}
            b.CD_rgdownTip = {x:520 + b.widthDifference, y:905}
  
            b.CRBW_Group = {x:415 + b.widthDifference -10*this.RB_notch_width1/2*b.rate, y:915}
            b.CRBH_Group = {x:500 + b.widthDifference , y:731-10*b.rate*this.RB_notch_height1/2}
          
          
            

            if(this.dis_RB_notch_width1.n%this.dis_RB_notch_width1.d == 0) {
              ele.C_RBW_Letter.changeletter('' + parseInt(this.dis_RB_notch_width1.n/this.dis_RB_notch_width1.d));
              } else {
              ele.C_RBW_Letter.changeletter(''+parseInt(this.dis_RB_notch_width1.n/this.dis_RB_notch_width1.d)+ '-'+this.dis_RB_notch_width1.n%this.dis_RB_notch_width1.d + '/' + this.dis_RB_notch_width1.d);
            }
  
            if(this.dis_RB_notch_height1.n%this.dis_RB_notch_height1.d == 0) {
              ele.C_RBH_Letter.changeletter('' + parseInt(this.dis_RB_notch_height1.n/this.dis_RB_notch_height1.d));
              } else {
              ele.C_RBH_Letter.changeletter(''+parseInt(this.dis_RB_notch_height1.n/this.dis_RB_notch_height1.d)+ '-'+this.dis_RB_notch_height1.n%this.dis_RB_notch_height1.d + '/' + this.dis_RB_notch_height1.d);
            }

            if(this.dis_RB_notch_width2||this.dis_RB_notch_height2) {

              this.RB_notch_width_path1 = [{x:b.rightline_pos[1].x,y:b.rightline_pos[1].y},{x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2,y:b.rightline_pos[1].y}]
              this.RB_notch_height_path1 = [{x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2,y:b.downline_pos[1].y-10*b.rate*this.RB_notch_height2},{x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2,y:b.rightline_pos[1].y}]
              this.RB_notch_width_path2 = [{x:b.downline_pos[1].x,y:b.downline_pos[1].y-10*b.rate*this.RB_notch_height2},{x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2,y:b.downline_pos[1].y-10*b.rate*this.RB_notch_height2}]
              this.RB_notch_height_path2 = [{x:b.downline_pos[1].x,y:b.downline_pos[1].y-10*b.rate*this.RB_notch_height2},{x:b.downline_pos[1].x,y:b.downline_pos[1].y}]
            
              ele.RB_notch_width_path1.drawPath(this.RB_notch_width_path1)
              ele.RB_notch_height_path1.drawPath(this.RB_notch_height_path1)
              ele.RB_notch_width_path2.drawPath(this.RB_notch_width_path2)
              ele.RB_notch_height_path2.drawPath(this.RB_notch_height_path2)

              b.RR_downArrowline = [{x:b.downline_pos[1].x, y:905}, {x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2, y:905},]
              b.RR_dlArrowP = [{x:b.downline_pos[1].x, y:915}, {x:b.downline_pos[1].x, y:895},]
              b.extra_p7 = [{x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2, y:915}, {x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2, y:895},]
              b.RR_dlTip ={x:b.downline_pos[1].x, y:905}
              b.RR_drTip = {x:b.downline_pos[1].x + 10*b.rate*this.RB_notch_width2, y:905}


              b.RD_rArrowline = [{x: 443 + b.widthDifference, y:905}, {x: 443 + b.widthDifference, y:b.downline_pos[1].y-this.RB_notch_height2*b.rate*10},]
              b.RD_rgdownArrowP = [{x:433 + b.widthDifference, y:905}, {x:453 + b.widthDifference, y:905},]
              b.extra_p8 = [{x:433 + b.widthDifference, y:b.downline_pos[1].y-10*this.RB_notch_height2*b.rate}, {x:453 + b.widthDifference, y:b.downline_pos[1].y-10*this.RB_notch_height2*b.rate},]
              b.RD_rgupTip = {x:443 + b.widthDifference, y:b.downline_pos[1].y-10*this.RB_notch_height2*b.rate}
              b.RD_rgdownTip = {x:443 + b.widthDifference, y:905}

              b.RRBW_Group = {x:415 + b.widthDifference -10*this.RB_notch_width1*3/4*b.rate, y:885}
              b.RRBH_Group = {x:425 + b.widthDifference , y:731-10*b.rate*this.RB_notch_width2/2}

              if(this.dis_RB_notch_width2.n%this.dis_RB_notch_width2.d == 0) {
                ele.R_RBW_Letter.changeletter('' + parseInt(this.dis_RB_notch_width2.n/this.dis_RB_notch_width2.d));
                } else {
                ele.R_RBW_Letter.changeletter(''+parseInt(this.dis_RB_notch_width2.n/this.dis_RB_notch_width2.d)+ '-'+this.dis_RB_notch_width2.n%this.dis_RB_notch_width2.d + '/' + this.dis_RB_notch_width2.d);
              }
    
              if(this.dis_RB_notch_height2.n%this.dis_RB_notch_height2.d == 0) {
                ele.R_RBH_Letter.changeletter('' + parseInt(this.dis_RB_notch_height2.n/this.dis_RB_notch_height2.d));
                } else {
                ele.R_RBH_Letter.changeletter(''+parseInt(this.dis_RB_notch_height2.n/this.dis_RB_notch_height2.d)+ '-'+this.dis_RB_notch_height2.n%this.dis_RB_notch_height2.d + '/' + this.dis_RB_notch_height2.d);
              }


            }
          }
        
          b.dis_upWidth =math.subtract( math.subtract(ele.up_Widthletter.returnValue(),this.dis_LT_notch_width1),this.dis_RT_notch_width1)

          b.dis_leftHeight = math.subtract( math.subtract(ele.left_Heightletter.returnValue(),this.dis_LT_notch_height1),this.dis_LB_notch_height1)

          b.dis_rightHeight = math.subtract(math.subtract(ele.right_Heightletter.returnValue(),this.dis_RT_notch_height1),this.dis_RB_notch_height1)

          b.dis_downWidth = math.subtract(math.subtract(ele.down_Widthletter.returnValue(),this.dis_LB_notch_width1),this.dis_RB_notch_width1)


          b.draw()
       }

    }

    function Miter() {
      this.Handle = "Miter";
      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'Miter';
       })

          this.parameter = simpleParameter[0].value
          this.LMB_letter = this.parameter[0].LMB_letter;
          this.RMB_letter = this.parameter[0].RMB_letter;
          this.LMF_letter = this.parameter[0].LMF_letter;
          this.RMF_letter = this.parameter[0].RMF_letter;

          var b = new initDraw(context);
          var ele = new definitionObject();

        
          if(this.LMB_letter) {
            this.lmbtext = this.LMB_letter + "° back"

            
            this.LM_letterG = {x:90,y:44}
            ele.LM_letterG.moveGroup(this.LM_letterG)
        
            ele.LM_letter.changeletter(this.lmbtext)
            this.calTan = math.tan(this.LMB_letter*Math.PI/180)
            b.BULine = [{x:ele.BULine.getPosition()[0].x + 30*  this.calTan,y:45},{x:ele.BULine.getPosition()[1].x,y:45}]
            b.BLLine = [{x:b.BULine[0].x,y:b.BULine[0].y},{x:163,y:75}]
            b.LM_dot = [{x:180,y:195},{x:180,y:905}]
            

          } else if(this.LMF_letter) {
            this.lmftext = this.LMF_letter + "° back"

            this.LM_letterG = {x:90,y:44}
            ele.LM_letterG.moveGroup(this.LM_letterG)

            ele.LM_letter.changeletter(this.lmftext)
            this.calTan = math.tan(this.LMF_letter*Math.PI/180)
            b.BDLine = [{x:ele.BDLine.getPosition()[0].x + 30*  this.calTan,y:75},{x:ele.BDLine.getPosition()[1].x,y:75}]
            b.BLLine = [{x:b.BDLine[0].x,y:75},{x:163,y:45}]
            b.LM_dot = [{x:180,y:195},{x:180,y:905}]
            
          }
          if(this.RMB_letter) {
            this.rmbtext = this.RMB_letter + "° front"

            ele.RM_letter.changeletter(this.rmbtext)

            this.RM_letterG = {x:470 + b.widthDifference,y:44};
            ele.RM_letterG.moveGroup(this.RM_letterG)

            this.calTan = math.tan(this.RMB_letter*Math.PI/180)
            b.BULine = [{x:ele.BULine.getPosition()[0].x,y:45},{x:ele.BULine.getPosition()[1].x-30*this.calTan,y:45}]
            b.BRLine = [b.BULine[1],{x:443+b.widthDifference,y:75}]
            b.RM_dot = [{x:425+b.widthDifference,y:195},{x:425+b.widthDifference,y:905}]
          } else if(this.RMF_letter) {
            this.rmftext = this.RMF_letter + "° front"

            ele.RM_letter.changeletter(this.rmftext)
            this.RM_letterG = {x:470 + b.widthDifference,y:44};
            ele.RM_letterG.moveGroup(this.RM_letterG)

            this.calTan = math.tan(this.RMF_letter*Math.PI/180)
            b.BDLine = [{x:ele.BDLine.getPosition()[0].x,y:75},{x:ele.BDLine.getPosition()[1].x - 30* this.calTan,y:75}]
            b.BRLine = [b.BDLine[1],{x:443+b.widthDifference,y:45}]
            b.RM_dot = [{x:425+b.widthDifference,y:195},{x:425+b.widthDifference,y:905}]
          }



          b.dis_upWidth = ele.up_Widthletter.returnValue();
          b.dis_downWidth = ele.down_Widthletter.returnValue();
          b.dis_leftHeight = ele.left_Heightletter.returnValue();
          b.dis_rightHeight = ele.right_Heightletter.returnValue()
          b.draw()
      }

    }

    function Hole() {

      this.Handle = "Hole";

      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'Hole';
       })

          this.parameter = simpleParameter[0].value;

          this.diameter = this.parameter[0].diameter;

          this.setback = this.parameter[0].setback;
          this.dis_setback = this.parameter[0].setback;
          if(this.setback) {
            this.setback=(this.setback>10)?this.setback:10;}

          this.distance = this.parameter[0].distance;
          this.dis_distance = this.parameter[0].distance;
          if(this.distance) {
            this.distance=(this.distance>10)?this.distance:10;}

          this.set_direct = this.parameter[0].set_direct;
          this.dis_direction = this.parameter[0].dis_direction;

          this.distanceB = this.parameter[1].distanceB
          this.dis_distanceB =this.parameter[1].distanceB
          if(Math.abs(this.distanceB-0)>0.00001) {
            this.distanceB=(this.distanceB>10)?this.distanceB:10;}


          this.distanceC = this.parameter[1].distanceC
          this.dis_distanceC = this.parameter[1].distanceC
          if(this.distanceC) {
            this.distanceC=(this.distanceC>10)?this.distanceC:10;}

       
          var b = new initDraw(context);
          var ele = new definitionObject();

          ele.singleCircle.setSize(this.diameter)
          ele.doubleCircle.setSize(this.diameter)


          if(this.set_direct == 'Left') {

            if(this.dis_direction == 'Top') {
            
              b.singleCircle.x = ele.leftLine.getPosition()[0].x + this.setback*10*b.rate;
              b.singleCircle.y = ele.upLine.getPosition()[0].y + this.distance*10*b.rate;

              b.SU_lArrowline = [{x:ele.upLine.getPosition()[0].x-50,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[0].x-50,y:ele.upLine.getPosition()[0].y+this.distance*10*b.rate}]
              b.SU_lfupArrowP = [{x:ele.upLine.getPosition()[0].x-60,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[0].x-40,y:ele.upLine.getPosition()[0].y}]
              b.SU_lfupTip = b.SU_lArrowline[0]
              b.SU_lfdownTip = b.SU_lArrowline[1]
              b.extra_p1 =  [{x:b.SU_lArrowline[0].x-10,y: b.SU_lArrowline[1].y},{x: b.SU_lArrowline[1].x+10,y: b.SU_lArrowline[1].y}]

              b.SL_upArrowline = [{x:ele.leftLine.getPosition()[0].x,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate + 50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate+50}]
              b.SL_ulArrowP =[{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate-10+50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate+10+50}]
              b.SL_ulTip = b.SL_upArrowline[0]
              b.SL_urTip = b.SL_upArrowline[1]

             

              // sizeLetter handle
              this.sizeCircle = "Ø " + this.diameter + "˝"

              ele.circleDiameter.changeletter(this.sizeCircle)
              b.circleDiameter.x = b.singleCircle.x + this.diameter + 10*b.rate;
              b.circleDiameter.y = b.singleCircle.y + this.diameter;


              // dimensions handle
              b.SH_group = {x:94 , y:20 + 10 *b.rate*this.distance/2}
              b.SW_group =  {x:135 + 10 * b.rate/2 * this.setback , y:225 + 10 *b.rate*this.distance}
             
              if(this.dis_setback.n%this.dis_setback.d == 0) {
                ele.SW_letter.changeletter('' + parseInt(this.dis_setback.n/this.dis_setback.d));
                } else {
                ele.SW_letter.changeletter(''+parseInt(this.dis_setback.n/this.dis_setback.d)+ '-'+this.dis_setback.n%this.dis_setback.d + '/' + this.dis_setback.d);
              }
    
              if(this.dis_distance.n%this.dis_distance.d == 0) {
                ele.SH_letter.changeletter('' + parseInt(this.dis_distance.n/this.dis_distance.d));
                } else {
                ele.SH_letter.changeletter(''+parseInt(this.dis_distance.n/this.dis_distance.d)+ '-'+this.dis_distance.n%this.dis_distance.d + '/' + this.dis_distance.d);
              }


              if(this.distanceC){

                b.doubleCircle = {x:b.singleCircle.x +  this.distanceB*10*b.rate,y:b.singleCircle.y + this.distanceC*10*b.rate}

                b.SL_upArrowline = [{x:ele.leftLine.getPosition()[0].x,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate - 50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate-50}]
                b.SL_ulArrowP =[{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate-10-50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate+10-50}]
                b.SL_ulTip = b.SL_upArrowline[0]
                b.SL_urTip = b.SL_upArrowline[1]


                b.SDU_lArrowline = [{x:b.SU_lArrowline[1].x,y: b.SU_lArrowline[1].y},{x:b.SU_lArrowline[1].x,y: b.SU_lArrowline[1].y + this.distanceC*10*b.rate}]
                b.SDU_lfupArrowP = [{x:b.SU_lArrowline[1].x-10,y: b.SU_lArrowline[1].y + this.distanceC*10*b.rate},{x:b.SU_lArrowline[1].x+10,y: b.SU_lArrowline[1].y + this.distanceC*10*b.rate}]
                b.SDU_lfupTip = b.SDU_lArrowline[0]
                b.SDU_lfdownTip = b.SDU_lArrowline[1]


                if(Math.abs(this.distanceB-0)>0.00001) {
                  b.SDL_upArrowline = [{x:b.SL_upArrowline[1].x,y:b.SL_upArrowline[1].y},{x:b.SL_upArrowline[1].x+this.distanceB*10*b.rate,y:b.SL_upArrowline[1].y}]
                  b.SDL_ulArrowP = [{x:b.SL_upArrowline[1].x+this.distanceB*10*b.rate,y:b.SL_upArrowline[1].y-10},{x:b.SL_upArrowline[1].x+this.distanceB*10*b.rate,y:b.SL_upArrowline[1].y+10}]
                  b.SDL_ulTip = b.SDL_upArrowline[0]
                  b.SDL_urTip = b.SDL_upArrowline[1]
                b.SDW_group =  {x:135 + 10 * b.rate * (this.setback)  + 10 * b.rate *this.distanceB/2 , y:225 + 10 *b.rate*this.distance-100}

                }
               
                b.SW_group =  {x:135 + 10 * b.rate/2 * this.setback , y:225 + 10 *b.rate*this.distance-100}

                b.SDH_group = {x:94 , y:20 + 10 *b.rate*(this.distance)  +this.distanceC/2*10 *b.rate}
               
                if(this.dis_distanceB.n%this.dis_distanceB.d == 0) {
                  ele.SDW_letter.changeletter('' + parseInt(this.dis_distanceB.n/this.dis_distanceB.d));
                  } else {
                  ele.SDW_letter.changeletter(''+parseInt(this.dis_distanceB.n/this.dis_distanceB.d)+ '-'+this.dis_distanceB.n%this.dis_distanceB.d + '/' + this.dis_distanceB.d);
                }
      
                if(this.dis_distanceC.n%this.dis_distanceC.d == 0) {
                  ele.SDH_letter.changeletter('' + parseInt(this.dis_distanceC.n/this.dis_distanceC.d));
                  } else {
                  ele.SDH_letter.changeletter(''+parseInt(this.dis_distanceC.n/this.dis_distanceC.d)+ '-'+this.dis_distanceC.n%this.dis_distanceC.d + '/' + this.dis_distanceC.d);
                }

              }
           
            } else if (this.dis_direction == 'Bottom') {
            
              b.singleCircle.x = ele.leftLine.getPosition()[0].x + this.setback*10*b.rate;
              b.singleCircle.y = ele.downLine.getPosition()[0].y - this.distance*10*b.rate;

              b.SU_lArrowline = [{x:ele.downLine.getPosition()[0].x-50,y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[0].x-50,y:ele.downLine.getPosition()[0].y-this.distance*10*b.rate}]
              b.SU_lfupArrowP = [{x:b.SU_lArrowline[0].x-10,y:b.SU_lArrowline[0].y},{x:b.SU_lArrowline[0].x+10,y:b.SU_lArrowline[0].y}]
              b.SU_lfupTip = b.SU_lArrowline[1]
              b.SU_lfdownTip = b.SU_lArrowline[0]

              b.SL_upArrowline = [{x:ele.leftLine.getPosition()[0].x,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate - 50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate-50}]
              b.SL_ulArrowP =[{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate-10-50},{x:ele.leftLine.getPosition()[0].x + this.setback*10*b.rate,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate+10-50}]
              b.SL_ulTip = b.SL_upArrowline[0]
              b.SL_urTip = b.SL_upArrowline[1]

             

              // sizeLetter handle
              this.sizeCircle = "Ø " + this.diameter + "˝"

              ele.circleDiameter.changeletter(this.sizeCircle)
              b.circleDiameter.x = b.singleCircle.x + this.diameter + 10*b.rate;
              b.circleDiameter.y = b.singleCircle.y + this.diameter;


              // dimensions handle
              b.SH_group = {x:94 , y:20 + 710 - 10 *b.rate*this.distance/2}
              b.SW_group =  {x:135 + 10 * b.rate/2 * this.setback , y:175 + 710 -50 - 10 *b.rate*this.distance}
             
              if(this.dis_setback.n%this.dis_setback.d == 0) {
                ele.SW_letter.changeletter('' + parseInt(this.dis_setback.n/this.dis_setback.d));
                } else {
                ele.SW_letter.changeletter(''+parseInt(this.dis_setback.n/this.dis_setback.d)+ '-'+this.dis_setback.n%this.dis_setback.d + '/' + this.dis_setback.d);
              }
    
              if(this.dis_distance.n%this.dis_distance.d == 0) {
                ele.SH_letter.changeletter('' + parseInt(this.dis_distance.n/this.dis_distance.d));
                } else {
                ele.SH_letter.changeletter(''+parseInt(this.dis_distance.n/this.dis_distance.d)+ '-'+this.dis_distance.n%this.dis_distance.d + '/' + this.dis_distance.d);
              }

            }

          } else if(this.set_direct == 'Right') {

            if(this.dis_direction == 'Top') {
            
              b.singleCircle.x = ele.rightLine.getPosition()[0].x - this.setback*10*b.rate;
              b.singleCircle.y = ele.upLine.getPosition()[1].y + this.distance*10*b.rate;

              b.SU_lArrowline = [{x:ele.upLine.getPosition()[1].x+50,y:ele.upLine.getPosition()[1].y},{x:ele.upLine.getPosition()[1].x+50,y:ele.upLine.getPosition()[1].y+this.distance*10*b.rate}]
              b.SU_lfupArrowP = [{x:ele.upLine.getPosition()[1].x+60,y:ele.upLine.getPosition()[1].y},{x:ele.upLine.getPosition()[1].x+40,y:ele.upLine.getPosition()[1].y}]
              b.SU_lfupTip = b.SU_lArrowline[0]
              b.SU_lfdownTip = b.SU_lArrowline[1]

              b.SL_upArrowline = [{x:ele.rightLine.getPosition()[0].x,y:ele.upLine.getPosition()[1].y + this.distance*10*b.rate + 50},{x:ele.rightLine.getPosition()[0].x - this.setback*10*b.rate,y:ele.upLine.getPosition()[1].y + this.distance*10*b.rate+50}]
              b.SL_ulArrowP =[{x:ele.rightLine.getPosition()[0].x - this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate-10+50},{x:ele.rightLine.getPosition()[0].x - this.setback*10*b.rate,y:ele.upLine.getPosition()[0].y + this.distance*10*b.rate+10+50}]
              b.SL_ulTip = b.SL_upArrowline[1]
              b.SL_urTip = b.SL_upArrowline[0]

             

              // sizeLetter handle
              this.sizeCircle = "Ø " + this.diameter + "˝"

              ele.circleDiameter.changeletter(this.sizeCircle)
              b.circleDiameter.x = b.singleCircle.x + this.diameter + 10*b.rate;
              b.circleDiameter.y = b.singleCircle.y + this.diameter;


              // dimensions handle
              b.SH_group = {x:470 + b.widthDifference , y:20 + 10 *b.rate*this.distance/2}
              b.SW_group =  {x:415 + b.widthDifference - 10 * b.rate/2 * this.setback , y:225 + 10 *b.rate*this.distance}
             
              if(this.dis_setback.n%this.dis_setback.d == 0) {
                ele.SW_letter.changeletter('' + parseInt(this.dis_setback.n/this.dis_setback.d));
                } else {
                ele.SW_letter.changeletter(''+parseInt(this.dis_setback.n/this.dis_setback.d)+ '-'+this.dis_setback.n%this.dis_setback.d + '/' + this.dis_setback.d);
              }
    
              if(this.dis_distance.n%this.dis_distance.d == 0) {
                ele.SH_letter.changeletter('' + parseInt(this.dis_distance.n/this.dis_distance.d));
                } else {
                ele.SH_letter.changeletter(''+parseInt(this.dis_distance.n/this.dis_distance.d)+ '-'+this.dis_distance.n%this.dis_distance.d + '/' + this.dis_distance.d);
              }

           
            } else if (this.dis_direction == 'Bottom') {
            
              b.singleCircle.x = ele.rightLine.getPosition()[0].x - this.setback*10*b.rate;
              b.singleCircle.y = ele.downLine.getPosition()[0].y - this.distance*10*b.rate;

              b.SU_lArrowline = [{x:ele.downLine.getPosition()[1].x + 50,y:ele.downLine.getPosition()[0].y},{x:ele.downLine.getPosition()[1].x+50,y:ele.downLine.getPosition()[1].y-this.distance*10*b.rate}]
              b.SU_lfupArrowP = [{x:b.SU_lArrowline[0].x-10,y:b.SU_lArrowline[0].y},{x:b.SU_lArrowline[0].x+10,y:b.SU_lArrowline[0].y}]
              b.SU_lfupTip = b.SU_lArrowline[1]
              b.SU_lfdownTip = b.SU_lArrowline[0]

              b.SL_upArrowline = [{x:ele.rightLine.getPosition()[0].x,y:ele.downLine.getPosition()[1].y - this.distance*10*b.rate - 50},{x:ele.rightLine.getPosition()[1].x - this.setback*10*b.rate,y:ele.downLine.getPosition()[1].y - this.distance*10*b.rate-50}]
              b.SL_ulArrowP =[{x:ele.rightLine.getPosition()[0].x - this.setback*10*b.rate,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate-10-50},{x:ele.rightLine.getPosition()[1].x - this.setback*10*b.rate,y:ele.downLine.getPosition()[0].y - this.distance*10*b.rate+10-50}]
              b.SL_ulTip = b.SL_upArrowline[1]
              b.SL_urTip = b.SL_upArrowline[0]

             

              // sizeLetter handle
              this.sizeCircle = "Ø " + this.diameter + "˝"

              ele.circleDiameter.changeletter(this.sizeCircle)
              b.circleDiameter.x = b.singleCircle.x + this.diameter + 10*b.rate;
              b.circleDiameter.y = b.singleCircle.y + this.diameter;


              // dimensions handle
              b.SH_group = {x:470 + b.widthDifference , y:20 + 710 - 10 *b.rate*this.distance/2}
              b.SW_group =  {x:415 + b.widthDifference - 10 * b.rate/2 * this.setback , y:175 + 710 -50 - 10 *b.rate*this.distance}
             
              if(this.dis_setback.n%this.dis_setback.d == 0) {
                ele.SW_letter.changeletter('' + parseInt(this.dis_setback.n/this.dis_setback.d));
                } else {
                ele.SW_letter.changeletter(''+parseInt(this.dis_setback.n/this.dis_setback.d)+ '-'+this.dis_setback.n%this.dis_setback.d + '/' + this.dis_setback.d);
              }
    
              if(this.dis_distance.n%this.dis_distance.d == 0) {
                ele.SH_letter.changeletter('' + parseInt(this.dis_distance.n/this.dis_distance.d));
                } else {
                ele.SH_letter.changeletter(''+parseInt(this.dis_distance.n/this.dis_distance.d)+ '-'+this.dis_distance.n%this.dis_distance.d + '/' + this.dis_distance.d);
              }
            }

          }

          b.dis_upWidth = ele.up_Widthletter.returnValue();
          b.dis_downWidth = ele.down_Widthletter.returnValue();
          b.dis_leftHeight = ele.left_Heightletter.returnValue();
          b.dis_rightHeight = ele.right_Heightletter.returnValue()
          b.draw();


      }
    }

    function Unotch() {
     
      this.Handle = "Unotch";
      this.draw = function(context) {

        var simpleParameter = [];
        simpleParameter = context.Parameters.filter((parameter, i) => { 
         return parameter.ParameterName === 'Unotch';
       })

          this.parameter = simpleParameter[0].value;

          console.log(this.parameter)

          this.UN_diameter = this.parameter[0].UN_diameter;

          this.UN_setback = this.parameter[0].UN_setback;
          this.dis_UN_setback = this.parameter[0].UN_setback;
          // if(this.UN_setback) {
          //   this.UN_setback=(this.UN_setback>10)?this.UN_setback:10;}

          this.UN_distance = this.parameter[0].UN_distance;
          this.dis_UN_distance = this.parameter[0].UN_distance;
          if(this.UN_distance) {
            this.UN_distance=(this.UN_distance>10)?this.UN_distance:10;}

          this.UN_set_direct = this.parameter[0].UN_set_direct;
          this.UN_dis_direction = this.parameter[0].UN_dis_direction;

          this.UN_distanceB = this.parameter[0].UN_distanceB
          this.dis_UN_distanceB =this.parameter[0].UN_distanceB
          // if(Math.abs(this.UN_distanceB-0)>0.00001) {
          //   this.UN_distanceB=(this.UN_distanceB>10)?this.UN_distanceB:10;}

            var b = new initDraw(context);
            var ele = new definitionObject();

            ele.UNcircle.setSize(this.UN_diameter)

            if(this.UN_set_direct == 'Left'){

              if(this.UN_dis_direction == 'Top'){

                b.UNcircle.x = ele.leftLine.getPosition()[0].x + this.UN_setback*10*b.rate;
                b.UNcircle.y = ele.upLine.getPosition()[0].y + this.UN_distance*10*b.rate;

                b.UNrect.x = ele.leftLine.getPosition()[0].x
                b.UNrect.y = b.UNcircle.y -this.UN_diameter

                this.setSize = {width:this.UN_setback*10*b.rate,height:this.UN_diameter*2}
                ele.UNrect.setSize(this.setSize)

                this.upline = [{x:b.UNcircle.x,y:b.UNcircle.y-this.UN_diameter},{x:ele.leftLine.getPosition()[0].x,y:b.UNcircle.y-this.UN_distanceB/2}]
                ele.UN_upline.drawPath(this.upline)

                this.UN_downline = [{x:b.UNcircle.x,y:b.UNcircle.y+this.UN_diameter},{x:ele.leftLine.getPosition()[0].x,y:b.UNcircle.y+this.UN_distanceB/2}]
                ele.UN_downline.drawPath(this.UN_downline)



                b.SU_lArrowline = [{x:ele.upLine.getPosition()[0].x-50,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[0].x-50,y:ele.upLine.getPosition()[0].y+this.UN_distance*10*b.rate}]
                b.SU_lfupArrowP = [{x:ele.upLine.getPosition()[0].x-60,y:ele.upLine.getPosition()[0].y},{x:ele.upLine.getPosition()[0].x-40,y:ele.upLine.getPosition()[0].y}]
                b.SU_lfupTip = b.SU_lArrowline[0]
                b.SU_lfdownTip = b.SU_lArrowline[1]
                b.extra_p1 =  [{x:b.SU_lArrowline[0].x-10,y: b.SU_lArrowline[1].y},{x: b.SU_lArrowline[1].x+10,y: b.SU_lArrowline[1].y}]


                b.SH_group = {x:94 , y:20 + 10 *b.rate*this.UN_distance/2}
                // b.SW_group =  {x:135 + 10 * b.rate/2 * this.UN_setback , y:225 + 10 *b.rate*this.UN_distance}

                if(this.dis_UN_setback.n%this.dis_UN_setback.d == 0) {
                  ele.SW_letter.changeletter('' + parseInt(this.dis_UN_setback.n/this.dis_UN_setback.d));
                  } else {
                  ele.SW_letter.changeletter(''+parseInt(this.dis_UN_setback.n/this.dis_UN_setback.d)+ '-'+this.dis_UN_setback.n%this.dis_UN_setback.d + '/' + this.dis_UN_setback.d);
                }
      
                if(this.dis_UN_distance.n%this.dis_UN_distance.d == 0) {
                  ele.SH_letter.changeletter('' + parseInt(this.dis_UN_distance.n/this.dis_UN_distance.d));
                  } else {
                  ele.SH_letter.changeletter(''+parseInt(this.dis_UN_distance.n/this.dis_UN_distance.d)+ '-'+this.dis_UN_distance.n%this.dis_UN_distance.d + '/' + this.dis_UN_distance.d);
                }

              }
            }

            b.draw()
      }
    }
    


    // = = = = = = = = = = Run = = = = = =
   function Transform(context) {


        this.draw = function () {

            var simplePanle = new simplePanel();
        
            DrawingManager.register(simplePanle);
          
            var drawer1 = DrawingManager.findDrawer('simplePanel');

            drawer1.draw(context);
            // drawer1.convertToPNG();

            var draw_corner = new corner();

            DrawingManager.register(draw_corner);

            var drawer2 = DrawingManager.findDrawer('corner');

            drawer2.draw(context);

            

            
            var draw_radius = new radius();

            DrawingManager.register(draw_radius);

            var drawer3 = DrawingManager.findDrawer('radius');

            drawer3.draw(context);


            var draw_leftOutage = new leftOutage();

            DrawingManager.register(draw_leftOutage);

            var drawer4 = DrawingManager.findDrawer('leftOutage');

            drawer4.draw(context);


            var draw_rightOutage = new rightOutage();
            DrawingManager.register(draw_rightOutage);

            var drawer5 = DrawingManager.findDrawer('rightOutage');
            drawer5.draw(context);


            var draw_bottomOutage = new bottomOutage();

            DrawingManager.register(draw_bottomOutage);

            var drawer6 = DrawingManager.findDrawer('bottomOutage');

            drawer6.draw(context);

            
            var draw_notch = new notch();

            DrawingManager.register(draw_notch);

            var drawer7 = DrawingManager.findDrawer('notch');

            drawer7.draw(context);


            var draw_Miter = new Miter();

            DrawingManager.register(draw_Miter);

            var drawer8 = DrawingManager.findDrawer('Miter');

            drawer8.draw(context);


            var draw_Hole = new Hole();

            DrawingManager.register(draw_Hole);

            var drawer9 = DrawingManager.findDrawer('Hole');

            drawer9.draw(context);



            var draw_Unotch = new Unotch();

            DrawingManager.register(draw_Unotch);

            var drawer10 = DrawingManager.findDrawer('Unotch');

            drawer10.draw(context);

        
        } 

    }



    function inputing(id) {
      
      if($('#'+id).val()) {
        var string = $('#'+id).val().split("-");
        var realValue = string[1] ? math.fraction(string[0]+' ' +string[1]) : math.fraction(string[0]);
        return realValue;
      } else {
        return 0;
      }
    }
  
   $("#transform").click( function() {

    // mainValue(simplePanel)
      this.inputWidth = inputing("width");
      this.inputHeight = inputing("height")
      this.centerNote = $("#note").val();

      // cornerValue
      this.LU_inputC_Width = inputing("LU_c_width1");
      this.LU_inputC_Height = inputing("LU_c_height1");
      this.RU_inputC_Width = inputing("RU_c_width1");
      this.RU_inputC_Height = inputing("RU_c_height1");
      this.LB_inputC_Width = inputing("LB_c_width1");
      this.LB_inputC_Height = inputing("LB_c_height1");
      this.RB_inputC_Width = inputing("RB_c_width1");
      this.RB_inputC_Height = inputing("RB_c_height1");

      // radiusValue
      this.LU_inputR_Width = inputing("LU_r_width1");
      this.LU_inputR_Height = inputing("LU_r_height1");
      this.RU_inputR_Width = inputing("RU_r_width1");
      this.RU_inputR_Height = inputing("RU_r_height1");
      this.LB_inputR_Width = inputing("LB_r_width1");
      this.LB_inputR_Height = inputing("LB_r_height1");
      this.RB_inputR_Width = inputing("RB_r_width1");
      this.RB_inputR_Height = inputing("RB_r_height1");


      // left-outage value
      this.LL_TopLeft = inputing("topLL");
      this.LL_TopRight = inputing("topLR");

      this.LLL_inputE_Width_1 = inputing("LLL_e_width1")
      this.LLL_inputE_Width_2 = inputing("LLL_e_width2")
      this.LLL_inputE_Height = inputing("LLL_e_height1")

      this.LLR_inputE_Width_1 = inputing("LLR_e_width1")
      this.LLR_inputE_Width_2 = inputing("LLR_e_width2")
      this.LLR_inputE_Height = inputing("LLR_e_height1")

      this.LRL_inputE_Width_1 = inputing("LRL_e_width1")
      this.LRL_inputE_Width_2 = inputing("LRL_e_width2")
      this.LRL_inputE_Height = inputing("LRL_e_height1")

      this.LRR_inputE_Width_1 = inputing("LRR_e_width1")
      this.LRR_inputE_Width_2 = inputing("LRR_e_width2")
      this.LRR_inputE_Height = inputing("LRR_e_height1")

      // right-outage value
      this.RL_TopLeft = inputing("topLL_R");
      this.RL_TopRight = inputing("topLR_R");

      this.RLL_inputE_Width_1 = inputing("RLL_e_width1")
      this.RLL_inputE_Width_2 = inputing("RLL_e_width2")
      this.RLL_inputE_Height = inputing("RLL_e_height1")

      this.RLR_inputE_Width_1 = inputing("RLR_e_width1")
      this.RLR_inputE_Width_2 = inputing("RLR_e_width2")
      this.RLR_inputE_Height = inputing("RLR_e_height1")

      this.RRL_inputE_Width_1 = inputing("RRL_e_width1")
      this.RRL_inputE_Width_2 = inputing("RRL_e_width2")
      this.RRL_inputE_Height = inputing("RRL_e_height1")

      this.RRR_inputE_Width_1 = inputing("RRR_e_width1")
      this.RRR_inputE_Width_2 = inputing("RRR_e_width2")
      this.RRR_inputE_Height = inputing("RRR_e_height1")

      // bottom-outage value
      this.leftRight = inputing("bLR_R")
      this.rightLeft = inputing("bLR_F")

      // notch
      this.LT_notch_width1 = inputing("LT_notch_width1")
      this.LT_notch_width2 = inputing("LT_notch_width2")

      this.LT_notch_height1 = inputing("LT_notch_height1")
      this.LT_notch_height2 = inputing("LT_notch_height2")

      this.RT_notch_width1 = inputing("RT_notch_width1")
      this.RT_notch_width2 = inputing("RT_notch_width2")
    
      this.RT_notch_height1 = inputing("RT_notch_height1")
      this.RT_notch_height2 = inputing("RT_notch_height2")


      this.LB_notch_width1 = inputing("LB_notch_width1")
      this.LB_notch_width2 = inputing("LB_notch_width2")
    
      this.LB_notch_height1 = inputing("LB_notch_height1")
      this.LB_notch_height2 = inputing("LB_notch_height2")

      this.RB_notch_width1 = inputing("RB_notch_width1")
      this.RB_notch_width2 = inputing("RB_notch_width2")
    
      this.RB_notch_height1 = inputing("RB_notch_height1")
      this.RB_notch_height2 = inputing("RB_notch_height2")

    // Miter

      this.LMB_letter = inputing("LMB")
      this.RMB_letter = inputing("RMB")
      this.LMF_letter = inputing("LMF")
      this.RMF_letter = inputing("RMF")

      // single hole
      this.diameter = inputing("diameter")
     
      this.set_direct = $('#set_direct').find(":selected").text();
      
      this.dis_direction = $('#dis_direction').find(":selected").text();
     
      this.setback = inputing("setback")
      
      this.distance = inputing("distance")
     
      // double
      this.distanceB = inputing("doubleB")
      this.distanceC = inputing("doubleC")


      // Unotch
      this.UN_diameter = inputing("UN_diameter")

      this.UN_set_direct = $('#UN_set_direct').find(":selected").text();
   
      this.UN_dis_direction = $('#UN_dis_direction').find(":selected").text();
   
      this.UN_distance = inputing("UN_distance")
   
      this.UN_distanceB = inputing("UN_distanceB")

      this.UN_setback = inputing("UN_setback")

    var context =
    {
      Canvas: null,
      Parameters: [
         { ParameterName: 'simeplePanel', 
         value: [{width:this.inputWidth,height:this.inputHeight},{centerNote:this.centerNote}],  Type: 'fraction', FriendlyNmae : 'inputWidth' }, 

         { ParameterName: 'corner',
         value: [
            {width:this.LU_inputC_Width, height:this.LU_inputC_Height},
            {width:this.RU_inputC_Width, height:this.RU_inputC_Height},
            {width:this.LB_inputC_Width, height:this.LB_inputC_Height},
            {width:this.RB_inputC_Width, height:this.RB_inputC_Height},],   Type: 'fraction', FriendlyNmae : 'corner' },

         { ParameterName: 'radius',
         value: [
            {width:this.LU_inputR_Width, height:this.LU_inputR_Height},
            {width:this.RU_inputR_Width, height:this.RU_inputR_Height},
            {width:this.LB_inputR_Width, height:this.LB_inputR_Height},
            {width:this.RB_inputR_Width, height:this.RB_inputR_Height},],   Type: 'fraction', FriendlyNmae : 'radius' },

         { ParameterName: 'leftOutage',
         value: [
            {topLeft:this.LL_TopLeft,topRight:this.LL_TopRight},
            {width1:this.LLL_inputE_Width_1, width2: this.LLL_inputE_Width_2,height:this.LLL_inputE_Height},
            {width1:this.LLR_inputE_Width_1, width2:this.LLR_inputE_Width_2,height:this.LLR_inputE_Height},
            {width1:this.LRL_inputE_Width_1, width2: this.LRL_inputE_Width_2,height:this.LRL_inputE_Height},
            {width1:this.LRR_inputE_Width_1, width2:this.LRR_inputE_Width_2,height:this.LRR_inputE_Height},],   Type: 'fraction', FriendlyNmae : 'leftOutage' },

         { ParameterName: 'rightOutage',
         value: [
            {topLeft:this.RL_TopLeft,topRight:this.RL_TopRight},
            {width1:this.RLL_inputE_Width_1, width2: this.RLL_inputE_Width_2,height:this.RLL_inputE_Height},
            {width1:this.RLR_inputE_Width_1, width2:this.RLR_inputE_Width_2,height:this.RLR_inputE_Height},
            {width1:this.RRL_inputE_Width_1, width2: this.RRL_inputE_Width_2,height:this.RRL_inputE_Height},
            {width1:this.RRR_inputE_Width_1, width2:this.RRR_inputE_Width_2,height:this.RRR_inputE_Height},],   Type: 'fraction', FriendlyNmae : 'rightOutage' },

         { ParameterName: 'bottomOutage',
         value: [
            {leftRight:this.leftRight,rightLeft:this.rightLeft},],   Type: 'fraction', FriendlyNmae : 'bottomOutage' },
     
         { ParameterName: 'notch',
         value: [
          {width1:this.LT_notch_width1, height1:this.LT_notch_height1,width2:this.LT_notch_width2, height2:this.LT_notch_height2},
          {width1:this.RT_notch_width1, height1:this.RT_notch_height1,width2:this.RT_notch_width2, height2:this.RT_notch_height2},  
          {width1:this.LB_notch_width1, height1:this.LB_notch_height1,width2:this.LB_notch_width2, height2:this.LB_notch_height2},
          {width1:this.RB_notch_width1, height1:this.RB_notch_height1,width2:this.RB_notch_width2, height2:this.RB_notch_height2},  ],   Type: 'fraction', FriendlyNmae : 'notch' },

         { ParameterName: 'Miter',
         value: [
          {LMB_letter:this.LMB_letter, RMB_letter:this.RMB_letter,LMF_letter:this.LMF_letter,RMF_letter:this.RMF_letter},],   Type: 'fraction', FriendlyNmae : 'Miter' },
        
          { ParameterName: 'Hole',
         value: [
          {diameter:this.diameter, setback:this.setback,distance:this.distance,set_direct:this.set_direct,dis_direction:this.dis_direction},
          {distanceB:this.distanceB,distanceC:this.distanceC},],   Type: 'fraction', FriendlyNmae : 'Hole' },
    
          { ParameterName: 'Unotch',
         value: [
          {
            UN_diameter:this.UN_diameter,
            UN_setback:this.UN_setback,
            UN_set_direct:this.UN_set_direct,
            UN_dis_direction:this.UN_dis_direction,
             UN_distance:this.UN_distance,
             UN_distanceB:this.UN_distanceB},],   Type: 'fraction', FriendlyNmae : 'Unotch' },
        ],
      Reset: function () { }
    };

      var transform = new Transform(context);
      transform.draw();

  })

    $("#reload").click(function () {
      window.location.reload();

  });
