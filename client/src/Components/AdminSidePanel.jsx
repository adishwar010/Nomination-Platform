import React from "react";

const AdminSidePanel = (props) => {
  const onClick = () => {};
  return (
    <>
      <div className="container shadow bg-light rounded hem">
        <h5 className="text-center pt-3">
          Questions Added :
          <span className="text-danger">
            <h4>{props.cnt}</h4>
          </span>
        </h5>
        <hr />
        {/* <p className="text-center">Timer</p> */}
        <div className="text-center"></div>
        <h5 className="text-center pt-3">Questions</h5>
        <hr />
        <div className="row pt-2 pl-4 pr-4">
          <div className="col">
            <button
              onClick={onClick}
              value="1"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              1
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="2"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              2
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="3"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              3
            </button>
          </div>

          <div className="col">
            <button
              onClick={onClick}
              value="4"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              4
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="5"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              5
            </button>
          </div>
        </div>

        <div className="row pt-4 pl-4 pr-4">
          <div className="col">
            <button
              onClick={onClick}
              value="6"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              6
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="7"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              7
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="8"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              8
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="9"
              type="button"
              class="btn btn-secondary pl-3 pr-3 butsty"
            >
              9
            </button>
          </div>
          <div className="col">
            <button
              onClick={onClick}
              value="10"
              type="button"
              class="btn btn-secondary butsty"
            >
              10
            </button>
          </div>
        </div>

        {/* <div className="row pt-4 pl-4 pr-4">
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            11
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            12
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            13
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            14
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            15
          </button>
        </div>
      </div>

      <div className="row pt-4 pl-4 pr-4">
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            16
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            17
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            18
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            19
          </button>
        </div>
        <div className="col">
          <button type="button" class="btn btn-secondary butsty">
            20
          </button>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default AdminSidePanel;
