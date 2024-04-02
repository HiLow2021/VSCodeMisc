class PingController < ApplicationController
  def index
    render json: { message: "Hello Rails API." }
  end
end
